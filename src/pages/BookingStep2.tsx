import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Clock, Star, Award, Crown, MapPin, CreditCard, X, Receipt, Info, Shield, Wallet, Banknote } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  setUsage,
  setTotalAmount,
  setSelectedCategory,
  setNotes,
  updateField
} from '../store/slices/bookingSlice';

const iconMap = {
  normal: Star,
  classic: Award,
  prime: Crown,
};

const BookingStep2 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  
  // Get data from Redux store first
  const bookingDataFromStore = useSelector(state => state.booking);
  
  // Use location state only if Redux store data is not available
  const bookingData = bookingDataFromStore && Object.keys(bookingDataFromStore).length > 0 
    ? bookingDataFromStore 
    : location.state;

  const [selectedUsage, setSelectedUsage] = useState(bookingData?.selectedUsage || '');
  const [customUsage, setCustomUsage] = useState(bookingData?.customUsage || '');
  const [notes, setNotesLocal] = useState(bookingData?.notes || '');
  const [includeInsurance, setIncludeInsurance] = useState(bookingData?.includeInsurance !== undefined ? bookingData.includeInsurance : true);
  const [priceCategories, setPriceCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPriceBreakdown, setShowPriceBreakdown] = useState(false);
  const [instructions, setInstructions] = useState(["hello"]);
  const [totalAmount, setTotalAmountLocal] = useState(bookingData?.totalAmount || []);
  const [selectedCategory, setSelectedCategoryLocal] = useState(bookingData?.selectedCategory || null);
  const [showInstructions, setShowInstructions] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [instructionsLoading, setInstructionsLoading] = useState(false);

  // Fetch instructions when a category is selected
  const fetchInstructions = async (categoryName) => {
    if (!categoryName) {
      console.log("No category name provided");
      return;
    }

    console.log("Fetching instructions for category:", categoryName);
    setInstructionsLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/instructions/getInstructions`,
        {
          categoryId: bookingData.categoryId,
          subCategoryId: bookingData.subcategoryId,
          selectedCategoryName: categoryName
        }
      );
      console.log("Instructions API response:", res.data);

      // Extract just the instructions array from the response
      setInstructions(res.data.instructions || []);
    } catch (error) {
      console.error('Failed to fetch instructions', error);
      setInstructions([]);
    } finally {
      setInstructionsLoading(false);
    }
  };

  // Update Redux when any field changes
  useEffect(() => {
    dispatch(updateField({ field: 'selectedUsage', value: selectedUsage }));
  }, [selectedUsage, dispatch]);

  useEffect(() => {
    dispatch(updateField({ field: 'customUsage', value: customUsage }));
  }, [customUsage, dispatch]);

  useEffect(() => {
    dispatch(updateField({ field: 'notes', value: notes }));
  }, [notes, dispatch]);

  useEffect(() => {
    dispatch(updateField({ field: 'includeInsurance', value: includeInsurance }));
  }, [includeInsurance, dispatch]);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [priceRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/api/price-categories`),
        ]);

        setPriceCategories(priceRes.data || []);
      } catch (error) {
        console.error('Failed to fetch data', error);
      } finally {
        setLoading(false);
      }
    };
    if (bookingData?.categoryId && bookingData?.subcategoryId) {
      fetchAllData();
    } else {
      setLoading(false);
    }
  }, [bookingData]);

  // Function to call API with current data including insurance
  const callCalculationAPI = async (usageValue) => {
    const fullData = {
      ...bookingData,
      selectedUsage: usageValue,
      includeInsurance: includeInsurance
    };

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/ride-costs/calculation`,
        fullData
      );

      const responseData = res.data;
      setTotalAmountLocal(responseData);
      dispatch(setTotalAmount(responseData));
    } catch (err) {
      console.error('API error:', err);
    }
  };

  // Trigger API when usage changes (selected or custom)
  const handleUsageChange = async (value) => {
    setSelectedUsage(value);
    setCustomUsage('');

    dispatch(setUsage({
      selectedUsage: value,
      customUsage: ''
    }));

    await callCalculationAPI(value);
  };

  // Trigger API when customUsage changes
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (customUsage && bookingData) {
        dispatch(setUsage({
          selectedUsage: '',
          customUsage: customUsage
        }));

        callCalculationAPI(customUsage);
      }
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [customUsage, bookingData, dispatch]);

  // Trigger API when insurance changes
  useEffect(() => {
    if ((selectedUsage || customUsage) && bookingData) {
      callCalculationAPI(selectedUsage || customUsage);
    }
  }, [includeInsurance]);

  // ✅ Always at the top level
  useEffect(() => {
    if (selectedCategory && totalAmount?.length > 0) {
      const updated = totalAmount.find(
        (item) => item.category === selectedCategory.category
      );
      if (updated) {
        setSelectedCategoryLocal(updated);
      }
    }
  }, [totalAmount]);

  // Set default usage based on subcategory name
  useEffect(() => {
    if (!selectedUsage && !customUsage && bookingData?.subcategoryName) {
      const normalizedName = bookingData.subcategoryName.toLowerCase();
      let defaultUsage = "";

      if (normalizedName.includes("one-way") || normalizedName.includes("oneway") || normalizedName.includes("one way")) {
        defaultUsage = "10";
      } else if (normalizedName.includes("hourly") || normalizedName.includes("hour")) {
        defaultUsage = "1";
      }

      if (defaultUsage) {
        setSelectedUsage(defaultUsage);
        handleUsageChange(defaultUsage);
      }
    }
  }, [bookingData?.subcategoryName, selectedUsage, customUsage]);

  // Update Redux when notes change
  useEffect(() => {
    dispatch(setNotes(notes));
  }, [notes, dispatch]);

  // Update Redux when selected category changes
  useEffect(() => {
    console.log("Selected category changed:", selectedCategory);
    if (selectedCategory) {
      const serializableCategory = JSON.parse(JSON.stringify(selectedCategory));
      dispatch(setSelectedCategory(serializableCategory));

      // Use the category name instead of ID
      const categoryName = selectedCategory.category;

      console.log("Using category name:", categoryName);

      // Fetch instructions for the selected category
      if (categoryName) {
        fetchInstructions(categoryName);
      } else {
        console.error("No category name found in selectedCategory:", selectedCategory);
      }
    }
  }, [selectedCategory, dispatch]);

  // Set default category to "Prime"
  useEffect(() => {
    if (!selectedCategory && totalAmount?.length > 0) {
      const defaultCategory = totalAmount.find(item => item.category.toLowerCase() === 'prime');
      if (defaultCategory) {
        setSelectedCategoryLocal(defaultCategory);
      }
    }
  }, [totalAmount, selectedCategory]);

  if (!bookingData) {
    navigate('/');
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-4 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const getUsageOptions = () => {
    if (!bookingData.subcategoryName) return ['1', '2', '3', '4', '5'];

    const normalizedName = bookingData.subcategoryName.toLowerCase();
    if (normalizedName.includes('one-way') || normalizedName.includes('oneway') || normalizedName.includes('one way')) {
      return ['10', '25', '50', '100'];
    }
    if (normalizedName.includes('hourly') || normalizedName.includes('hour')) {
      return ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', "11", "12"];
    }
  };

  const getUsageUnit = () => {
    if (!bookingData.subcategoryName) return 'Unit';

    const normalizedName = bookingData.subcategoryName.toLowerCase();
    if (normalizedName.includes('one-way') || normalizedName.includes('oneway') || normalizedName.includes('one way')) {
      return 'KM';
    }
    if (normalizedName.includes('hourly') || normalizedName.includes('hour')) {
      return 'Hr';
    }
    return 'Unit';
  };

  // Handle category selection
  const handleCategorySelect = (item) => {
    setSelectedCategoryLocal(item);
  };

  // Handle info button click
  const handleInfoClick = (e, item) => {
    e.stopPropagation();
    setSelectedCategoryLocal(item);
    setShowPriceBreakdown(true);
  };

  // Updated function to check login first before showing terms
  const handleConfirmBooking = async () => {
    if (!selectedCategory || !selectedCategory.category) {
      alert("Please select a driver category to proceed.");
      return;
    }

    // First check if user is logged in
    try {
      const token = localStorage.getItem("RiderToken");
      if (!token) {
        // If no token, redirect to login with booking details
        const bookingDetails = {
          ...bookingData,
          selectedUsage: selectedUsage || customUsage,
          selectedCategory: selectedCategory.category,
          insuranceCharges: selectedCategory.insuranceCharges,
          subtotal: selectedCategory.subtotal,
          gstCharges: selectedCategory.gstCharges,
          totalPayable: selectedCategory.totalPayable,
          notes: notes,
          includeInsurance: includeInsurance
        };
        navigate("/login", { state: bookingDetails });
        return;
      }

      // Check if token is valid
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/rider-auth/auth/check`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.data.loggedIn) {
        // If token is invalid, redirect to login
        const bookingDetails = {
          ...bookingData,
          selectedUsage: selectedUsage || customUsage,
          selectedCategory: selectedCategory.category,
          insuranceCharges: selectedCategory.insuranceCharges,
          subtotal: selectedCategory.subtotal,
          gstCharges: selectedCategory.gstCharges,
          totalPayable: selectedCategory.totalPayable,
          notes: notes,
          includeInsurance: includeInsurance
        };
        navigate("/login", { state: bookingDetails });
        return;
      }

      // If user is logged in, show terms modal
      setShowTermsModal(true);

    } catch (error) {
      console.error("Auth check failed:", error);
      // If auth check fails, redirect to login
      const bookingDetails = {
        ...bookingData,
        selectedUsage: selectedUsage || customUsage,
        selectedCategory: selectedCategory.category,
        insuranceCharges: selectedCategory.insuranceCharges,
        subtotal: selectedCategory.subtotal,
        gstCharges: selectedCategory.gstCharges,
        totalPayable: selectedCategory.totalPayable,
        notes: notes,
        includeInsurance: includeInsurance
      };
      navigate("/login", { state: bookingDetails });
    }
  };

  // Function to handle terms acceptance
  const handleTermsAccept = () => {
    setTermsAccepted(true);
    setShowTermsModal(false);
    setShowPaymentModal(true);
  };

  // Function to handle payment method selection
  const handlePaymentMethodSelect = async (method) => {
    setSelectedPaymentMethod(method);

    const bookingDetails = {
      ...bookingData,
      selectedUsage: selectedUsage || customUsage,
      selectedCategory: selectedCategory.category,
      insuranceCharges: selectedCategory.insuranceCharges,
      subtotal: selectedCategory.subtotal,
      gstCharges: selectedCategory.gstCharges,
      totalPayable: selectedCategory.totalPayable,
      notes: notes,
      includeInsurance: includeInsurance,
      paymentMethod: method
    };

    // Update Redux store
    dispatch(setUsage({
      selectedUsage: selectedUsage || '',
      customUsage: customUsage || ''
    }));
    const serializableCategory = JSON.parse(JSON.stringify(selectedCategory));
    dispatch(setSelectedCategory(serializableCategory));
    dispatch(setNotes(notes));
    dispatch(setTotalAmount(totalAmount));

    if (method === 'cash') {
      // For cash payment, book ride directly and redirect to current bookings
      await bookRideDirectly(bookingDetails);
    } else if (method === 'wallet') {
      // For wallet payment, redirect to wallet page
      navigate("/wallet", { state: bookingDetails });
    }
  };

  const bookRideDirectly = async (bookingDetails) => {
    try {
      const token = localStorage.getItem("RiderToken");
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/rides/book`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...bookingDetails,
          paymentType: 'cash',
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
        localStorage.removeItem("persist:root");
        navigate("/currentBookings");
      } else {
        alert(data.message || "Failed to book ride");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

  const getIcon = (category) => {
    switch (category.toLowerCase()) {
      case "prime":
        return "👑";
      case "normal":
        return "⭐";
      case "classic":
        return "🧍";
      default:
        return "🚗";
    }
  };

  const getKmRate = (category) => {
    const currentCategory = priceCategories.find((item) => item.priceCategoryName.toLowerCase() === category.toLowerCase());
    return currentCategory?.chargePerKm || 0;
  };

  const getMinRate = (category) => {
    const currentCategory = priceCategories.find((item) => item.priceCategoryName.toLowerCase() === category.toLowerCase());
    return currentCategory?.chargePerMinute || 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-4 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center mb-3">
          <Button
            variant="ghost"
            onClick={() => navigate(`/booking/${bookingData.categoryId}/${bookingData.subcategoryId}`, {
              state: {
                fromLocation: bookingData.fromLocation,
                toLocation: bookingData.toLocation,
                carType: bookingData.carType,
                transmissionType: bookingData.transmissionType,
                selectedDate: bookingData.selectedDate,
                selectedTime: bookingData.selectedTime,
              }
            })}
            className="mr-4 p-2 hover:bg-white/50 rounded-full"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">
            {bookingData.subcategoryName} Booking - Step 2
          </h1>
        </div>

        <div className="space-y-6">
          {/* Estimated Usage */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-blue-600" />
                Estimated Usage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3 items-end">
                {/* Always show dropdown */}
                <div className="flex-1">
                  <Label htmlFor="usage-select">Usage Options</Label>
                  <Select
                    value={selectedUsage}
                    onValueChange={handleUsageChange}
                  >
                    <SelectTrigger id="usage-select">
                      <SelectValue placeholder={`Select ${getUsageUnit().toLowerCase()}`} />
                    </SelectTrigger>
                    <SelectContent>
                      {getUsageOptions().map((option) => (
                        <SelectItem key={option} value={option}>
                          {option} {getUsageUnit()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Show Custom Usage input only if One-Way */}
                {bookingData?.subcategoryName === "One-Way" && (
                  <div className="flex-1">
                    <Label htmlFor="custom">Custom {getUsageUnit()}</Label>
                    <Input
                      id="custom"
                      placeholder={`Custom ${getUsageUnit().toLowerCase()}`}
                      value={customUsage}
                      onChange={(e) => {
                        setCustomUsage(e.target.value);
                        setSelectedUsage('');
                      }}
                      type="number"
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Price Categories */}
          {totalAmount.map((item, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleCategorySelect(item)}
              className={`w-full text-left rounded-xl p-4 shadow-sm mb-4 flex items-center justify-between transition-all duration-200
              ${selectedCategory?.category === item.category ? 'border-2 border-blue-700 bg-blue-50 shadow-md' : 'border border-gray-200 bg-white hover:shadow-md hover:border-gray-300'}
            `}
            >
              <div className="flex items-center gap-4">
                <div className="text-2xl">
                  {getIcon(item.category)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{item.category}</h3>
                  <p className="text-sm text-gray-500">
                    {item.category === "Classic" && "Qualified, Verified, Trained & Tested"}
                    {item.category === "Prime" && "Highly-Rated Veterans"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-800">₹{item.totalPayable.toFixed(2)}</p>
                  <p className="text-sm text-gray-500">Total Cost</p>
                </div>

                {/* Info button - only show when category is selected */}
                {selectedCategory?.category === item.category && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => handleInfoClick(e, item)}
                    className="p-1 h-8 w-8 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600"
                  >
                    <Info className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </button>
          ))}

          {/* Instructions section with cancel button */}
          <div>
            {/* Button to toggle instructions */}
            {!showInstructions && (
              <Button
                variant="outline"
                onClick={() => setShowInstructions(true)}
              >
                + Add Instructions
              </Button>
            )}

            {/* Conditionally show the card with cancel button */}
            {showInstructions && (
              <Card className="bg-white shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle>Instructions (Optional)</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setShowInstructions(false);
                      setNotesLocal(''); // Clear the notes when canceling
                    }}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <Textarea
                    id="notes"
                    placeholder="Enter any special instructions or requirements..."
                    value={notes}
                    onChange={(e) => setNotesLocal(e.target.value)}
                    rows={3}
                  />
                </CardContent>
              </Card>
            )}
          </div>

          {/* Total and Price Breakdown Section */}
          {selectedCategory?.category && (


            <Button
              onClick={handleConfirmBooking}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold rounded-lg"
            >
              Book Ride ₹{selectedCategory.totalPayable}
            </Button>
          )}
        </div>
      </div>

      {/* Terms & Conditions Modal */}
      {showTermsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Terms & Conditions</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowTermsModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <p className="text-gray-700 mb-4">
                Please read and accept our Terms & Conditions before confirming your booking.
              </p>

              <ul className="list-disc list-inside space-y-2 text-sm text-gray-600 mb-6">
                <li>Driver must be treated with respect.</li>
                <li>Booking once confirmed cannot be modified.</li>
                <li>Cancellation charges may apply.</li>
                <li>Company is not responsible for traffic delays.</li>
              </ul>

              <div className="flex space-x-3">
                <Button
                  onClick={() => setShowTermsModal(false)}
                  variant="outline"
                  className="flex-1 bg-red-500 text-white hover:bg-red-600"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleTermsAccept}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Accept & Confirm
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Method Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Choose Payment Method</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPaymentModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <p className="text-gray-600 mb-6">Select your preferred payment option</p>

              <div className="space-y-3">
                {/* Cash Option */}
                <button
                  onClick={() => handlePaymentMethodSelect('cash')}
                  className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 rounded-full">
                      <Banknote className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-800">Cash Payment</h3>
                      <p className="text-sm text-gray-600">Pay directly to driver</p>
                    </div>
                  </div>
                </button>

                {/* Wallet Option */}
                <button
                  onClick={() => handlePaymentMethodSelect('wallet')}
                  className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-full">
                      <Wallet className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-800">Wallet Payment</h3>
                      <p className="text-sm text-gray-600">Pay using wallet balance</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Price Breakdown Modal */}
      {showPriceBreakdown && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-bold flex items-center">
                <CreditCard className="w-5 h-5 mr-2 text-blue-600" />
                Price Breakdown
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowPriceBreakdown(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="p-6 space-y-4">
              {/* Insurance Section - Above Trip Summary */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-gray-800">Insurance Coverage</h4>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeInsurance}
                      onChange={(e) => setIncludeInsurance(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-blue-300 peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                  </label>
                </div>
              </div>

              {/* Trip Summary */}
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <h4 className="font-semibold text-gray-800">Trip Summary</h4>
                <div className="flex justify-between text-sm">
                  <span>From:</span>
                  <span className="font-medium">{bookingData.fromLocation}</span>
                </div>
                {bookingData.toLocation && (
                  <div className="flex justify-between text-sm">
                    <span>To:</span>
                    <span className="font-medium">{bookingData.toLocation}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span>Date & Time:</span>
                  <span className="font-medium">{bookingData.selectedDate} at {bookingData.selectedTime}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Usage:</span>
                  <span className="font-medium">{selectedUsage || customUsage} {getUsageUnit()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Driver Category:</span>
                  <span className="font-medium capitalize">{selectedCategory.category}</span>
                </div>
              </div>

              {/* Simplified Cost Breakdown */}
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-800">Cost Details</h4>



                <div className="flex justify-between text-sm font-medium">
                  <span>Base fare:</span>
                  <span>₹{selectedCategory.subtotal}</span>
                </div>

                <div className="flex justify-between text-sm font-medium">
                  <span>Cancellation Charges:</span>
                  <span>₹{selectedCategory.cancellationCharges}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span>GST Charges:</span>
                  <span className="font-medium">₹{selectedCategory.gstCharges}</span>
                </div>

                {selectedCategory.insuranceCharges > 0 && (
                  <div className="flex justify-between text-sm font-medium">
                    <span>Insurance Charges:</span>
                    <span>₹{selectedCategory.insuranceCharges}</span>
                  </div>
                )}

                <Separator className="my-3" />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total Amount:</span>
                  <span className="text-green-600">₹{selectedCategory.totalPayable}</span>
                </div>
              </div>

              {/* Instructions Section with Horizontal Scroll */}
              {instructions && instructions.length > 0 ? (
                <div className="space-y-3 pt-4">
                  <h4 className="font-semibold text-gray-800">Important Instructions</h4>
                  <div className="space-y-2">
                    {instructions.map((instruction, index) => (
                      <div
                        key={index}
                        className="bg-blue-50 border border-blue-200 rounded-lg p-3"
                      >
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {instruction}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                !instructionsLoading && (
                  <div className="text-center py-4 text-gray-500">
                    No special instructions for this category.
                  </div>
                )
              )}

              {/* Loading state */}
              {instructionsLoading && (
                <div className="flex justify-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                </div>
              )}

              {/* No instructions message */}
              {!instructionsLoading && instructions.length === 0 && (
                <div className="text-center py-4 text-gray-500">
                  No special instructions for this category.
                </div>
              )}


              {/* Modal Actions */}
              <div className="flex space-x-3 pt-4">
                <Button
                  onClick={() => setShowPriceBreakdown(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    setShowPriceBreakdown(false);
                    handleConfirmBooking();
                  }}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Confirm & Pay
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingStep2;