import React, { useState, useEffect } from 'react';
import { 
  Wallet, 
  ArrowLeft, 
  Plus, 
  CreditCard, 
  History, 
  CheckCircle, 
  AlertCircle,
  ArrowUpRight,
  ArrowDownLeft,
  Calendar,
  Filter,
  Menu
} from 'lucide-react';
import { Navbar } from '@/components/Sidebar';

// Card components
const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg shadow-md ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className = "" }) => (
  <div className={`px-6 py-4 ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ children, className = "" }) => (
  <h3 className={`text-lg font-semibold ${className}`}>
    {children}
  </h3>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`px-6 pb-6 ${className}`}>
    {children}
  </div>
);

// Button component
const Button = ({ children, onClick, disabled = false, variant = "default", className = "", ...props }) => {
  const baseClasses = "px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center";
  const variantClasses = {
    default: "bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300",
    outline: "border-2 border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50"
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${className} ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Input component
const Input = ({ className = "", ...props }) => (
  <input
    className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
    {...props}
  />
);

const WalletPage = () => {
  const [walletBalance, setWalletBalance] = useState(1250.50);
  const [loading, setLoading] = useState(false);
  const [addMoneyAmount, setAddMoneyAmount] = useState('');
  const [showAddMoney, setShowAddMoney] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState('deposit');
  const [transactions, setTransactions] = useState({});
  const [loadingTransactions, setLoadingTransactions] = useState(false);

  // Mock transaction data
  const mockTransactions = {
    deposit: [
      {
        id: 1,
        amount: 500,
        type: 'deposit',
        description: 'Added via UPI',
        date: '2024-01-15T10:30:00',
        status: 'completed'
      },
      {
        id: 2,
        amount: 200,
        type: 'deposit',
        description: 'Quick add',
        date: '2024-01-14T15:45:00',
        status: 'completed'
      },
      {
        id: 3,
        amount: 1000,
        type: 'deposit',
        description: 'Bank transfer',
        date: '2024-01-13T09:15:00',
        status: 'completed'
      },
      {
        id: 4,
        amount: 300,
        type: 'deposit',
        description: 'Cashback credit',
        date: '2024-01-12T11:20:00',
        status: 'completed'
      }
    ],
    spend: [
      {
        id: 5,
        amount: 150,
        type: 'spend',
        description: 'Ride to Downtown Mall',
        date: '2024-01-15T14:20:00',
        status: 'completed'
      },
      {
        id: 6,
        amount: 220,
        type: 'spend',
        description: 'Airport ride',
        date: '2024-01-14T18:30:00',
        status: 'completed'
      },
      {
        id: 7,
        amount: 95,
        type: 'spend',
        description: 'Mall trip',
        date: '2024-01-13T16:45:00',
        status: 'completed'
      },
      {
        id: 8,
        amount: 180,
        type: 'spend',
        description: 'Business district ride',
        date: '2024-01-12T09:15:00',
        status: 'completed'
      },
      {
        id: 9,
        amount: 75,
        type: 'spend',
        description: 'Local ride',
        date: '2024-01-11T20:30:00',
        status: 'completed'
      }
    ]
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    setLoadingTransactions(true);
    // Simulate API call
    setTimeout(() => {
      setTransactions(mockTransactions);
      setLoadingTransactions(false);
    }, 1000);
  };

  const handleAddMoney = async () => {
    if (!addMoneyAmount || addMoneyAmount <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    setIsProcessing(true);
    try {
      // Simulate API call
      setTimeout(() => {
        setWalletBalance(prev => prev + parseFloat(addMoneyAmount));
        setAddMoneyAmount('');
        setShowAddMoney(false);
        alert('Money added successfully!');
        fetchTransactions();
        setIsProcessing(false);
      }, 1500);
    } catch (error) {
      console.error('Error adding money:', error);
      alert('Something went wrong!');
      setIsProcessing(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const quickAddAmounts = [100, 200, 500, 1000];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-4 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading wallet...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-4 px-4">
      {/* Navigation */}
      <Navbar title='My Wallet'/>
      
      <div className="max-w-4xl mx-auto space-y-6 mt-2">
        {/* Wallet Balance Card */}
        <Card className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white shadow-2xl border-0 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
          <div className="absolute top-4 right-4 w-32 h-32 bg-white/5 rounded-full"></div>
          <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-white/5 rounded-full"></div>
          <div className="p-4 relative">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 mb-3 text-sm font-medium tracking-wide">AVAILABLE BALANCE</p>
                <p className="text-4xl font-bold mb-2">₹{walletBalance.toFixed(2)}</p>
                <div className="flex items-center space-x-2 text-blue-200 text-sm">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>Active • Last updated now</span>
                </div>
              </div>
              <div className="p-6 bg-white/15 rounded-3xl backdrop-blur-sm">
                <Wallet className="w-10 h-10" />
              </div>
            </div>
          </div>
        </Card>

        {/* Add Money Section - Now in prominent position */}
        <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
          <CardHeader className="">
            <CardTitle className="flex items-center text-gray-800">
              <div className=" bg-green-100 rounded-lg mr-3">
                <Plus className="w-5 h-5 text-green-600" />
              </div>
              Add Money to Wallet
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!showAddMoney ? (
              <div className="text-center py-2 text-center flex justify-center">
                
                <Button
                  onClick={() => setShowAddMoney(true)}
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-4 px-8 rounded-xl shadow-lg font-medium transition-all duration-200"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add Money
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Enter Amount
                  </label>
                  <Input
                    type="number"
                    placeholder="₹ Enter amount"
                    value={addMoneyAmount}
                    onChange={(e) => setAddMoneyAmount(e.target.value)}
                    className="w-full py-3 px-4 rounded-xl border-2 border-gray-200 focus:border-green-500 transition-colors"
                  />
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-3">Quick Add:</p>
                  <div className="grid grid-cols-2 gap-3">
                    {quickAddAmounts.map((amount) => (
                      <Button
                        key={amount}
                        variant="outline"
                        onClick={() => setAddMoneyAmount(amount.toString())}
                        className="py-3 rounded-xl border-2 border-gray-200 hover:border-green-500 hover:bg-green-50 font-medium transition-all duration-200"
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
                    className="flex-1 py-3 rounded-xl border-2 border-gray-300 hover:bg-gray-50"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleAddMoney}
                    disabled={!addMoneyAmount || isProcessing}
                    className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 rounded-xl shadow-lg font-medium"
                  >
                    {isProcessing ? 'Adding...' : 'Add Money'}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Transaction History Section */}
        <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center text-gray-800">
              <div className="p-2 bg-purple-100 rounded-lg mr-3">
                <History className="w-5 h-5 text-purple-600" />
              </div>
              Transaction History
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Toggle Tabs */}
            <div className="flex bg-gray-100 p-1 rounded-xl mb-6">
              <button
                onClick={() => setActiveTab('deposit')}
                className={`flex-1 flex items-center justify-center py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === 'deposit'
                    ? 'bg-white text-green-600 shadow-md'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <ArrowDownLeft className="w-4 h-4 mr-2" />
                Deposits
              </button>
              <button
                onClick={() => setActiveTab('spend')}
                className={`flex-1 flex items-center justify-center py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === 'spend'
                    ? 'bg-white text-red-600 shadow-md'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <ArrowUpRight className="w-4 h-4 mr-2" />
                Spending
              </button>
            </div>

            {/* Transaction List */}
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {loadingTransactions ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
                  <p className="text-gray-500">Loading transactions...</p>
                </div>
              ) : transactions[activeTab]?.length > 0 ? (
                transactions[activeTab].map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full ${
                        transaction.type === 'deposit' 
                          ? 'bg-green-100' 
                          : 'bg-red-100'
                      }`}>
                        {transaction.type === 'deposit' ? (
                          <ArrowDownLeft className="w-4 h-4 text-green-600" />
                        ) : (
                          <ArrowUpRight className="w-4 h-4 text-red-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{transaction.description}</p>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(transaction.date)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${
                        transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.type === 'deposit' ? '+' : '-'}₹{transaction.amount}
                      </p>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        transaction.status === 'completed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {transaction.status}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <div className="p-4 bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <History className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 font-medium">
                    No {activeTab} history found
                  </p>
                  <p className="text-gray-400 text-sm mt-1">
                    Your {activeTab} transactions will appear here
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WalletPage;