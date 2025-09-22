import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { CommonFields } from '../components/booking/common/CommonFields';
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
  const [categoryName, setCategoryName] = useState(bookingData.categoryName || '');
  const [subcategoryName, setSubcategoryName] = useState(bookingData.subcategoryName || '');
  const [loading, setLoading] = useState(true);

  // Add new state variables for time duration
  const [startTime, setStartTime] = useState(bookingData.startTime || '');
  const [endTime, setEndTime] = useState(bookingData.endTime || '');



  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    if (!selectedDate) setSelectedDate(today);

    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const formattedTime = `${hours}:${minutes}`;

    // Check if it's weekly/monthly driver/cab service
    const isWeeklyMonthlyDriverCab = () => {
      const normalizedCategory = categoryName.replace(/[-\s]/g, '').toLowerCase();
      const normalizedSubcategory = subcategoryName.replace(/[-\s]/g, '').toLowerCase();
      return (normalizedCategory === 'driver' || normalizedCategory === 'cab') &&
        (normalizedSubcategory === 'weekly' || normalizedSubcategory === 'monthly');
    };

    if (isWeeklyMonthlyDriverCab()) {
      // Set default start and end time for duration
      if (!startTime) setStartTime('03:00');
      if (!endTime) setEndTime('05:00');
    } else {
      // Set regular time for other services
      if (!selectedTime) setSelectedTime(formattedTime);
    }
  }, [categoryName, subcategoryName]);

  // Function to check if service needs time duration
  const needsTimeDuration = () => {
    const normalizedCategory = categoryName.replace(/[-\s]/g, '').toLowerCase();
    const normalizedSubcategory = subcategoryName.replace(/[-\s]/g, '').toLowerCase();
    return (normalizedCategory === 'driver' || normalizedCategory === 'cab') &&
      (normalizedSubcategory === 'weekly' || normalizedSubcategory === 'monthly');
  };

  // Function to check if it's a parcel service
  const isParcelService = () => {
    const normalizedCategory = categoryName.replace(/[-\s]/g, '').toLowerCase();
    return normalizedCategory === 'parcel';
  };

  // Add new useEffects for Redux updates
  useEffect(() => {
    dispatch(updateField({ field: 'startTime', value: startTime }));
  }, [startTime, dispatch]);

  useEffect(() => {
    dispatch(updateField({ field: 'endTime', value: endTime }));
  }, [endTime, dispatch]);



  // Updated function to check if subcategory needs drop location
  const needsDropLocation = () => {
    const normalizedSubcategory = subcategoryName.replace(/[-\s]/g, '').toLowerCase();
    const normalizedCategory = categoryName.replace(/[-\s]/g, '').toLowerCase();

    // Define combinations that need drop location
    return normalizedSubcategory === 'oneway' || 
           normalizedSubcategory === 'pointtopoint' ||
           normalizedCategory === 'parcel'; // Add parcel service
  };

  useEffect(() => {
    const fetchSubcategoryDetails = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/subcategories/${subcategoryId}`);
        setSubcategoryName(res.data.name);
        setCategoryName(res.data?.categoryId?.name || '');
        // Update Redux with subcategory and category names
        dispatch(updateField({ field: 'subcategoryName', value: res.data.name }));
        dispatch(updateField({ field: 'categoryName', value: res.data?.categoryId?.name || '' }));
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

        // Auto-set first car type if not already set and not a parcel service
        if (categories.length > 0 && !carType && !isParcelService()) {
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

    // Set default transmission if not already set and not a parcel service
    const transmissionOptions = ['Manual', 'Automatic'];
    if (transmissionOptions.length > 0 && !transmissionType && !isParcelService()) {
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

  // Clear toLocation when subcategory changes and doesn't need drop location
  useEffect(() => {
    if (!needsDropLocation()) {
      setToLocation('');
      dispatch(updateField({ field: 'toLocation', value: '' }));
    }
  }, [subcategoryName]);



  const transmissionOptions = ['Manual', 'Automatic'];

  // Updated handleNextPage function
  const handleNextPage = () => {
    const bookingData = {
      categoryId,
      subcategoryId,
      categoryName,
      subcategoryName,
      fromLocation,
      toLocation: needsDropLocation() ? toLocation : '',
      carType: isParcelService() ? '' : carType,
      transmissionType: isParcelService() ? '' : transmissionType,
      selectedDate,
      selectedTime: needsTimeDuration() ? '' : selectedTime,
      startTime: needsTimeDuration() ? startTime : '',
      endTime: needsTimeDuration() ? endTime : '',

    };

    // Dispatch the complete step 1 data to Redux
    dispatch(setBookingStep1(bookingData));
    
    navigate('/booking-step2', { state: bookingData });
  };

  // Updated form validation
  const isFormValid = () => {
    const basicValidation = fromLocation &&
      (needsDropLocation() ? toLocation : true) &&
      selectedDate &&
      (needsTimeDuration() ? (startTime && endTime) : selectedTime);

    if (isParcelService()) {
      // For parcel service: need basic fields, but not car/transmission
      return basicValidation;
    } else {
      // For other services: need basic fields + car/transmission info
      return basicValidation && carType && transmissionType;
    }
  };

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
            {categoryName} - {subcategoryName} Booking - Step 1
          </h1>
        </div>

        <div className="space-y-6">
          <CommonFields
            fromLocation={fromLocation}
            toLocation={toLocation}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            startTime={startTime}
            endTime={endTime}
            carType={carType}
            transmissionType={transmissionType}

            vehicleCategories={vehicleCategories}
            transmissionOptions={transmissionOptions}
            showToLocation={needsDropLocation()}
            showTimeDuration={needsTimeDuration()}
            showVehicleFields={!isParcelService()}
            showReceiverFields={false}
            dateLabel={needsTimeDuration() ? 'Start Date' : 'Date'}
            onFieldChange={(field, value) => {
              switch (field) {
                case 'fromLocation':
                  setFromLocation(value);
                  break;
                case 'toLocation':
                  setToLocation(value);
                  break;
                case 'selectedDate':
                  setSelectedDate(value);
                  break;
                case 'selectedTime':
                  setSelectedTime(value);
                  break;
                case 'startTime':
                  setStartTime(value);
                  break;
                case 'endTime':
                  setEndTime(value);
                  break;
                case 'carType':
                  setCarType(value);
                  break;
                case 'transmissionType':
                  setTransmissionType(value);
                  break;

              }
            }}
          />
          {/* Next Button */}
          <Button
            onClick={handleNextPage}
            disabled={!isFormValid()}
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