import React, { useEffect, useState } from 'react';
import { useNavigate, useParams , useLocation } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, MapPin, Calendar, Shield } from 'lucide-react';

const Booking = () => {
  const navigate = useNavigate();
  const { categoryId, subcategoryId } = useParams();
  
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [carType, setCarType] = useState('');
  const [transmissionType, setTransmissionType] = useState('');
  const [vehicleCategories, setVehicleCategories] = useState([]);
  const [subcategoryName, setSubcategoryName] = useState('');
  const [loading, setLoading] = useState(true);
  
  // Updated date and time fields - only 2 fields instead of 4
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const location = useLocation();
  
  // Insurance toggle field
  const [includeInsurance, setIncludeInsurance] = useState(false);

  useEffect(() => {
    const fetchSubcategoryDetails = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/subcategories/${subcategoryId}`);
        setSubcategoryName(res.data.name);
      } catch (error) {
        console.error('Failed to fetch subcategory details', error);
        setSubcategoryName('Service');
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

    const fetchAllData = async () => {
      setLoading(true);
      await Promise.all([
        fetchSubcategoryDetails(),
        fetchVehicleCategories()
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
    if (!selectedDate) setSelectedDate(today);
  }, []);

  // Add this useEffect after your existing useEffects to restore data from navigation state
useEffect(() => {
  // Check if we're coming back from Step 2 with existing data
  if (location.state) {
    const {
      fromLocation: prevFromLocation,
      toLocation: prevToLocation,
      carType: prevCarType,
      transmissionType: prevTransmissionType,
      selectedDate: prevSelectedDate,
      selectedTime: prevSelectedTime,
      includeInsurance: prevIncludeInsurance
    } = location.state;

    if (prevFromLocation) setFromLocation(prevFromLocation);
    if (prevToLocation) setToLocation(prevToLocation);
    if (prevCarType) setCarType(prevCarType);
    if (prevTransmissionType) setTransmissionType(prevTransmissionType);
    if (prevSelectedDate) setSelectedDate(prevSelectedDate);
    if (prevSelectedTime) setSelectedTime(prevSelectedTime);
    if (prevIncludeInsurance !== undefined) setIncludeInsurance(prevIncludeInsurance);
  }
}, [location.state]);

  const transmissionOptions = ['Manual', 'Automatic'];

  const handleNextPage = () => {
    const bookingData = {
      categoryId,
      subcategoryId,
      subcategoryName,
      fromLocation,
      toLocation,
      carType,
      transmissionType,
      selectedDate,
      selectedTime,
      includeInsurance,
    };
    navigate('/booking-step2', { state: bookingData });
  };

  const isFormValid =
    fromLocation &&
    toLocation &&
    carType &&
    transmissionType &&
    selectedDate &&
    selectedTime;

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
            {subcategoryName} Booking - Step 1
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

          {/* Schedule Details - Updated to only 2 fields side by side */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                Schedule Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="selectedDate">Date</Label>
                  <Input 
                    id="selectedDate" 
                    type="date" 
                    value={selectedDate} 
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div>
                  <Label htmlFor="selectedTime">Time</Label>
                  <Input 
                    id="selectedTime" 
                    type="time" 
                    value={selectedTime} 
                    onChange={(e) => setSelectedTime(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Car Preferences */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle>Car Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
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
              </div>
            </CardContent>
          </Card>

          {/* Insurance Coverage */}
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

          {/* Next Button */}
          <Button
            onClick={handleNextPage}
            disabled={!isFormValid}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next Step
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Booking;