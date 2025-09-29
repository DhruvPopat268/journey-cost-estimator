import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { CommonFields } from '../components/booking/common/CommonFields';
import { setBookingStep1, updateField } from '../store/slices/bookingSlice';

const Booking = () => {
  const navigate = useNavigate();
  const { categoryId, subcategoryId, subSubcategoryId } = useParams();
  const dispatch = useDispatch();

  const bookingData = useSelector(state => state.booking);

  const [fromLocation, setFromLocation] = useState(bookingData.fromLocation || '');
  const [toLocation, setToLocation] = useState(bookingData.toLocation || '');
  const [fromLocationData, setFromLocationData] = useState(bookingData.fromLocationData || null);
  const [toLocationData, setToLocationData] = useState(bookingData.toLocationData || null);
  const [carType, setCarType] = useState(bookingData.carType || '');
  const [transmissionType, setTransmissionType] = useState(bookingData.transmissionType || '');
  const [selectedDate, setSelectedDate] = useState(bookingData.selectedDate || '');
  const [selectedTime, setSelectedTime] = useState(bookingData.selectedTime || '');
  const [startTime, setStartTime] = useState(bookingData.startTime || '');
  const [endTime, setEndTime] = useState(bookingData.endTime || '');
  const [vehicleCategories, setVehicleCategories] = useState([]);
  const [categoryName, setCategoryName] = useState(bookingData.categoryName || '');
  const [subcategoryName, setSubcategoryName] = useState(bookingData.subcategoryName || '');
  const [subSubcategoryName, setSubSubcategoryName] = useState(bookingData.subSubcategoryName || '');
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(bookingData.selectedCity || '');
  const [selectedCityName, setSelectedCityName] = useState(bookingData.selectedCityName || '');
  const [citySearch, setCitySearch] = useState(bookingData.selectedCityName || '');
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [loading, setLoading] = useState(true);
  const [citiesLoading, setCitiesLoading] = useState(true);
  const cityDropdownRef = useRef(null);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    if (!selectedDate) setSelectedDate(today);

    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const formattedTime = `${hours}:${minutes}`;
    
    if (!selectedTime) setSelectedTime(formattedTime);
    if (!startTime) setStartTime('03:00');
    if (!endTime) setEndTime('05:00');
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/cities`);
        const activeCities = response.data.filter(city => city.status === true);
        setCities(activeCities);
      } catch (error) {
        console.error('Failed to fetch cities', error);
      } finally {
        setCitiesLoading(false);
      }
    };

    fetchCities();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cityDropdownRef.current && !cityDropdownRef.current.contains(event.target)) {
        setShowCityDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requests = [
          axios.get(`${import.meta.env.VITE_API_URL}/api/subcategories/${subcategoryId}`),
          axios.get(`${import.meta.env.VITE_API_URL}/api/vehiclecategories`)
        ];
        
        // Add sub-subcategory request if subSubcategoryId exists
        if (subSubcategoryId) {
          requests.push(axios.get(`${import.meta.env.VITE_API_URL}/api/subsubcategories/${subSubcategoryId}`));
        }
        
        const responses = await Promise.all(requests);
        const [subcategoryRes, vehicleRes, subSubcategoryRes] = responses;

        setSubcategoryName(subcategoryRes.data.name);
        setCategoryName(subcategoryRes.data?.categoryId?.name || '');
        setVehicleCategories(vehicleRes.data?.data || []);
        
        // Set sub-subcategory name if available
        if (subSubcategoryRes) {
          setSubSubcategoryName(subSubcategoryRes.data.name);
        }

        if (!carType && vehicleRes.data?.data?.length > 0) {
          setCarType(vehicleRes.data.data[0].vehicleName.toLowerCase());
        }
        if (!transmissionType) {
          setTransmissionType('manual');
        }
      } catch (error) {
        console.error('Failed to fetch data', error);
      } finally {
        setLoading(false);
      }
    };

    if (subcategoryId && selectedCity) {
      fetchData();
      dispatch(updateField({ field: 'categoryId', value: categoryId }));
      dispatch(updateField({ field: 'subcategoryId', value: subcategoryId }));
      if (subSubcategoryId) {
        dispatch(updateField({ field: 'subSubcategoryId', value: subSubcategoryId }));
      }
    }
  }, [categoryId, subcategoryId, subSubcategoryId, selectedCity]);

  useEffect(() => {
    dispatch(updateField({ field: 'fromLocation', value: fromLocation }));
  }, [fromLocation]);

  useEffect(() => {
    dispatch(updateField({ field: 'toLocation', value: toLocation }));
  }, [toLocation]);

  useEffect(() => {
    dispatch(updateField({ field: 'carType', value: carType }));
  }, [carType]);

  useEffect(() => {
    dispatch(updateField({ field: 'transmissionType', value: transmissionType }));
  }, [transmissionType]);

  useEffect(() => {
    dispatch(updateField({ field: 'selectedDate', value: selectedDate }));
  }, [selectedDate]);

  useEffect(() => {
    dispatch(updateField({ field: 'selectedTime', value: selectedTime }));
  }, [selectedTime]);

  useEffect(() => {
    dispatch(updateField({ field: 'startTime', value: startTime }));
  }, [startTime]);

  useEffect(() => {
    dispatch(updateField({ field: 'endTime', value: endTime }));
  }, [endTime]);

  useEffect(() => {
    dispatch(updateField({ field: 'fromLocationData', value: fromLocationData }));
  }, [fromLocationData]);

  useEffect(() => {
    dispatch(updateField({ field: 'toLocationData', value: toLocationData }));
  }, [toLocationData]);

  useEffect(() => {
    dispatch(updateField({ field: 'selectedCity', value: selectedCity }));
  }, [selectedCity]);

  useEffect(() => {
    dispatch(updateField({ field: 'selectedCityName', value: selectedCityName }));
  }, [selectedCityName]);



  const transmissionOptions = ['Manual', 'Automatic'];

  const handleNextPage = () => {
    const bookingData = {
      categoryId,
      subcategoryId,
      subSubcategoryId,
      categoryName,
      subcategoryName,
      subSubcategoryName,
      selectedCity,
      selectedCityName,
      fromLocation,
      toLocation,
      fromLocationData,
      toLocationData,
      carType,
      transmissionType,
      selectedDate,
      selectedTime,
      startTime,
      endTime
    };

    dispatch(setBookingStep1(bookingData));
    console.log('Booking Data:', bookingData);
    navigate('/booking-step2', { state: bookingData });
  };

  const isFormValid = () => {
    return fromLocation && selectedDate && selectedTime;
  };

  if (citiesLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-4 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading cities...</p>
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
            {categoryName} - {subcategoryName}{subSubcategoryName ? ` - ${subSubcategoryName}` : ''} Booking - Step 1
          </h1>
        </div>

        <div className="space-y-6">
          {/* City Selection */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select City *
            </label>
            <div className="relative" ref={cityDropdownRef}>
              <input
                type="text"
                value={citySearch}
                onChange={(e) => {
                  setCitySearch(e.target.value);
                  setShowCityDropdown(true);
                }}
                onFocus={() => setShowCityDropdown(true)}
                placeholder="Search and select a city..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              {showCityDropdown && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {cities
                    .filter(city => city.name.toLowerCase().includes(citySearch.toLowerCase()))
                    .map((city) => (
                      <div
                        key={city._id}
                        onClick={() => {
                          setSelectedCity(city._id);
                          setSelectedCityName(city.name);
                          setCitySearch(city.name);
                          setShowCityDropdown(false);
                        }}
                        className="p-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                      >
                        {city.name}
                      </div>
                    ))}
                  {cities.filter(city => city.name.toLowerCase().includes(citySearch.toLowerCase())).length === 0 && (
                    <div className="p-3 text-gray-500 text-center">
                      No cities found
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Booking Form - Only show after city selection */}
          {selectedCity && (
            <>
              {loading ? (
                <div className="bg-white rounded-lg shadow-md p-6 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading booking details...</p>
                </div>
              ) : (
                <>
                  <CommonFields
                    fromLocation={fromLocation}
                    toLocation={toLocation}
                    fromLocationData={fromLocationData}
                    toLocationData={toLocationData}
                    selectedCityName={selectedCityName}
                    selectedDate={selectedDate}
                    selectedTime={selectedTime}
                    startTime={startTime}
                    endTime={endTime}
                    carType={carType}
                    transmissionType={transmissionType}
                    vehicleCategories={vehicleCategories}
                    transmissionOptions={transmissionOptions}
                    showToLocation={!subcategoryName.toLowerCase().includes('hourly') && !subSubcategoryName.toLowerCase().includes('roundtrip') && !subSubcategoryName.toLowerCase().includes('round-trip') && !subSubcategoryName.toLowerCase().includes('round trip')}
                    showTimeDuration={!subcategoryName.toLowerCase().includes('hourly')}
                    showVehicleFields={true}
                    showReceiverFields={false}
                    dateLabel="Date"
                    onFieldChange={(field, value) => {
                      switch (field) {
                        case 'fromLocation': setFromLocation(value); break;
                        case 'toLocation': setToLocation(value); break;
                        case 'selectedDate': setSelectedDate(value); break;
                        case 'selectedTime': setSelectedTime(value); break;
                        case 'startTime': setStartTime(value); break;
                        case 'endTime': setEndTime(value); break;
                        case 'carType': setCarType(value); break;
                        case 'transmissionType': setTransmissionType(value); break;
                      }
                    }}
                    onLocationChange={(field, locationData) => {
                      if (field === 'fromLocation') {
                        setFromLocationData(locationData);
                      } else if (field === 'toLocation') {
                        setToLocationData(locationData);
                      }
                    }}
                  />
                  <Button
                    onClick={handleNextPage}
                    disabled={!isFormValid()}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next Step
                  </Button>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Booking;