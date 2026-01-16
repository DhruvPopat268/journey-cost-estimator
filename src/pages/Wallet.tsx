import React, { useState, useEffect, useCallback } from 'react';
import apiClient from '@/lib/apiClient';
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
  Menu,
  Lock,
  Shield
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Declare Razorpay on window object
declare global {
  interface Window {
    Razorpay: any;
  }
}

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
    outline: "border-2 border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50",
    ghost: "hover:bg-gray-100 text-gray-700"
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
  const navigate = useNavigate();
  const [walletData, setWalletData] = useState({
    balance: 0,
    totalDeposited: 0,
    totalSpent: 0,
    lastTransactionAt: null,
    isActive: false
  });
  const [loading, setLoading] = useState(true);
  const [addMoneyAmount, setAddMoneyAmount] = useState('');
  const [showAddMoney, setShowAddMoney] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [loadingTransactions, setLoadingTransactions] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    hasNext: false,
    hasPrev: false
  });

  // Get RiderToken from localStorage - memoized
  const getRiderToken = useCallback(() => {
    // Token is now handled via cookies, no need to get from localStorage
    return null;
  }, []);

  // Load Razorpay script - memoized
  const loadRazorpayScript = useCallback(() => {
    return new Promise((resolve) => {
      // Check if already loaded
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        console.log('Razorpay script loaded successfully');
        resolve(true);
      };
      script.onerror = () => {
        console.error('Failed to load Razorpay script');
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }, []);

  // Fetch wallet data - memoized to prevent infinite loop
  const fetchWalletData = useCallback(async () => {
    if (!import.meta.env.VITE_API_URL) {
      console.error('VITE_API_URL is not defined');
      alert('API URL is not configured');
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const response = await apiClient.get('/api/payments/wallet');
      const data = response.data;
      console.log('Wallet data:', data);
      setWalletData(data);
    } catch (error) {
      console.error('Error fetching wallet data:', error);
      alert('Failed to load wallet data. Please check your connection.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch transaction history - memoized
  const fetchTransactionHistory = useCallback(async (page = 1) => {
    if (!import.meta.env.VITE_API_URL) {
      console.error('VITE_API_URL is not defined');
      return;
    }

    setLoadingTransactions(true);
    try {
      const response = await apiClient.get(`/api/payments/history?page=${page}&limit=10`);
      const data = response.data;
      console.log('Transaction history:', data);
      
      const allTransactions = data.transactions || [];
      const totalPages = Math.ceil(data.totalItems / 10);
      
      setTransactions(allTransactions);
      setPagination({
        currentPage: page,
        totalPages: totalPages,
        totalItems: data.totalItems || 0,
        hasNext: page < totalPages,
        hasPrev: page > 1
      });
    } catch (error) {
      console.error('Error fetching transaction history:', error);
      alert('Failed to load transaction history');
    } finally {
      setLoadingTransactions(false);
    }
  }, []);

  // Create Razorpay order
  const createRazorpayOrder = useCallback(async (amount) => {
    try {
      const response = await apiClient.post('/api/rider-auth/create-order', {
        amount: amount,
        currency: 'INR',
        receipt: `rcpt_${Date.now()}`,
        notes: {
          type: 'user_deposit'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  }, []);

  // Handle Razorpay payment
  const handleRazorpayPayment = useCallback(async (amount) => {
    try {
      setIsProcessing(true);
      
      // Check if Razorpay script is loaded
      if (!window.Razorpay) {
        throw new Error('Razorpay SDK not loaded');
      }
      
      // Create order on backend
      console.log('Creating order for amount:', amount);
      const order = await createRazorpayOrder(amount);
      console.log('Order created:', order);

      const razorpayKey = import.meta.env.VITE_REACT_APP_RAZORPAY_KEY_ID;
      console.log('Razorpay Key:', razorpayKey);
      
      if (!razorpayKey) {
        throw new Error('Razorpay key not configured');
      }

      const options = {
        key: razorpayKey,
        amount: order.amount,
        currency: order.currency,
        name: 'Hire4Drive',
        description: 'Add money to wallet',
        order_id: order.orderId,
        handler: async function (response) {
          try {
            // Verify payment on backend
            const verifyResponse = await apiClient.post('/api/payments/deposit', {
              amount: amount,
              paymentId: response.razorpay_payment_id
            });

            if (verifyResponse.status === 200) {
              // Add delay to prevent multiple rapid calls
              setTimeout(() => {
                fetchWalletData();
                fetchTransactionHistory();
              }, 1000);
              
              setAddMoneyAmount('');
              setShowAddMoney(false);
              
              alert('Payment successful! Money added to wallet.');
            } else {
              throw new Error('Payment verification failed');
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            alert('Payment verification failed. Please contact support.');
          } finally {
            setIsProcessing(false);
          }
        },
        prefill: {
          name: 'User Name',
          email: 'user@example.com',
          contact: '9999999999'
        },
        notes: {
          purpose: 'wallet_recharge'
        },
        theme: {
          color: '#3B82F6'
        },
        modal: {
          ondismiss: function() {
            setIsProcessing(false);
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
      
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
      setIsProcessing(false);
    }
  }, [createRazorpayOrder, fetchWalletData, fetchTransactionHistory]);

  // Initialize wallet data on component mount
  useEffect(() => {
    let mounted = true;
    
    const initializeWallet = async () => {
      if (!mounted) return;
      
      try {
        // Load wallet data and transaction history
        await Promise.all([
          fetchWalletData(),
          fetchTransactionHistory()
        ]);
        
        // Load Razorpay script
        const scriptLoaded = await loadRazorpayScript();
        if (!scriptLoaded && mounted) {
          console.error('Failed to load Razorpay script');
        }
      } catch (error) {
        console.error('Error initializing wallet:', error);
      }
    };

    initializeWallet();
    
    // Cleanup function
    return () => {
      mounted = false;
    };
  }, [fetchWalletData, fetchTransactionHistory, loadRazorpayScript]);

  const handleAddMoney = async () => {
    if (!addMoneyAmount || addMoneyAmount <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    const amount = parseFloat(addMoneyAmount);
    
    if (amount < 1) {
      alert('Minimum amount is ₹1');
      return;
    }

    if (amount > 50000) {
      alert('Maximum amount is ₹50,000');
      return;
    }

    await handleRazorpayPayment(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'paid': { color: 'green', text: 'Completed' },
      'completed': { color: 'green', text: 'Completed' },
      'pending': { color: 'yellow', text: 'Pending' },
      'created': { color: 'yellow', text: 'Pending' },
      'failed': { color: 'red', text: 'Failed' }
    };

    const config = statusConfig[status] || { color: 'gray', text: status };
    
    return (
      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
        config.color === 'green' ? 'bg-green-100 text-green-800' :
        config.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
        config.color === 'red' ? 'bg-red-100 text-red-800' :
        'bg-gray-100 text-gray-800'
      }`}>
        {config.text}
      </span>
    );
  };

  const getTransactionIcon = (type) => {
    switch(type) {
      case 'deposit':
        return <ArrowDownLeft className="w-4 h-4 text-green-600" />;
      case 'spend':
        return <ArrowUpRight className="w-4 h-4 text-red-600" />;
      case 'withdraw':
        return <ArrowUpRight className="w-4 h-4 text-orange-600" />;
      case 'refund':
        return <ArrowDownLeft className="w-4 h-4 text-blue-600" />;
      case 'cancellation_charges':
        return <ArrowUpRight className="w-4 h-4 text-purple-600" />;
      default:
        return <History className="w-4 h-4 text-gray-600" />;
    }
  };

  const getTransactionColor = (type) => {
    switch(type) {
      case 'deposit':
      case 'refund':
        return { bg: 'bg-green-100', text: 'text-green-600', sign: '+' };
      case 'spend':
      case 'withdraw':
      case 'cancellation_charges':
        return { bg: 'bg-red-100', text: 'text-red-600', sign: '-' };
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-600', sign: '' };
    }
  };

  const getTransactionTypeLabel = (type) => {
    switch(type) {
      case 'deposit':
        return 'Deposit';
      case 'spend':
        return 'Spend';
      case 'withdraw':
        return 'Withdraw';
      case 'refund':
        return 'Refund';
      case 'cancellation_charges':
        return 'Cancellation Charges';
      default:
        return type;
    }
  };

  const quickAddAmounts = [100, 200, 500, 1000];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-4 px-4 flex items-center justify-center">
        <div className="w-8 h-8 sm:w-10 sm:h-10 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-4 px-4">
      {/* Navigation */}
      <div className="max-w-4xl mx-auto mb-4">
        <div className="flex items-center mb-3">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mr-4 p-2 hover:bg-white/50 rounded-full"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">My Wallet</h1>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Wallet Balance Card */}
        <Card className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white shadow-2xl border-0 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
          <div className="absolute top-4 right-4 w-32 h-32 bg-white/5 rounded-full"></div>
          <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-white/5 rounded-full"></div>
          <div className="p-4 relative">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 mb-3 text-sm font-medium tracking-wide">AVAILABLE BALANCE</p>
                <p className="text-4xl font-bold mb-2">₹{walletData.balance.toFixed(2)}</p>
                <div className="flex items-center space-x-2 text-blue-200 text-sm">
                  <div className={`w-2 h-2 rounded-full animate-pulse ${
                    walletData.isActive ? 'bg-green-400' : 'bg-red-400'
                  }`}></div>
                  <span>
                    {walletData.isActive ? 'Active' : 'Inactive'} • 
                    Last updated: {walletData.lastTransactionAt ? formatDate(walletData.lastTransactionAt) : 'Never'}
                  </span>
                </div>
                <div className="flex space-x-4 mt-3 text-blue-200 text-sm">
                  <span>Deposited: ₹{walletData.totalDeposited.toFixed(2)}</span>
                  <span>Spent: ₹{walletData.totalSpent.toFixed(2)}</span>
                </div>
              </div>
              <div className="p-6 bg-white/15 rounded-3xl backdrop-blur-sm">
                <Wallet className="w-10 h-10" />
              </div>
            </div>
          </div>
        </Card>

        {/* Add Money Section */}
        <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
          <CardHeader className="">
            <CardTitle className="flex items-center text-gray-800">
              <div className="p-2 bg-green-100 rounded-lg mr-3">
                <Plus className="w-5 h-5 text-green-600" />
              </div>
              Add Money to Wallet
              <div className="ml-auto flex items-center space-x-2">
                <Shield className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-600 font-medium">Secured by Razorpay</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!showAddMoney ? (
              <div className="text-center py-2 flex justify-center gap-3">
                <Button
                  onClick={() => setShowAddMoney(true)}
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-4 px-8 rounded-xl shadow-lg font-medium transition-all duration-200"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add Money
                </Button>
                <Button
                  onClick={() => setShowWithdraw(true)}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-4 px-8 rounded-xl shadow-lg font-medium transition-all duration-200"
                >
                  <ArrowUpRight className="w-5 h-5 mr-2" />
                  Withdraw
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Enter Amount (₹1 - ₹50,000)
                  </label>
                  <Input
                    type="number"
                    placeholder="₹ Enter amount"
                    value={addMoneyAmount}
                    onChange={(e) => setAddMoneyAmount(e.target.value)}
                    className="w-full py-3 px-4 rounded-xl border-2 border-gray-200 focus:border-green-500 transition-colors"
                    min="1"
                    max="50000"
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

                {/* Payment Method Info */}
                <div className="bg-blue-50 p-4 rounded-xl">
                  <div className="flex items-center space-x-3 mb-2">
                    <CreditCard className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-blue-800">Payment Methods Available</span>
                  </div>
                  <p className="text-sm text-blue-700">
                    UPI, Credit/Debit Cards, Net Banking, and Wallets
                  </p>
                </div>

                <div className="flex space-x-3">
                  <Button
                    onClick={() => {
                      setShowAddMoney(false);
                      setAddMoneyAmount('');
                    }}
                    variant="outline"
                    className="flex-1 py-3 rounded-xl border-2 border-gray-300 hover:bg-gray-50"
                    disabled={isProcessing}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleAddMoney}
                    disabled={!addMoneyAmount || isProcessing}
                    className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 rounded-xl shadow-lg font-medium"
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4 mr-2" />
                        Pay Securely
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Withdraw Modal */}
        {showWithdraw && (
          <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="p-4 bg-orange-100 rounded-full w-20 h-20 mx-auto flex items-center justify-center">
                  <ArrowUpRight className="w-10 h-10 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Withdraw Money</h3>
                <p className="text-gray-600">You can only withdraw from our mobile app</p>
                <div className="flex justify-center gap-4">
                  <a
                    href="https://play.google.com/store/apps/details?id=com.hiredriveuser.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block"
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                      alt="Get it on Google Play"
                      className="h-14 hover:scale-105 transition-transform"
                    />
                  </a>
                  <a
                    href="https://apps.apple.com/in/app/hire4drive-driver-cab-parcel/id6757386782"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block"
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                      alt="Download on the App Store"
                      className="h-14 hover:scale-105 transition-transform"
                    />
                  </a>
                </div>
                <Button
                  onClick={() => setShowWithdraw(false)}
                  variant="outline"
                  className="mt-4 px-6 py-2"
                >
                  Close
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Transaction History Section */}
        <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center text-gray-800">
              <div className="p-2 bg-purple-100 rounded-lg mr-3">
                <History className="w-5 h-5 text-purple-600" />
              </div>
              Transaction History
              <div className="ml-auto text-sm text-gray-500">
                Page {pagination.currentPage} of {pagination.totalPages} • {pagination.totalItems} items
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Transaction List */}
            <div className="space-y-3 max-h-100 overflow-y-auto">
              {loadingTransactions ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
                  <p className="text-gray-500">Loading transactions...</p>
                </div>
              ) : transactions.length > 0 ? (
                <>
                  {transactions.map((transaction, index) => {
                    const colors = getTransactionColor(transaction.type);
                    return (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200"
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-full ${colors.bg}`}>
                            {getTransactionIcon(transaction.type)}
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">{getTransactionTypeLabel(transaction.type)}</p>
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                              <Calendar className="w-3 h-3" />
                              <span>{formatDate(transaction.date)}</span>
                              {transaction.paymentMethod && (
                                <>
                                  <span>•</span>
                                  <span>{transaction.paymentMethod}</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-bold ${colors.text}`}>
                            {colors.sign}₹{transaction.amount}
                          </p>
                          {getStatusBadge(transaction.status)}
                  
                        </div>
                      </div>
                    );
                  })}
                  
                  {/* Pagination Controls */}
                  {pagination.totalPages > 1 && (
                    <div className="flex justify-center items-center space-x-4 mt-4 pt-4 border-t border-gray-200">
                      <Button
                        onClick={() => fetchTransactionHistory(pagination.currentPage - 1)}
                        disabled={!pagination.hasPrev}
                        variant="outline"
                        className="px-3 py-1"
                      >
                        Previous
                      </Button>
                      <span className="text-sm text-gray-600">
                        Page {pagination.currentPage} of {pagination.totalPages}
                      </span>
                      <Button
                        onClick={() => fetchTransactionHistory(pagination.currentPage + 1)}
                        disabled={!pagination.hasNext}
                        variant="outline"
                        className="px-3 py-1"
                      >
                        Next
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="p-4 bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <History className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 font-medium">
                    No transaction history found
                  </p>
                  <p className="text-gray-400 text-sm mt-1">
                    Your transactions will appear here
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