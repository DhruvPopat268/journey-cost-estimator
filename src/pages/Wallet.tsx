import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Wallet, ArrowLeft, Plus, CreditCard, History, CheckCircle, AlertCircle } from 'lucide-react';
import { Navbar } from '../components/Sidebar';

const WalletPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const bookingData = location.state;
  
  const [walletBalance, setWalletBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [addMoneyAmount, setAddMoneyAmount] = useState('');
  const [showAddMoney, setShowAddMoney] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    fetchWalletBalance();
  }, []);

  const fetchWalletBalance = async () => {
    try {
      const token = localStorage.getItem("RiderToken");
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/wallet/balance`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setWalletBalance(data.balance || 0);
      }
    } catch (error) {
      console.error('Error fetching wallet balance:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMoney = async () => {
    if (!addMoneyAmount || addMoneyAmount <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    setIsProcessing(true);
    try {
      const token = localStorage.getItem("RiderToken");
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/wallet/add-money`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: parseFloat(addMoneyAmount),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setWalletBalance(data.newBalance);
        setAddMoneyAmount('');
        setShowAddMoney(false);
        alert('Money added successfully!');
      } else {
        alert('Failed to add money to wallet');
      }
    } catch (error) {
      console.error('Error adding money:', error);
      alert('Something went wrong!');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleWalletPayment = async () => {
    if (walletBalance < bookingData.totalPayable) {
      alert('Insufficient wallet balance. Please add money to your wallet.');
      return;
    }

    setIsProcessing(true);
    try {
      const token = localStorage.getItem("RiderToken");
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/rides/book`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...bookingData,
          paymentType: 'wallet',
        }),
      });

      if (response.status === 401) {
        alert("Your session has expired. Please login again.");
        localStorage.removeItem("RiderToken");
        navigate("/login");
        return;
      }

      const data = await response.json();
      if (response.status === 201) {
        alert("Ride booked successfully with wallet payment!");
        navigate("/currentBookings");
      } else {
        alert(data.message || "Failed to book ride");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    } finally {
      setIsProcessing(false);
    }
  };

  const quickAddAmounts = [100, 200, 500, 1000];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-4 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading wallet...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-4 px-4">
      <Navbar title="My Wallet" />
      
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Wallet Balance Card */}
        <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 mb-2">Available Balance</p>
                <p className="text-3xl font-bold">₹{walletBalance.toFixed(2)}</p>
              </div>
              <div className="p-3 bg-white/20 rounded-full">
                <Wallet className="w-8 h-8" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Booking Payment Section */}
        {bookingData && (
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="w-5 h-5 mr-2 text-blue-600" />
                Complete Your Booking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Ride Amount:</span>
                    <span className="font-semibold">₹{bookingData.totalPayable}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Wallet Balance:</span>
                    <span className="font-semibold">₹{walletBalance.toFixed(2)}</span>
                  </div>
                </div>

                {walletBalance >= bookingData.totalPayable ? (
                  <div className="flex items-center space-x-2 text-green-600">
                    <CheckCircle className="w-5 h-5" />
                    <span className="text-sm">Sufficient balance available</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 text-red-600">
                    <AlertCircle className="w-5 h-5" />
                    <span className="text-sm">
                      Insufficient balance. Add ₹{(bookingData.totalPayable - walletBalance).toFixed(2)} more
                    </span>
                  </div>
                )}

                <Button
                  onClick={handleWalletPayment}
                  disabled={walletBalance < bookingData.totalPayable || isProcessing}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
                >
                  {isProcessing ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Processing...</span>
                    </div>
                  ) : (
                    `Pay ₹${bookingData.totalPayable} from Wallet`
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Add Money Section */}
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Plus className="w-5 h-5 mr-2 text-green-600" />
              Add Money to Wallet
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!showAddMoney ? (
              <Button
                onClick={() => setShowAddMoney(true)}
                variant="outline"
                className="w-full border-green-500 text-green-600 hover:bg-green-50"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Money
              </Button>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter Amount
                  </label>
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    value={addMoneyAmount}
                    onChange={(e) => setAddMoneyAmount(e.target.value)}
                    className="w-full"
                  />
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-2">Quick Add:</p>
                  <div className="grid grid-cols-4 gap-2">
                    {quickAddAmounts.map((amount) => (
                      <Button
                        key={amount}
                        variant="outline"
                        size="sm"
                        onClick={() => setAddMoneyAmount(amount.toString())}
                        className="text-xs"
                      >
                        ₹{amount}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button
                    onClick={() => {
                      setShowAddMoney(false);
                      setAddMoneyAmount('');
                    }}
                    variant="outline"
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleAddMoney}
                    disabled={!addMoneyAmount || isProcessing}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                  >
                    {isProcessing ? 'Adding...' : 'Add Money'}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Back Button */}
        <Button
          onClick={() => navigate(-1)}
          variant="outline"
          className="w-full"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default WalletPage;
