import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Clock, Star, Award, Crown, MapPin, CreditCard, X, Receipt, Info } from 'lucide-react';

const iconMap = {
  normal: Star,
  classic: Award,
  prime: Crown,
};

const BookingStep2 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const bookingData = location.state;


  // console.log(bookingData)

  // const normalName = bookingData.subcategoryName.toLowerCase();

  // const removeName = normalName.replace(/\s+/g, '');

  const [selectedUsage, setSelectedUsage] = useState('');
  const [customUsage, setCustomUsage] = useState('');
  const [driverCategory, setDriverCategory] = useState('');
  const [priceCategories, setPriceCategories] = useState([]);
  const [peakCharges, setPeakCharges] = useState([]);
  const [rideCosts, setRideCosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPriceBreakdown, setShowPriceBreakdown] = useState(false);
  const [filterDriver, setFilterDriver] = useState(null);
  //instructions = notes
  const [notes, setNotes] = useState('');
  const [instructions, setInstructions] = useState([]);
  const [totalAmount, setTotalAmount] = useState([])
  const [selectedCategory, setSelectedCategory] = useState({});
  const selectedCost = totalAmount.find(item => item.category === selectedCategory);
  const [showInstructions, setShowInstructions] = useState(false);
  const [tc, setTc] = useState(false)

  useEffect(() => {

    const fetchAllData = async () => {
      try {
        const [priceRes, instructionsRes ,] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/api/price-categories`),
          axios.post(`${import.meta.env.VITE_API_URL}/api/instructions/getInstructions`, {
            "categoryId": bookingData.categoryId,
            "subCategoryId": bookingData.subcategoryId
          }),

          // axios.get(`${import.meta.env.VITE_API_URL}/api/ride-costs/type/${removeName}`,)
        ]);

        setPriceCategories(priceRes.data || []);
        console.log('all categories', priceRes.data)

        // setPeakCharges(peakRes.data?.data || []);
        // setRideCosts(rideRes.data || null);
        setInstructions(instructionsRes.data?.instructions || []);
        console.log('Instructions:', instructionsRes.data?.instructions);
        // console.log('Peak Charges:', peakRes.data);
        // console.log('Ride Costs:', rideRes.data);
      } catch (error) {
        console.error('Failed to fetch data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);





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
      setTotalAmount(res.data)
      if (totalAmount) {
        console.log('total amount:', res.data);
      }

    } catch (err) {
      console.error('API error:', err);
    }
  };

  // 👇 Trigger API when customUsage changes (with debounce)
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (customUsage) {
        const fullData = { ...bookingData, selectedUsage: customUsage };

        axios.post(
          `${import.meta.env.VITE_API_URL}/api/ride-costs/calculation`,
          fullData
        )
          .then(res => {
            console.log('API response:', res.data);
            setTotalAmount(res.data); // <-- Set the response data here
          })
          .catch(err => console.error('API error:', err));
      }
    }, 500); // debounce by 500ms

    return () => clearTimeout(delayDebounce);
  }, [customUsage]);

  // for set default usage based on subcategory name
  useEffect(() => {
    const normalizedName = bookingData.subcategoryName?.toLowerCase() || "";

    if (normalizedName.includes("one-way") || normalizedName.includes("oneway") || normalizedName.includes("one way")) {
      setSelectedUsage("10");
      handleUsageChange("10")
    } else if (normalizedName.includes("hourly") || normalizedName.includes("hour")) {
      setSelectedUsage("1");
      handleUsageChange("1");
    }
  }, [bookingData.subcategoryName]);

  if (!bookingData) {
    navigate('/');
    return null;
  }

  const getUsageOptions = () => {
    const normalizedName = bookingData.subcategoryName.toLowerCase();
    console.log('Subcategory Name:', bookingData.subcategoryName);
    console.log('Normalized Name:', normalizedName);

    if (normalizedName.includes('one-way') || normalizedName.includes('oneway') || normalizedName.includes('one way')) {
      return ['10', '25', '50', '100',];
    }
    if (normalizedName.includes('hourly') || normalizedName.includes('hour')) {
      return ['1', '2', '3', '4', '5'];
    }
    return ['1', '2', '3', '4', '5'];
  };

  const getUsageUnit = () => {
    const normalizedName = bookingData.subcategoryName.toLowerCase();
    if (normalizedName.includes('one-way') || normalizedName.includes('oneway') || normalizedName.includes('one way')) {
      return 'KM';
    }
    if (normalizedName.includes('hourly') || normalizedName.includes('hour')) {
      return 'Hr';
    }
    return 'Unit';
  };

  // Check if booking time is night time (22:00 to 6:00)
  const isNightTime = () => {
    if (!bookingData.selectedTime) return false;
    const time = bookingData.selectedTime.split(':');
    const hour = parseInt(time[0]);
    return hour >= 22 || hour < 6;
  };

  // Check for peak charges based on date and time - prioritize peak_dates first
  const getPeakCharges = () => {
    if (!peakCharges.length || !bookingData.selectedDate || !bookingData.selectedTime) {
      return { type: null, charges: 0 };
    }

    const bookingDate = bookingData.selectedDate;
    const bookingTime = bookingData.selectedTime;

    console.log('Checking peak charges for:', { bookingDate, bookingTime });

    // First check peak_dates (priority)
    const peakDate = peakCharges.find(peak => {
      if (peak.type === 'peak_dates') {
        const isDateInRange = bookingDate >= peak.startDate && bookingDate <= peak.endDate;
        console.log('Peak date check:', {
          peakName: peak.name,
          startDate: peak.startDate,
          endDate: peak.endDate,
          bookingDate,
          isDateInRange
        });
        return isDateInRange;
      }
      return false;
    });

    if (peakDate) {
      console.log('Found peak date match:', peakDate);
      return { type: 'peak_dates', charges: peakDate.price, name: peakDate.name };
    }

    // Then check peak_hours
    const peakHour = peakCharges.find(peak => {
      if (peak.type === 'peak_hours') {
        const isTimeInRange = bookingTime >= peak.startTime && bookingTime <= peak.endTime;
        console.log('Peak hour check:', {
          peakName: peak.name,
          startTime: peak.startTime,
          endTime: peak.endTime,
          bookingTime,
          isTimeInRange
        });
        return isTimeInRange;
      }
      return false;
    });

    if (peakHour) {
      console.log('Found peak hour match:', peakHour);
      return { type: 'peak_hours', charges: peakHour.price, name: peakHour.name };
    }

    console.log('No peak charges applied');
    return { type: null, charges: 0 };
  };

  const calculateCosts = () => {
    if (!filterDriver || !rideCosts) return {
      driverCharges: 0,
      pickCharges: 0,
      nightCharges: 0,
      peakCharges: 0,
      insuranceCharges: 0,
      subtotal: 0,
      adminCharges: 0,
      gstCharges: 0,
      discount: 0,
      total: 0
    };

    const usage = parseInt(selectedUsage || customUsage) || 0;
    const normalizedName = bookingData.subcategoryName.toLowerCase();

    // Base driver charges
    let driverCharges = 0;
    if (normalizedName.includes('one-way') || normalizedName.includes('oneway')) {
      driverCharges = filterDriver.chargePerKm * usage;
    } else if (normalizedName.includes('hourly') || normalizedName.includes('hour')) {
      let hourlyUsage = usage * 60
      driverCharges = filterDriver.chargePerMinute * hourlyUsage;
    } else {
      driverCharges = filterDriver.chargePerKm * usage;
    }

    // Additional charges from API
    const pickCharges = rideCosts[0].pickCharges || 0;
    console.log(pickCharges)
    const nightCharges = isNightTime() ? (rideCosts[0].nightCharges || 0) : 0;
    const peakInfo = getPeakCharges();
    const peakCharges = peakInfo.charges || 0;
    const insuranceCharges = bookingData.includeInsurance ? (rideCosts[0].insurance || 0) : 0;

    // Admin charges as percentage of subtotal (from API) - now included in subtotal
    const adminPercentage = (rideCosts.extraChargesFromAdmin || 10) / 100;
    const baseSubtotal = Math.ceil(driverCharges + pickCharges + nightCharges + peakCharges + insuranceCharges);
    const adminCharges = Math.ceil(baseSubtotal * adminPercentage);

    // Calculate subtotal (all charges including admin)
    const subtotal = Math.ceil(baseSubtotal + adminCharges);

    // GST as percentage of subtotal (from API)
    const gstPercentage = (rideCosts.gst || 18) / 100;
    const gstCharges = Math.ceil(adminCharges * gstPercentage);

    // Discount from API
    const discount = rideCosts.discount || 0;

    // Total
    const total = Math.ceil(subtotal + gstCharges - discount);

    console.log('Cost calculation:', {
      driverCharges,
      pickCharges,
      nightCharges,
      peakCharges: peakInfo.charges,
      peakType: peakInfo.type,
      peakName: peakInfo.name,
      insuranceCharges,
      adminCharges,
      subtotal,
      gstCharges,
      discount,
      total
    });

    return {
      driverCharges: Math.ceil(driverCharges),
      pickCharges,
      nightCharges,
      peakCharges,
      peakType: peakInfo.type,
      peakName: peakInfo.name,
      insuranceCharges,
      subtotal,
      adminCharges,
      gstCharges,
      discount,
      total: Math.max(0, total) // Ensure total is not negative
    };
  };

  // Function to calculate total cost for a specific driver category
  const calculateTotalForDriver = (category) => {
    if (!rideCosts) return 0;

    const usage = parseInt(selectedUsage || customUsage) || 0;
    const normalizedName = bookingData.subcategoryName.toLowerCase();

    // Base driver charges
    let driverCharges = 0;
    if (normalizedName.includes('one-way') || normalizedName.includes('oneway')) {
      driverCharges = category.chargePerKm * usage;
    } else if (normalizedName.includes('hourly') || normalizedName.includes('hour')) {
      let hourlyUsage = usage * 60
      driverCharges = category.chargePerMinute * hourlyUsage;
    } else {
      driverCharges = category.chargePerKm * usage;
    }

    // Additional charges from API
    const pickCharges = rideCosts[0].pickCharges || 0;
    const nightCharges = isNightTime() ? (rideCosts[0].nightCharges || 0) : 0;
    const peakInfo = getPeakCharges();
    const peakCharges = peakInfo.charges || 0;
    const insuranceCharges = bookingData.includeInsurance ? (rideCosts[0].insurance || 0) : 0;

    // Admin charges as percentage of subtotal (from API) - now included in subtotal
    const adminPercentage = (rideCosts.extraChargesFromAdmin || 10) / 100;
    const baseSubtotal = Math.ceil(driverCharges + pickCharges + nightCharges + peakCharges + insuranceCharges);
    const adminCharges = Math.ceil(baseSubtotal * adminPercentage);

    // Calculate subtotal (all charges including admin)
    const subtotal = Math.ceil(baseSubtotal + adminCharges);

    // GST as percentage of subtotal (from API)
    const gstPercentage = (rideCosts.gst || 18) / 100;
    const gstCharges = Math.ceil(subtotal * gstPercentage);

    // Discount from API
    const discount = rideCosts.discount || 0;

    // Total
    const total = Math.ceil(subtotal + gstCharges - discount);

    return Math.max(0, total);
  };

  const handleShowPriceBreakdown = () => {
    setShowPriceBreakdown(true);
  };

  const handleClosePriceBreakdown = () => {
    setShowPriceBreakdown(false);
  };

  const handleConfirmBooking = () => {
    const finalBookingData = {
      ...bookingData,
      selectedUsage: selectedUsage || customUsage,
      driverCategory,

      costs: calculateCosts()
    };
    navigate('/cost-breakdown', { state: finalBookingData });
  };

  // Set default category to "Prime"
  useEffect(() => {
    if (totalAmount?.length) {
      const defaultCategory = totalAmount.find(item => item.category.toLowerCase() === 'prime');
      if (defaultCategory) {
        setSelectedCategory(defaultCategory);
        console.log('Default category set:', defaultCategory);
      }
    }
  }, [totalAmount]);

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
    const currentCategory =  priceCategories.filter((item) => item.priceCategoryName.toLowerCase() === category.toLowerCase())
    return currentCategory[0]?.chargePerKm
  };

  const getMinRate = (category) => {
     const currentCategory =  priceCategories.filter((item) => item.priceCategoryName.toLowerCase() === category.toLowerCase())
    return currentCategory[0]?.chargePerMinute
  };

  console.log(bookingData)


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-4 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center mb-6">
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
              <div className="grid grid-cols-4 gap-2 mb-4">
                {getUsageOptions().map((option) => (
                  <Button
                    key={option}
                    variant={selectedUsage === option ? 'default' : 'outline'}
                    onClick={() => handleUsageChange(option)}
                    className="text-sm"
                  >
                    {option} {getUsageUnit()}
                  </Button>
                ))}
              </div>
              <div>
                <Label htmlFor="custom">Custom {getUsageUnit()}</Label>
                <Input
                  id="custom"
                  placeholder={`Enter custom ${getUsageUnit().toLowerCase()}`}
                  value={customUsage}
                  onChange={(e) => {
                    setCustomUsage(e.target.value);
                    setSelectedUsage('');
                  }}
                  type="number"
                />
              </div>
            </CardContent>
          </Card>

          {/* selected category */}
          {totalAmount.map((item, index) => (
            <button
              key={index}
              type="button"
              onClick={() => {
                console.log(item)
                setSelectedCategory(item)
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
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                  />
                </CardContent>
              </Card>
            )}
          </div>

          {/* Instructions Section */}
          {/* {instructions.length > 0 && (
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Info className="w-5 h-5 mr-2 text-blue-600" />
                  T & C
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {instructions.map((instruction, index) => (
                    <Card key={instruction._id} className="border border-gray-200 bg-gray-50">
                      <CardContent className="p-4">
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {instruction}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          )} */}

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
                      onClick={handleShowPriceBreakdown}
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
                onClick={handleClosePriceBreakdown}
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

                {bookingData.includeInsurance  && (
                  <div className="flex justify-between text-sm">
                    <span>Insurance:</span>
                    <span className="font-medium text-green-600">Included</span>
                  </div>
                )}
                {isNightTime() && (
                  <div className="flex justify-between text-sm">
                    <span>Night Time:</span>
                    <span className="font-medium text-orange-600">22:00-06:00</span>
                  </div>
                )}

              </div>

              {/* Simplified Cost Breakdown */}
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-800">Cost Details</h4>

                {/* <div className="flex justify-between text-sm font-medium">
                  <span>Insurance Charges:</span>
                  <span>₹{selectedCategory.insuranceCharges}</span>
                </div> */}

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
                  onClick={handleClosePriceBreakdown}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    handleClosePriceBreakdown();
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