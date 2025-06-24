import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, MapPin, Clock, Star, Award, Crown, Calendar, Shield } from 'lucide-react';

const iconMap = {
  normal: Star,
  classic: Award,
  prime: Crown,
};

const Booking = () => {
  const navigate = useNavigate();
  const { categoryId, subcategoryId } = useParams();
  

  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [selectedUsage, setSelectedUsage] = useState('');
  const [customUsage, setCustomUsage] = useState('');
  const [carType, setCarType] = useState('');
  const [transmissionType, setTransmissionType] = useState('');
  const [driverCategory, setDriverCategory] = useState('');
  const [vehicleCategories, setVehicleCategories] = useState([]);
  const [priceCategories, setPriceCategories] = useState([]);
  const [subcategoryName, setSubcategoryName] = useState('');
  const [loading, setLoading] = useState(true);
  
  // New date and time fields
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [fromTime, setFromTime] = useState('');
  const [toTime, setToTime] = useState('');
  
  // Insurance toggle field
  const [includeInsurance, setIncludeInsurance] = useState(false);

  useEffect(() => {
    const fetchSubcategoryDetails = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/subcategories/${subcategoryId}`);
        setSubcategoryName(res.data.name);
      } catch (error) {
        console.error('Failed to fetch subcategory details', error);
        setSubcategoryName('Service'); // Fallback name
      }
    };

    const fetchVehicleCategories = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/vehiclecategories`);
        setVehicleCategories(res.data?.data || []);
      } catch (error) {
        console.error('Failed to fetch vehicle categories', error);
      }
    };

    const fetchPriceCategories = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/price-categories`);
        setPriceCategories(res.data || []);
      } catch (error) {
        console.error('Failed to fetch price categories', error);
      }
    };

    const fetchAllData = async () => {
      setLoading(true);
      await Promise.all([
        fetchSubcategoryDetails(),
        fetchVehicleCategories(),
        fetchPriceCategories()
      ]);
      setLoading(false);
    };

    if (subcategoryId) {
      fetchAllData();
    }
  }, [import.meta.env.VITE_API_URL, subcategoryId]);

  // Set default date to today
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    if (!fromDate) setFromDate(today);
    if (!toDate) setToDate(today);
  }, []);

  const getUsageOptions = () => {
    const normalizedName = subcategoryName.toLowerCase();
    if (normalizedName.includes('one-way') || normalizedName.includes('oneway')) {
      return ['25', '50', '100', '150'];
    }
    if (normalizedName.includes('hourly') || normalizedName.includes('hour')) {
      return ['60', '120', '180', '240', '300'];
    }
    // Default options for other subcategories
    return ['1', '2', '3', '4', '5'];
  };

  const getUsageUnit = () => {
    const normalizedName = subcategoryName.toLowerCase();
    if (normalizedName.includes('one-way') || normalizedName.includes('oneway')) {
      return 'KM';
    }
    if (normalizedName.includes('hourly') || normalizedName.includes('hour')) {
      return 'Hr';
    }
    // Default unit
    return 'Unit';
  };

  const transmissionOptions = ['Manual', 'Automatic'];

  const handleBookRide = () => {
    const bookingData = {
      categoryId,
      subcategoryId,
      subcategoryName,
      fromLocation,
      toLocation,
      usage: selectedUsage || customUsage,
      carType,
      transmissionType,
      driverCategory,
      fromDate,
      toDate,
      fromTime,
      toTime,
      includeInsurance,
    };
    navigate('/cost-breakdown', { state: bookingData });
  };

  const isFormValid =
    fromLocation &&
    toLocation &&
    (selectedUsage || customUsage) &&
    carType &&
    transmissionType &&
    driverCategory &&
    fromDate &&
    toDate &&
    fromTime &&
    toTime;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-4 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading booking details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-4 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mr-4 p-2 hover:bg-white/50 rounded-full">
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">
            {subcategoryName} Booking
          </h1>
        </div>

        <div className="space-y-6">
          {/* Location Selection */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                Select Locations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="from">From</Label>
                <div className="relative">
                  <div className="absolute left-3 top-3 w-3 h-3 bg-green-500 rounded-full"></div>
                  <Input id="from" placeholder="Enter pickup location" value={fromLocation} onChange={(e) => setFromLocation(e.target.value)} className="pl-10" />
                </div>
              </div>
              <div>
                <Label htmlFor="to">To</Label>
                <div className="relative">
                  <div className="absolute left-3 top-3 w-3 h-3 bg-red-500 rounded-full"></div>
                  <Input id="to" placeholder="Enter destination" value={toLocation} onChange={(e) => setToLocation(e.target.value)} className="pl-10" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Date and Time Selection */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                Schedule Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fromDate">From Date</Label>
                  <Input 
                    id="fromDate" 
                    type="date" 
                    value={fromDate} 
                    onChange={(e) => setFromDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div>
                  <Label htmlFor="toDate">To Date</Label>
                  <Input 
                    id="toDate" 
                    type="date" 
                    value={toDate} 
                    onChange={(e) => setToDate(e.target.value)}
                    min={fromDate || new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fromTime">From Time</Label>
                  <Input 
                    id="fromTime" 
                    type="time" 
                    value={fromTime} 
                    onChange={(e) => setFromTime(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="toTime">To Time</Label>
                  <Input 
                    id="toTime" 
                    type="time" 
                    value={toTime} 
                    onChange={(e) => setToTime(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

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
                  <Button key={option} variant={selectedUsage === option ? 'default' : 'outline'} onClick={() => {
                    setSelectedUsage(option);
                    setCustomUsage('');
                  }} className="text-sm">
                    {option} {getUsageUnit()}
                  </Button>
                ))}
              </div>
              <div>
                <Label htmlFor="custom">Custom {getUsageUnit()}</Label>
                <Input id="custom" placeholder={`Enter custom ${getUsageUnit().toLowerCase()}`} value={customUsage} onChange={(e) => {
                  setCustomUsage(e.target.value);
                  setSelectedUsage('');
                }} type="number" />
              </div>
            </CardContent>
          </Card>

          {/* Car Preferences */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle>Car Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Car Type</Label>
                <Select value={carType} onValueChange={setCarType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select car type" />
                  </SelectTrigger>
                  <SelectContent>
                    {vehicleCategories.map((vehicle: any) => (
                      <SelectItem key={vehicle._id} value={vehicle.vehicleName.toLowerCase()}>
                        {vehicle.vehicleName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Transmission</Label>
                <Select value={transmissionType} onValueChange={setTransmissionType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select transmission" />
                  </SelectTrigger>
                  <SelectContent>
                    {transmissionOptions.map((trans) => (
                      <SelectItem key={trans} value={trans.toLowerCase()}>{trans}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Insurance Option */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2 text-blue-600" />
                Insurance Coverage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Shield className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Travel Insurance</h3>
                    <p className="text-sm text-gray-500">
                      Comprehensive coverage for your journey
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeInsurance}
                    onChange={(e) => setIncludeInsurance(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
            </CardContent>
          </Card>

          {/* Driver Category */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle>Choose Driver Type</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {priceCategories.map((category) => {
                  const IconComponent = iconMap[category.priceCategoryName.toLowerCase()] || Star;

                  const usageValue = parseFloat(selectedUsage || customUsage || '0');
                  const normalizedName = subcategoryName.toLowerCase();
                  
                  // Determine which rate to use based on subcategory name
                  const unitRate = (normalizedName.includes('one-way') || normalizedName.includes('oneway'))
                    ? category.chargePerKm 
                    : category.chargePerMinute;

                  const estimatedCost = usageValue * unitRate;

                  return (
                    <div
                      key={category._id}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        driverCategory === category.priceCategoryName
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
                          <p className="text-xs text-muted-foreground">Est. Cost</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Book Ride Button */}
          <Button
            onClick={handleBookRide}
            disabled={!isFormValid}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Book Ride
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Booking;