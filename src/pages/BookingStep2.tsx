import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Clock, Star, Award, Crown, MapPin, CreditCard, X, Receipt, Info } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Import Redux actions - make sure this path is correct
import { 
  setUsage, 
  setTotalAmount, 
  setSelectedCategory, 
  setNotes 
} from '../store/slices/bookingSlice'; // Adjust this path as needed

const iconMap = {
  normal: Star,
  classic: Award,
  prime: Crown,
};

const BookingStep2 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const bookingData = location.state;
  const dispatch = useDispatch();

  const [selectedUsage, setSelectedUsage] = useState('');
  const [customUsage, setCustomUsage] = useState('');
  const [priceCategories, setPriceCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPriceBreakdown, setShowPriceBreakdown] = useState(false);
  const [notes, setNotesLocal] = useState(''); // Renamed to avoid confusion
  const [instructions, setInstructions] = useState([]);
  const [totalAmount, setTotalAmountLocal] = useState([]); // Renamed to avoid confusion
  const [selectedCategory, setSelectedCategoryLocal] = useState(null); // Renamed to avoid confusion
  const [showInstructions, setShowInstructions] = useState(false);
  const [tc, setTc] = useState(false);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [priceRes, instructionsRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/api/price-categories`),
          axios.post(`${import.meta.env.VITE_API_URL}/api/instructions/getInstructions`, {
            "categoryId": bookingData.categoryId,
            "subCategoryId": bookingData.subcategoryId
          }),
        ]);

        setPriceCategories(priceRes.data || []);
        setInstructions(instructionsRes.data?.instructions || []);
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

  // 👇 Trigger API when usage changes (selected or custom)
  const handleUsageChange = async (value) => {
    setSelectedUsage(value);
    setCustomUsage('');

    const fullData = { ...bookingData, selectedUsage: value };

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/ride-costs/calculation`,
        fullData
      );
      
      const responseData = res.data;
      setTotalAmountLocal(responseData);
      
      // Update Redux with usage data - ensure serializable data
      dispatch(setUsage({
        selectedUsage: value,
        customUsage: ''
      }));
      
      // Update Redux with total amount - ensure it's serializable
      dispatch(setTotalAmount(responseData));

    } catch (err) {
      console.error('API error:', err);
    }
  };

  // 👇 Trigger API when customUsage changes (with debounce)
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (customUsage && bookingData) {
        const fullData = { ...bookingData, selectedUsage: customUsage };

        axios.post(
          `${import.meta.env.VITE_API_URL}/api/ride-costs/calculation`,
          fullData
        )
          .then(res => {
            const responseData = res.data;
            setTotalAmountLocal(responseData);
            
            // Update Redux with custom usage data - ensure serializable data
            dispatch(setUsage({
              selectedUsage: '',
              customUsage: customUsage
            }));
            
            // Update Redux with total amount - ensure it's serializable
            dispatch(setTotalAmount(responseData));
          })
          .catch(err => console.error('API error:', err));
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [customUsage, bookingData, dispatch]);

  // for set default usage based on subcategory name
  useEffect(() => {
    if (bookingData?.subcategoryName) {
      const normalizedName = bookingData.subcategoryName.toLowerCase();

      if (normalizedName.includes("one-way") || normalizedName.includes("oneway") || normalizedName.includes("one way")) {
        setSelectedUsage("10");
        handleUsageChange("10");
      } else if (normalizedName.includes("hourly") || normalizedName.includes("hour")) {
        setSelectedUsage("1");
        handleUsageChange("1");
      }
    }
  }, [bookingData?.subcategoryName]);

  // Update Redux when notes change
  useEffect(() => {
    dispatch(setNotes(notes));
  }, [notes, dispatch]);

  // Update Redux when selected category changes
  useEffect(() => {
    if (selectedCategory) {
      // Ensure the category data is serializable
      const serializableCategory = JSON.parse(JSON.stringify(selectedCategory));
      dispatch(setSelectedCategory(serializableCategory));
    }
  }, [selectedCategory, dispatch]);

  // Set default category to "Prime"
  useEffect(() => {
    if (totalAmount?.length > 0) {
      const defaultCategory = totalAmount.find(item => item.category.toLowerCase() === 'prime');
      if (defaultCategory) {
        setSelectedCategoryLocal(defaultCategory);
      }
    }
  }, [totalAmount]);

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
      return ['1', '2', '3', '4', '5'];
    }
    return ['1', '2', '3', '4', '5'];
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

  const handleConfirmBooking = async () => {
    if (!selectedCategory || !selectedCategory.category) {
      alert("Please select a driver category to proceed.");
      return;
    }

    // Create serializable booking details
    const bookingDetails = {
      ...bookingData,
      selectedUsage: selectedUsage || customUsage,
      selectedCategory: selectedCategory.category,
      totalPayable: selectedCategory.totalPayable,
      notes: notes,
    };

    // Ensure all data is updated in Redux before navigation with serializable data
    dispatch(setUsage({
      selectedUsage: selectedUsage || '',
      customUsage: customUsage || ''
    }));
    
    const serializableCategory = JSON.parse(JSON.stringify(selectedCategory));
    dispatch(setSelectedCategory(serializableCategory));
    dispatch(setNotes(notes));
    dispatch(setTotalAmount(totalAmount));

    try {
      const token = localStorage.getItem("RiderToken");

      if (!token) {
        navigate("/login", { state: bookingDetails });
        return;
      }

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/rider-auth/auth/check`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.loggedIn) {
        navigate("/confirm-payment", { state: bookingDetails });
      } else {
        navigate("/login", { state: bookingDetails });
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      navigate("/login", { state: bookingDetails });
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
                includeInsurance: bookingData.includeInsurance
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
              </div>
            </CardContent>
          </Card>

          {/* selected category */}
          {totalAmount.map((item, index) => (
            <button
              key={index}
              type="button"
              onClick={() => {
                setSelectedCategoryLocal(item);
              }}
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
                    ₹{getKmRate(item.category)} / Km & ₹{getMinRate(item.category)} / Minute
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-lg font-bold text-gray-800">₹{item.totalPayable.toFixed(2)}</p>
                <p className="text-sm text-gray-500">Total Cost</p>
              </div>
            </button>
          ))}

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

            {/* Conditionally show the card */}
            {showInstructions && (
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle>Instructions (Optional)</CardTitle>
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
            <Card className="bg-white shadow-lg border-2 ">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Total Amount </h3>
                    <p className="text-3xl font-bold text-green-600">₹{selectedCategory.totalPayable}</p>
                  </div>

                  {/* Button group aligned right and close together */}
                  <div className="flex items-center gap-2 ">
                    <Button
                      variant="outline"
                      className="text-sm border-blue-500 text-blue-600 mt-11"
                      onClick={() => setTc(true)}
                    >
                      T & C
                    </Button>
                    <Button
                      onClick={() => setShowPriceBreakdown(true)}
                      variant="outline"
                      className="flex items-center space-x-2 border-blue-500 text-blue-600 hover:bg-blue-50 mt-11"
                    >
                      <Receipt className="w-4 h-4" />
                      <span>View Breakup</span>
                    </Button>
                  </div>
                </div>

                <Button
                  onClick={handleConfirmBooking}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold rounded-lg"
                >
                  Confirm & Pay ₹{selectedCategory.totalPayable}
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* T & C Modal */}
      {tc && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-bold flex items-center">
                <Info className="w-5 h-5 mr-2 text-blue-600" />
                Terms & Conditions
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTc(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {instructions.map((instruction, index) => (
                <Card key={index} className="border border-gray-200 bg-gray-50">
                  <CardContent className="p-4">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {instruction}
                    </p>
                  </CardContent>
                </Card>
              ))}
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
              {/* Trip Summary */}
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <h4 className="font-semibold text-gray-800">Trip Summary</h4>
                <div className="flex justify-between text-sm">
                  <span>From:</span>
                  <span className="font-medium">{bookingData.fromLocation}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>To:</span>
                  <span className="font-medium">{bookingData.toLocation}</span>
                </div>
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

                {bookingData.includeInsurance && (
                  <div className="flex justify-between text-sm">
                    <span>Insurance:</span>
                    <span className="font-medium text-green-600">Included</span>
                  </div>
                )}
              </div>

              {/* Simplified Cost Breakdown */}
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-800">Cost Details</h4>

                {selectedCategory.insuranceCharges > 0 && (
                  <div className="flex justify-between text-sm font-medium">
                    <span>Insurance Charges:</span>
                    <span>₹{selectedCategory.insuranceCharges}</span>
                  </div>
                )}

                <div className="flex justify-between text-sm font-medium">
                  <span>Subtotal:</span>
                  <span>₹{selectedCategory.subtotal}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span>GST Charges:</span>
                  <span className="font-medium">₹{selectedCategory.gstCharges}</span>
                </div>

                <Separator className="my-3" />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total Amount:</span>
                  <span className="text-green-600">₹{selectedCategory.totalPayable}</span>
                </div>
              </div>

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