import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, MapPin, Calendar, Clock } from 'lucide-react';
import { Navbar } from '../components/Sidebar';
import { setBookingStep1, updateField } from '../store/slices/bookingSlice';

const Booking = () => {
  const navigate = useNavigate();
  const { categoryId, subcategoryId } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();

  // Get existing booking data from Redux
  const bookingData = useSelector(state => state.booking);

  // Initialize state with Redux data or empty values
  const [fromLocation, setFromLocation] = useState(bookingData.fromLocation || '');
  const [toLocation, setToLocation] = useState(bookingData.toLocation || '');
  const [carType, setCarType] = useState(bookingData.carType || '');
  const [transmissionType, setTransmissionType] = useState(bookingData.transmissionType || '');
  const [selectedDate, setSelectedDate] = useState(bookingData.selectedDate || '');
  const [selectedTime, setSelectedTime] = useState(bookingData.selectedTime || '');
  const [vehicleCategories, setVehicleCategories] = useState([]);
  const [subcategoryName, setSubcategoryName] = useState(bookingData.subcategoryName || '');
  const [loading, setLoading] = useState(true);

  // Set default time to current time in HH:MM format and date also
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    if (!selectedDate) setSelectedDate(today);

    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const formattedTime = `${hours}:${minutes}`;
    if (!selectedTime) setSelectedTime(formattedTime);
  }, []);

  // Check if subcategory is "one way" to show/hide drop location
  const isOneWay = subcategoryName.replace(/[-\s]/g, '').toLowerCase() === 'oneway';

  useEffect(() => {
    const fetchSubcategoryDetails = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/subcategories/${subcategoryId}`);
        setSubcategoryName(res.data.name);

        // Update Redux with subcategory name
        dispatch(updateField({ field: 'subcategoryName', value: res.data.name }));
      } catch (error) {
        console.error('Failed to fetch subcategory details', error);
        setSubcategoryName('Service');
      }
    };

    const fetchVehicleCategories = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/vehiclecategories`);
        const categories = res.data?.data || [];
        setVehicleCategories(categories);

        // Auto-set first car type if not already set
        if (categories.length > 0 && !carType) {
          const firstCarType = categories[0].vehicleName.toLowerCase();
          setCarType(firstCarType);
          dispatch(updateField({ field: 'carType', value: firstCarType }));
        }
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

      // Update Redux with category IDs
      dispatch(updateField({ field: 'categoryId', value: categoryId }));
      dispatch(updateField({ field: 'subcategoryId', value: subcategoryId }));
    }

    // Set default transmission if not already set
    const transmissionOptions = ['Manual', 'Automatic'];
    if (transmissionOptions.length > 0 && !transmissionType) {
      const defaultTransmission = transmissionOptions[0].toLowerCase();
      setTransmissionType(defaultTransmission);
      dispatch(updateField({ field: 'transmissionType', value: defaultTransmission }));
    }

  }, [categoryId, subcategoryId]);

  // Update Redux when form fields change
  useEffect(() => {
    dispatch(updateField({ field: 'fromLocation', value: fromLocation }));
  }, [fromLocation, dispatch]);

  useEffect(() => {
    dispatch(updateField({ field: 'toLocation', value: toLocation }));
  }, [toLocation, dispatch]);

  useEffect(() => {
    dispatch(updateField({ field: 'carType', value: carType }));
  }, [carType, dispatch]);

  useEffect(() => {
    dispatch(updateField({ field: 'transmissionType', value: transmissionType }));
  }, [transmissionType, dispatch]);

  useEffect(() => {
    dispatch(updateField({ field: 'selectedDate', value: selectedDate }));
  }, [selectedDate, dispatch]);

  useEffect(() => {
    dispatch(updateField({ field: 'selectedTime', value: selectedTime }));
  }, [selectedTime, dispatch]);

  // Clear toLocation when subcategory changes and it's not "one way"
  useEffect(() => {
    if (!isOneWay) {
      setToLocation('');
      dispatch(updateField({ field: 'toLocation', value: '' }));
    }
  }, [isOneWay]);

  const transmissionOptions = ['Manual', 'Automatic'];

  const handleNextPage = () => {
    const bookingData = {
      categoryId,
      subcategoryId,
      subcategoryName,
      fromLocation,
      toLocation: isOneWay ? toLocation : '',
      carType,
      transmissionType,
      selectedDate,
      selectedTime,
    };

    // Dispatch the complete step 1 data to Redux
    dispatch(setBookingStep1(bookingData));

    navigate('/booking-step2', { state: bookingData });
  };

  // Updated form validation - removed includeInsurance dependency
  const isFormValid =
    fromLocation &&
    (isOneWay ? toLocation : true) &&
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
          <Button variant="ghost" onClick={() => navigate('/')} className="mr-4 p-2 hover:bg-white/50 rounded-full">
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">
            {subcategoryName} Booking - Step 1
          </h1>
        </div>

        <div className="space-y-6">
          {/* Single Card with All Sections */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              {/* <CardTitle>Booking Details</CardTitle> */}
            </CardHeader>
            <CardContent className="space-y-8">

              {/* Location Selection Section */}
              <div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="from">From</Label>
                    <div className="relative">
                      <div className="absolute left-3 top-3 w-3 h-3 bg-green-500 rounded-full"></div>
                      <Input
                        id="from"
                        placeholder="Enter pickup location"
                        value={fromLocation}
                        onChange={(e) => setFromLocation(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* Conditionally render To location only for "one way" */}
                  {isOneWay && (
                    <div>
                      <Label htmlFor="to">To</Label>
                      <div className="relative">
                        <div className="absolute left-3 top-3 w-3 h-3 bg-red-500 rounded-full"></div>
                        <Input
                          id="to"
                          placeholder="Enter destination"
                          value={toLocation}
                          onChange={(e) => setToLocation(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Divider */}
              <hr className="border-gray-200" />

              {/* Schedule Details Section */}
              <div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="selectedDate">Date</Label>
                    <Input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="pr-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="selectedTime">Time</Label>
                    <Input
                      type="time"
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="pr-2"
                    />
                  </div>
                </div>
              </div>

              {/* Divider */}
              <hr className="border-gray-200" />

              {/* Car Preferences Section */}
              <div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Car Type</Label>
                    <Select value={carType} onValueChange={setCarType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {vehicleCategories.map((vehicle) => (
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
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {transmissionOptions.map((trans) => (
                          <SelectItem key={trans} value={trans.toLowerCase()}>{trans}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
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