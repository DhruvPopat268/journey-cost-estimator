import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Clock, Star, Award, Crown, MapPin, CreditCard, X, Receipt } from 'lucide-react';

const iconMap = {
  normal: Star,
  classic: Award,
  prime: Crown,
};

const BookingStep2 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const bookingData = location.state;
  console.log('Booking Data:', bookingData);

  const [selectedUsage, setSelectedUsage] = useState('');
  const [customUsage, setCustomUsage] = useState('');
  const [driverCategory, setDriverCategory] = useState('');
  const [priceCategories, setPriceCategories] = useState([]);
  const [peakCharges, setPeakCharges] = useState([]);
  const [rideCosts, setRideCosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPriceBreakdown, setShowPriceBreakdown] = useState(false);
  const [filterDriver, setFilterDriver] = useState(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [priceRes, peakRes, rideRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/api/price-categories`),
          axios.get(`${import.meta.env.VITE_API_URL}/api/peaks`),
          axios.get(`${import.meta.env.VITE_API_URL}/api/ride-costs`)
        ]);

        setPriceCategories(priceRes.data || []);
        setPeakCharges(peakRes.data?.data || []);
        setRideCosts(rideRes.data || null);
        console.log('Peak Charges:', peakRes.data);
        console.log('Ride Costs:', rideRes.data);
      } catch (error) {
        console.error('Failed to fetch data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  // Update filterDriver when driverCategory changes
  useEffect(() => {
    if (driverCategory && priceCategories.length > 0) {
      const driverType = priceCategories.find(
        (driver) => driver.priceCategoryName === driverCategory
      );
      setFilterDriver(driverType);
    }
  }, [driverCategory, priceCategories]);

  if (!bookingData) {
    navigate('/');
    return null;
  }

  const getUsageOptions = () => {
    const normalizedName = bookingData.subcategoryName.toLowerCase();
    if (normalizedName.includes('one-way') || normalizedName.includes('oneway')) {
      return ['25', '50', '100', '150'];
    }
    if (normalizedName.includes('hourly') || normalizedName.includes('hour')) {
      return ['60', '120', '180', '240', '300'];
    }
    return ['1', '2', '3', '4', '5'];
  };

  const getUsageUnit = () => {
    const normalizedName = bookingData.subcategoryName.toLowerCase();
    if (normalizedName.includes('one-way') || normalizedName.includes('oneway')) {
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
      driverCharges = filterDriver.chargePerMinute * usage;
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

    // Calculate subtotal (all charges except admin and GST)
    const subtotal = Math.round(driverCharges + pickCharges + nightCharges + peakCharges + insuranceCharges);

    // Admin charges as percentage of subtotal (from API)
    const adminPercentage = (rideCosts.extraChargesFromAdmin || 10) / 100;
    const adminCharges = Math.round(subtotal * adminPercentage);

    // GST as percentage of admin charges (from API)
    const gstPercentage = (rideCosts.gst || 18) / 100;
    const gstCharges = Math.round(adminCharges * gstPercentage);

    // Discount from API
    const discount = rideCosts.discount || 0;

    // Total
    const total = Math.round(subtotal + adminCharges + gstCharges - discount);

    console.log('Cost calculation:', {
      driverCharges,
      pickCharges,
      nightCharges,
      peakCharges: peakInfo.charges,
      peakType: peakInfo.type,
      peakName: peakInfo.name,
      insuranceCharges,
      subtotal,
      adminCharges,
      gstCharges,
      discount,
      total
    });

    return {
      driverCharges: Math.round(driverCharges),
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

  const isFormValid = (selectedUsage || customUsage) && driverCategory;
  const costs = calculateCosts();

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
                    onClick={() => {
                      setSelectedUsage(option);
                      setCustomUsage('');
                    }}
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

          {/* Choose Driver Type */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle>Choose Driver Type</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {priceCategories.map((category) => {
                  const IconComponent = iconMap[category.priceCategoryName.toLowerCase()] || Star;
                  const usageValue = parseFloat(selectedUsage || customUsage || '0');
                  const normalizedName = bookingData.subcategoryName.toLowerCase();

                  const unitRate = (normalizedName.includes('one-way') || normalizedName.includes('oneway'))
                    ? category.chargePerKm
                    : category.chargePerMinute;

                  const estimatedCost = usageValue * unitRate;

                  return (
                    <div
                      key={category._id}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${driverCategory === category.priceCategoryName
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                        }`}
                      onClick={() => setDriverCategory(category.priceCategoryName)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                            <IconComponent className="w-5 h-5 text-gray-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold capitalize">{category.priceCategoryName}</h3>
                            <p className="text-sm text-gray-500">
                              ₹{category.chargePerKm} / Km & ₹{category.chargePerMinute} / Minute
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">
                            ₹{isNaN(estimatedCost) ? 0 : estimatedCost.toFixed(2)}
                          </p>
                          <p className="text-xs text-muted-foreground">Base Cost</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Total and Price Breakdown Section */}
          {isFormValid && (
            <Card className="bg-white shadow-lg border-2 border-green-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Total Amount</h3>
                    <p className="text-3xl font-bold text-green-600">₹{costs.total}</p>
                  </div>
                  <Button
                    onClick={handleShowPriceBreakdown}
                    variant="outline"
                    className="flex items-center space-x-2 border-blue-500 text-blue-600 hover:bg-blue-50"
                  >
                    <Receipt className="w-4 h-4" />
                    <span>View Breakdown</span>
                  </Button>
                </div>

                <Button
                  onClick={handleConfirmBooking}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold rounded-lg"
                >
                  Confirm & Pay ₹{costs.total}
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

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
                  <span className="font-medium capitalize">{driverCategory}</span>
                </div>
                {bookingData.includeInsurance && (
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
                {costs.peakType && (
                  <div className="flex justify-between text-sm">
                    <span>Peak Period:</span>
                    <span className="font-medium text-red-600">{costs.peakName || costs.peakType.replace('_', ' ')}</span>
                  </div>
                )}
              </div>

              {/* Cost Breakdown */}
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-800">Cost Details</h4>

                <div className="flex justify-between text-sm">
                  <span>Driver Charges:</span>
                  <span className="font-medium">₹{costs.driverCharges}</span>
                </div>

                {costs.pickCharges > 0 && (
                  <div className="flex justify-between text-sm">
                    <span>Pick-up Charges:</span>
                    <span className="font-medium">₹{costs.pickCharges}</span>
                  </div>
                )}

                {costs.nightCharges > 0 && (
                  <div className="flex justify-between text-sm">
                    <span>Night Charges (22:00-06:00):</span>
                    <span className="font-medium">₹{costs.nightCharges}</span>
                  </div>
                )}

                {costs.peakCharges > 0 && (
                  <div className="flex justify-between text-sm">
                    <span>Peak Charges ({costs.peakName || costs.peakType?.replace('_', ' ')}):</span>
                    <span className="font-medium">₹{costs.peakCharges}</span>
                  </div>
                )}

                {costs.insuranceCharges > 0 && (
                  <div className="flex justify-between text-sm">
                    <span>Insurance Charges:</span>
                    <span className="font-medium">₹{costs.insuranceCharges}</span>
                  </div>
                )}

                <Separator className="my-2" />

                <div className="flex justify-between text-sm font-medium">
                  <span>Subtotal:</span>
                  <span>₹{costs.subtotal}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span>Admin Charges ({rideCosts?.extraChargesFromAdmin || 10}% of subtotal):</span>
                  <span className="font-medium">₹{costs.adminCharges}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span>GST ({rideCosts?.gst || 18}% of admin charges):</span>
                  <span className="font-medium">₹{costs.gstCharges}</span>
                </div>

                {costs.discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span>Discount:</span>
                    <span className="font-medium text-green-600">-₹{costs.discount}</span>
                  </div>
                )}

                <Separator className="my-3" />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total Amount:</span>
                  <span className="text-green-600">₹{costs.total}</span>
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