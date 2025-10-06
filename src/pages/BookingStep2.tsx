import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, CreditCard, X, Info, Wallet, Banknote } from 'lucide-react';
import { FormRenderer } from '../components/booking/FormRenderer';
import {
  setUsage,
  setTotalAmount,
  setSelectedCategory,
  setNotes,
  updateField,
  clearStep2Data
} from '../store/slices/bookingSlice';
import { ConfirmationDialog } from '../components/ui/confirmation-dialog'

const BookingStep2 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const bookingDataFromStore = useSelector(state => state.booking);
  const bookingData = bookingDataFromStore && Object.keys(bookingDataFromStore).length > 0
    ? bookingDataFromStore
    : location.state;
    console.log("booking data",bookingData)

  const [selectedUsage, setSelectedUsage] = useState(bookingData?.selectedUsage || '');
  const [customUsage, setCustomUsage] = useState(bookingData?.customUsage || '');

  const [notes, setNotesLocal] = useState(bookingData?.notes || '');
  const [includeInsurance, setIncludeInsurance] = useState(bookingData?.includeInsurance !== undefined ? bookingData.includeInsurance : true);
  const [loading, setLoading] = useState(true);
  const [showPriceBreakdown, setShowPriceBreakdown] = useState(false);
  const [instructions, setInstructions] = useState([]);
  const [totalAmount, setTotalAmountLocal] = useState(bookingData?.totalAmount || []);
  const [selectedCategory, setSelectedCategoryLocal] = useState(bookingData?.selectedCategory || null);
  const [showInstructions, setShowInstructions] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('cash');
  const [instructionsLoading, setInstructionsLoading] = useState(false);
  const [useReferral, setUseReferral] = useState(false);
  const [referralBalance, setReferralBalance] = useState(0);
  const [showBackConfirmation, setShowBackConfirmation] = useState(false);

  const [receiverName, setReceiverName] = useState(bookingData?.receiverName || '');
  const [receiverPhone, setReceiverPhone] = useState(bookingData?.receiverPhone || '');
  const [durationType, setDurationType] = useState(bookingData?.durationType || 'Day');
  const getInitialDurationValue = () => {

    // If we have a stored value and it's valid for weekly (>= 3), use it
    if (bookingData?.durationValue) {
      const storedValue = parseInt(bookingData.durationValue);
      const isWeekly = bookingData?.subcategoryName?.toLowerCase().includes('weekly');

      if (isWeekly && storedValue < 3) {
        return '3'; // Override invalid stored value
      }
      return bookingData.durationValue;
    }

    // Set defaults based on subcategory
    if (bookingData?.subcategoryName?.toLowerCase().includes('monthly')) return '20';
    if (bookingData?.subcategoryName?.toLowerCase().includes('weekly')) return '3';
    return '1';
  };

  const [durationValue, setDurationValue] = useState(getInitialDurationValue());

  const [walletBalance, setWalletBalance] = useState(0);
  const [walletLoading, setWalletLoading] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [durationOptions, setDurationOptions] = useState([]);
  const [durationError, setDurationError] = useState('');
  const [selectedDates, setSelectedDates] = useState(bookingData?.selectedDates || []);
  const [carCategories, setCarCategories] = useState([]);
  const [selectedCarCategory, setSelectedCarCategory] = useState(null);
  const [parcelCategories, setParcelCategories] = useState([]);
  const [selectedParcelCategory, setSelectedParcelCategory] = useState(null);

  // Add this state to store display dates
  const [displayDates, setDisplayDates] = useState([]);

  // Initialize displayDates when durationValue changes
  useEffect(() => {
    if (durationValue && (bookingData?.subcategoryName?.toLowerCase().includes('weekly') ||
      bookingData?.subcategoryName?.toLowerCase().includes('monthly'))) {
      const dates = [];
      const initialSelected = selectedDates.length > 0 ? selectedDates : [];

      // If we have selectedDates from Redux, use them to generate displayDates
      if (selectedDates.length > 0) {
        selectedDates.forEach((dateStr, index) => {
          const date = new Date(dateStr);
          const displayDate = date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
          });
          dates.push({
            dateStr,
            displayDate,
            index
          });
        });
      } else {
        // Generate default dates if no selectedDates
        const maxDays = parseInt(durationValue);

        for (let i = 0; i < maxDays; i++) {
          const date = new Date();
          date.setDate(date.getDate() + i + 1);
          const dateStr = date.toISOString().split('T')[0];
          const displayDate = date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
          });

          dates.push({
            dateStr,
            displayDate,
            index: i
          });

          initialSelected.push(dateStr);
        }
        setSelectedDates(initialSelected);
      }

      setDisplayDates(dates);
    }
  }, [durationValue, bookingData?.subcategoryName, selectedDates.length]);

  useEffect(() => {
    dispatch(updateField({ field: 'receiverName', value: receiverName }));
  }, [receiverName]);

  useEffect(() => {
    dispatch(updateField({ field: 'receiverPhone', value: receiverPhone }));
  }, [receiverPhone]);

  useEffect(() => {
    dispatch(updateField({ field: 'durationType', value: durationType }));
  }, [durationType]);

  useEffect(() => {
    dispatch(updateField({ field: 'durationValue', value: durationValue }));
  }, [durationValue]);

  // Ensure Redux store has correct default for weekly bookings
  useEffect(() => {
    const isWeekly = bookingData?.subcategoryName?.toLowerCase().includes('weekly');
    if (isWeekly && (!bookingData?.durationValue || parseInt(bookingData.durationValue) < 3)) {
      console.log('Updating Redux store with default weekly value: 3');
      setDurationValue('3');
    }
  }, [bookingData?.subcategoryName]);

  useEffect(() => {
    dispatch(updateField({ field: 'selectedDates', value: selectedDates }));
  }, [selectedDates, dispatch]);

  // Initialize selected dates for weekly/monthly on component load
  useEffect(() => {
    const isWeeklyOrMonthly = bookingData?.subcategoryName?.toLowerCase().includes('weekly') || bookingData?.subcategoryName?.toLowerCase().includes('monthly');
    if (isWeeklyOrMonthly && durationValue) {
      // If we have selectedDates from Redux, use them
      if (bookingData?.selectedDates && bookingData.selectedDates.length > 0) {
        setSelectedDates(bookingData.selectedDates);
      } else if (selectedDates.length === 0) {
        // Only generate new dates if we don't have any
        const numValue = parseInt(durationValue);
        const maxDays = numValue || 1;
        const allDates = Array.from({ length: maxDays }, (_, i) => {
          const date = new Date();
          date.setDate(date.getDate() + i + 1);
          return date.toISOString().split('T')[0];
        });
        setSelectedDates(allDates);
      }
    }
  }, [bookingData?.subcategoryName, bookingData?.selectedDates, durationValue]);

  const fetchInstructions = async (categoryName) => {
    if (!categoryName || instructionsLoading) return;

    setInstructionsLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/instructions/getInstructions`,
        {
          categoryId: bookingData.categoryId,
          subCategoryId: bookingData.subcategoryId,
          ...(bookingData.subSubcategoryId && { subSubCategoryId: bookingData.subSubcategoryId }),
          selectedCategoryName: categoryName
        }
      );
      setInstructions(res.data.instructions || []);
    } catch (error) {
      console.error('Failed to fetch instructions', error);
      setInstructions([]);
    } finally {
      setInstructionsLoading(false);
    }
  };

  const fetchCarCategories = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/car-categories`);
      const activeCategories = res.data.filter(category => category.status === true);
      setCarCategories(activeCategories);
    } catch (error) {
      console.error('Failed to fetch car categories:', error);
      setCarCategories([]);
    }
  };

  const fetchParcelCategories = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/parcel-categories`);
      setParcelCategories(res.data);
    } catch (error) {
      console.error('Failed to fetch parcel categories:', error);
      setParcelCategories([]);
    }
  };

  const callCalculationAPI = async (defaultUsage, currentDurationType = durationType, currentDurationValue = durationValue, carCategory = null, parcelCategory = null) => {
    // Prevent multiple simultaneous calls
    if (isCalculating || !defaultUsage || !bookingData || !bookingData.categoryId) return;

    const categoryName = bookingData?.categoryName?.toLowerCase();
    // Only call calculation API if categoryName is 'driver', 'cab', or 'parcel'
    if (categoryName !== 'driver' && categoryName !== 'cab' && categoryName !== 'parcel') return;

    setIsCalculating(true);

    // Ensure default values are used if current values are empty
    const finalDurationType = currentDurationType || 'Day';
    const isMonthly = bookingData?.subcategoryName?.toLowerCase().includes('monthly');
    const isWeekly = bookingData?.subcategoryName?.toLowerCase().includes('weekly');
    const finalDurationValue = currentDurationValue || (isMonthly ? '20' : isWeekly ? '3' : '1');

    // Determine API endpoint based on category
    let apiEndpoint;
    if (categoryName === 'driver') {
      apiEndpoint = '/api/DriverRideCosts/calculation';
    } else if (categoryName === 'cab') {
      apiEndpoint = '/api/CabRideCosts/calculation';
    } else if (categoryName === 'parcel') {
      apiEndpoint = '/api/ParcelRideCosts/calculation';
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}${apiEndpoint}`,
        {
          ...bookingData,
          selectedUsage: defaultUsage,
          includeInsurance: includeInsurance,
          durationType: finalDurationType,
          durationValue: finalDurationValue,
          ...(bookingData.subSubcategoryId && { subSubcategoryId: bookingData.subSubcategoryId }),
          ...(categoryName === 'cab' && (carCategory || selectedCarCategory) && { carCategoryId: (carCategory || selectedCarCategory)._id }),
          ...(categoryName === 'parcel' && (parcelCategory || selectedParcelCategory) && { parcelCategoryId: (parcelCategory || selectedParcelCategory)._id })
        }
      );

      const responseData = res.data.success ? res.data.result : res.data;
      setTotalAmountLocal(responseData);
      dispatch(setTotalAmount(responseData));
      setLoading(false);
    } catch (err) {
      console.error('API error:', err);
      setLoading(false);
    } finally {
      setIsCalculating(false);
    }
  };

  // Single useEffect to handle initial data loading and setup
  useEffect(() => {
    const initializeData = async () => {
      if (!bookingData) {
        setLoading(false);
        return;
      }

      const categoryName = bookingData?.categoryName?.toLowerCase();
      // Only call get-included-data API if categoryName is 'driver', 'cab', or 'parcel'
      if (categoryName !== 'driver' && categoryName !== 'cab' && categoryName !== 'parcel') {
        setLoading(false);
        return;
      }

      // Fetch car categories and set default for cab bookings
      let defaultCarCategory = null;
      if (categoryName === 'cab') {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/car-categories`);
        const activeCategories = res.data.filter(category => category.status === true);
        setCarCategories(activeCategories);

        // Find and set Classic as default
        const classicCategory = activeCategories.find(cat => cat.name.toLowerCase() === 'classic');
        if (classicCategory) {
          setSelectedCarCategory(classicCategory);
          defaultCarCategory = classicCategory;
        }
      }

      // Fetch parcel categories and set default for parcel bookings
      let defaultParcelCategory = null;
      if (categoryName === 'parcel') {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/parcel-categories`);
        setParcelCategories(res.data);

        // Find and set Classic as default
        const classicCategory = res.data.find(cat => cat.categoryName.toLowerCase() === 'classic');
        if (classicCategory) {
          setSelectedParcelCategory(classicCategory);
          defaultParcelCategory = classicCategory;
        }
      }

      // Determine API endpoint based on category
      let apiEndpoint;
      if (categoryName === 'driver') {
        apiEndpoint = '/api/DriverRideCosts/get-included-data';
      } else if (categoryName === 'cab') {
        apiEndpoint = '/api/CabRideCosts/get-included-data';
      } else if (categoryName === 'parcel') {
        apiEndpoint = '/api/ParcelRideCosts/get-included-data';
      }

      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}${apiEndpoint}`,
          {
            categoryId: bookingData.categoryId,
            subcategoryId: bookingData.subcategoryId,
            ...(bookingData.subSubcategoryId && { subSubcategoryId: bookingData.subSubcategoryId })
          }
        );

        if (res.data.success && res.data.data) {
          const isHourly = bookingData?.subcategoryName?.toLowerCase().includes('hourly') || bookingData?.subcategoryName?.toLowerCase().includes('weekly') || bookingData?.subcategoryName?.toLowerCase().includes('monthly') || bookingData?.subSubcategoryName?.toLowerCase().includes('roundtrip');
          const options = isHourly ? res.data.data.includedMinutes : res.data.data.includedKm;

          console.log("options (raw)", options);

          if (options && options.length > 0) {
            // ✅ Sort numerically & remove duplicates
            const sortedOptions = [...new Set(
              options.map(opt => parseInt(opt, 10))
            )]
              .sort((a, b) => a - b)
              .map(opt => opt.toString());

            console.log("options (sorted)", sortedOptions);
            console.log("for default usage", sortedOptions[0])

            setDurationOptions(sortedOptions);

            // Set default usage
            if (!selectedUsage && !customUsage) {
              const defaultUsage = isHourly
                ? (parseInt(sortedOptions[0]) / 60).toString()
                : sortedOptions[0].toString();

              setSelectedUsage(defaultUsage);
              dispatch(setUsage({ selectedUsage: defaultUsage, customUsage: '' }));

              // Wait for next tick to ensure state is updated
              setTimeout(() => {
                callCalculationAPI(defaultUsage, durationType, durationValue, defaultCarCategory, defaultParcelCategory);
              }, 0);
              return;
            }
          }
        }
      } catch (error) {
        console.error('Failed to fetch included data:', error);
      }

    };

    initializeData();
  }, [bookingData?.categoryId, bookingData?.subcategoryId]);
  // Only depend on IDs to avoid loops

  // Set default car category to Classic when car categories are loaded
  useEffect(() => {
    if (bookingData?.categoryName?.toLowerCase() === 'cab' && carCategories.length > 0 && !selectedCarCategory) {
      const classicCategory = carCategories.find(cat => cat.name.toLowerCase() === 'classic');
      if (classicCategory) {
        setSelectedCarCategory(classicCategory);
      }
    }
  }, [carCategories]);

  // Store selected car category in Redux
  useEffect(() => {
    if (selectedCarCategory) {
      dispatch(updateField({ field: 'selectedCarCategory', value: selectedCarCategory }));
    }
  }, [selectedCarCategory, dispatch]);

  // Store selected parcel category in Redux
  useEffect(() => {
    if (selectedParcelCategory) {
      dispatch(updateField({ field: 'selectedParcelCategory', value: selectedParcelCategory }));
    }
  }, [selectedParcelCategory, dispatch]);

  // Consolidated dispatch updates to avoid multiple re-renders
  useEffect(() => {
    dispatch(updateField({ field: 'selectedUsage', value: selectedUsage }));
  }, [selectedUsage, dispatch]);

  // Trigger calculation API when car category changes for cab bookings
  useEffect(() => {
    if (selectedCarCategory && bookingData?.categoryName?.toLowerCase() === 'cab' && (selectedUsage || customUsage) && !isCalculating) {
      callCalculationAPI(selectedUsage || customUsage);
    }
  }, [selectedCarCategory]);

  // Trigger calculation API when parcel category changes for parcel bookings
  useEffect(() => {
    if (selectedParcelCategory && bookingData?.categoryName?.toLowerCase() === 'parcel' && (selectedUsage || customUsage) && !isCalculating) {
      callCalculationAPI(selectedUsage || customUsage, durationType, durationValue, null, selectedParcelCategory);
    }
  }, [selectedParcelCategory]);

  // Reset selected price category when car category changes
  useEffect(() => {
    if (selectedCarCategory && bookingData?.categoryName?.toLowerCase() === 'cab' && totalAmount?.length > 0) {
      setSelectedCategoryLocal(null);
    }
  }, [selectedCarCategory?.name]);

  useEffect(() => {
    dispatch(updateField({ field: 'customUsage', value: customUsage }));
  }, [customUsage, dispatch]);

  useEffect(() => {
    dispatch(updateField({ field: 'notes', value: notes }));
  }, [notes, dispatch]);

  useEffect(() => {
    dispatch(updateField({ field: 'includeInsurance', value: includeInsurance }));
    // Only recalculate if we have usage data and booking data
    if ((selectedUsage || customUsage) && bookingData && !isCalculating) {
      callCalculationAPI(selectedUsage || customUsage);
    }
  }, [includeInsurance]);

  const handleDurationTypeChange = (type) => {
    setDurationType(type);
    // Recalculate immediately with new type and current value
    if (durationValue && bookingData && (selectedUsage || customUsage)) {
      callCalculationAPI(selectedUsage || customUsage, type, durationValue);
    }
  };

  const handleDurationValueChange = (value) => {
    const numValue = parseInt(value);
    const isMonthly = bookingData?.subcategoryName?.toLowerCase().includes('monthly');
    const isWeekly = bookingData?.subcategoryName?.toLowerCase().includes('weekly');
    const isWeeklyOrMonthly = isWeekly || isMonthly;

    // Validation for monthly Day type
    const monthlyError = isMonthly && durationType === 'Day' && value && (numValue < 20 || numValue > 26);
    // Validation for weekly bookings
    const weeklyError = isWeekly && value && (numValue < 3 || numValue > 14);

    if (monthlyError) {
      setDurationError('For monthly bookings with Day type, duration must be between 20-26 days');
    } else if (weeklyError) {
      if (numValue < 3) {
        setDurationError('Minimum 3 days booking allowed for weekly service');
      } else {
        setDurationError('In weekly you can only select max 14 days, for more use monthly');
      }
    } else {
      setDurationError('');
    }

    setDurationValue(value);

    // Auto-select all dates for weekly/monthly when duration value changes
    if (isWeeklyOrMonthly && value) {
      const maxDays = numValue || 1;
      const allDates = Array.from({ length: maxDays }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() + i + 1);
        return date.toISOString().split('T')[0];
      });
      setSelectedDates(allDates);
    }

    // Only recalculate if there's no validation error
    const hasError = monthlyError || weeklyError;
    if (value && bookingData && (selectedUsage || customUsage) && !hasError) {
      callCalculationAPI(selectedUsage || customUsage, durationType, value);
    }
  };

  const handleUsageChange = async (value) => {
    if (isCalculating) return; // Prevent changes during calculation

    setSelectedUsage(value);
    setCustomUsage('');
    dispatch(setUsage({ selectedUsage: value, customUsage: '' }));
    await callCalculationAPI(value);
  };

  // Debounced custom usage handling
  useEffect(() => {
    if (!customUsage) return;

    const delayDebounce = setTimeout(() => {
      if (customUsage && bookingData && !isCalculating) {
        dispatch(setUsage({ selectedUsage: '', customUsage: customUsage }));
        callCalculationAPI(customUsage);
      }
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [customUsage]);

  useEffect(() => {
    if (selectedCategory && selectedCategory.category) {
      const serializableCategory = JSON.parse(JSON.stringify(selectedCategory));
      dispatch(setSelectedCategory(serializableCategory));

      const categoryName = selectedCategory.category;
      if (categoryName && instructions.length === 0) {
        fetchInstructions(categoryName);
      }
    }
  }, [selectedCategory?.category]);

  useEffect(() => {
    if (totalAmount?.length > 0) {
      const isCab = bookingData?.categoryName?.toLowerCase() === 'cab';

      // For cab bookings, always select the first category when totalAmount changes
      if (isCab) {
        const firstCategory = totalAmount[0];
        if (firstCategory) {
          setSelectedCategoryLocal(firstCategory);
        }
        setLoading(false);
      } else if (!selectedCategory) {
        // For non-cab bookings, use the existing logic only if no category is selected
        const isParcel = bookingData?.categoryName?.toLowerCase().includes('parcel');

        let defaultCategoryName;
        if (isParcel) {
          defaultCategoryName = 'classic';
        } else {
          defaultCategoryName = 'prime';
        }

        let defaultCategory = totalAmount.find(item => item?.category?.toLowerCase() === defaultCategoryName.toLowerCase());

        // Fallback to first available category if default not found
        if (!defaultCategory && totalAmount.length > 0) {
          defaultCategory = totalAmount[0];
        }

        if (defaultCategory) {
          setSelectedCategoryLocal(defaultCategory);
        }
        setLoading(false);
      } else {
        const updated = totalAmount.find(item => item?.category === selectedCategory?.category);
        if (updated) {
          setSelectedCategoryLocal(updated);
        }
      }
    }
  }, [totalAmount, selectedCarCategory]);

  useEffect(() => {
    const token = localStorage.getItem("RiderToken");
    if (!token) return;

    const fetchRider = async () => {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/rider-auth/find-rider`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (res.data?.success && res.data.rider) {
          setReferralBalance(res.data.rider.referralEarning?.currentBalance || 0);
        }
      } catch (err) {
        console.error("Error fetching rider:", err);
        if (err.response?.status === 401) {
          localStorage.removeItem("RiderToken");
        }
      }
    };

    fetchRider();
  }, []);

  useEffect(() => {
    const fetchWalletBalance = async () => {
      const token = localStorage.getItem("RiderToken");
      if (!token || selectedPaymentMethod !== 'wallet') return;

      setWalletLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/payments/wallet`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        setWalletBalance(res.data.balance || 0);
      } catch (error) {
        console.error("Failed to fetch wallet balance:", error);
        setWalletBalance(0);
      } finally {
        setWalletLoading(false);
      }
    };

    fetchWalletBalance();
  }, [selectedPaymentMethod]);

  const finalPayable = React.useMemo(() => {
    if (!selectedCategory) return 0;
    const baseTotal = selectedCategory.totalPayable || 0;
    if (useReferral && referralBalance > 0) {
      return Math.max(0, baseTotal - Math.min(referralBalance, baseTotal));
    }
    return baseTotal;
  }, [selectedCategory, useReferral, referralBalance]);

  const handleBackClick = () => {
    setShowBackConfirmation(true);
  };

  const handleConfirmBack = () => {
    dispatch(clearStep2Data());
    const backUrl = bookingData.subSubcategoryId
      ? `/booking/${bookingData.categoryId}/${bookingData.subcategoryId}/${bookingData.subSubcategoryId}`
      : `/booking/${bookingData.categoryId}/${bookingData.subcategoryId}`;
    navigate(backUrl, {
      state: {
        fromLocation: bookingData.fromLocation,
        toLocation: bookingData.toLocation,
        carType: bookingData.carType,
        transmissionType: bookingData.transmissionType,
        selectedDate: bookingData.selectedDate,
        selectedTime: bookingData.selectedTime,
      }
    });
  };

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

  const handleCategorySelect = (item) => {
    setSelectedCategoryLocal(item);
  };

  const handleInfoClick = (e, item) => {
    e.stopPropagation();
    setSelectedCategoryLocal(item);
    setShowPriceBreakdown(true);
  };

  const handleConfirmBooking = async () => {
    if (!selectedCategory || !selectedCategory.category) {
      alert("Please select a driver category to proceed.");
      return;
    }

    try {
      const token = localStorage.getItem("RiderToken");
      if (!token) {
        const bookingDetails = {
          ...bookingData,
          selectedUsage: selectedUsage || customUsage,
          selectedCategory: selectedCategory.category,
          insuranceCharges: selectedCategory.insuranceCharges,
          subtotal: selectedCategory.subtotal,
          gstCharges: selectedCategory.gstCharges,
          totalPayable: finalPayable,
          notes: notes,
          includeInsurance: includeInsurance,
          receiverName: receiverName,
          receiverPhone: receiverPhone,
          selectedDates: selectedDates
        };
        navigate("/login", { state: bookingDetails });
        return;
      }

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/rider-auth/auth/check`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!res.data.loggedIn) {
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
          receiverName: receiverName,
          receiverPhone: receiverPhone,
          selectedDates: selectedDates
        };
        navigate("/login", { state: bookingDetails });
        return;
      }

      setShowTermsModal(true);
    } catch (error) {
      console.error("Auth check failed:", error);
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
        selectedDates: selectedDates
      };
      navigate("/login", { state: bookingDetails });
    }
  };

  const handleTermsAccept = () => {
    setTermsAccepted(true);
    setShowTermsModal(false);
  };

  const handleFinalBooking = async () => {
    const bookingDetails = {
      ...bookingData,
      selectedUsage: selectedUsage || customUsage,
      selectedCategory: selectedCategory.category,
      insuranceCharges: selectedCategory.insuranceCharges,
      subtotal: selectedCategory.subtotal,
      gstCharges: selectedCategory.gstCharges,
      totalPayable: finalPayable,
      notes: notes,
      includeInsurance: includeInsurance,
      paymentMethod: selectedPaymentMethod,
      receiverName: receiverName,
      receiverPhone: receiverPhone,
      selectedDates: selectedDates
    };

    dispatch(setUsage({ selectedUsage: selectedUsage || '', customUsage: customUsage || '' }));
    const serializableCategory = JSON.parse(JSON.stringify(selectedCategory));
    dispatch(setSelectedCategory(serializableCategory));
    dispatch(setNotes(notes));
    dispatch(updateField({ field: 'selectedDates', value: selectedDates }));
    dispatch(setTotalAmount(totalAmount));

    if (selectedPaymentMethod === 'cash') {
      await bookRideDirectly(bookingDetails);
    } else if (selectedPaymentMethod === 'wallet') {
      await handleWalletPayment(bookingDetails);
    }
  };

  const handleWalletPayment = async (bookingDetails) => {
    try {
      const token = localStorage.getItem("RiderToken");

      // First deduct money from wallet
      const deductRes = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/payments/deduct`,
        {
          amount: finalPayable,
          description: `Ride payment for ${bookingData.subcategoryName}`
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (deductRes.data.success) {
        // If wallet deduction successful, book the ride
        await bookRideDirectly({
          ...bookingDetails,
          walletTransactionId: deductRes.data.transactionId
        });
      } else {
        alert("Wallet payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Wallet payment error:", error);
      if (error.response?.data?.error === 'Insufficient balance') {
        alert("Insufficient wallet balance. Please add money to your wallet.");
      } else {
        alert("Wallet payment failed. Please try again.");
      }
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
          paymentType: selectedPaymentMethod,
          referralEarning: useReferral ? true : false,
          referralBalance: useReferral ? referralBalance : 0,
          senderDetails: {
            name: bookingData.senderName || '',
            phone: bookingData.senderMobile || ''
          },
          receiverDetails: {
            name: receiverName || bookingData.receiverName || '',
            phone: receiverPhone || bookingData.receiverMobile || ''
          }
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
    const categoryLower = category.toLowerCase();
    const isParcel = bookingData?.categoryName?.toLowerCase() === 'parcel';
    
    if (isParcel) {
      // For parcel bookings, show bike for "bike" category, car for others
      return categoryLower === 'bike' ? '🏍️' : '🚗';
    }
    
    // For non-parcel bookings, use existing logic
    switch (categoryLower) {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-4 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center mb-3">
          <Button
            variant="ghost"
            onClick={handleBackClick}
            className="mr-4 p-2 hover:bg-white/50 rounded-full"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">
            {bookingData.subcategoryName}{bookingData.subSubcategoryName ? ` - ${bookingData.subSubcategoryName}` : ''} Booking - Step 2
          </h1>
        </div>

        <div className="space-y-6">
          <FormRenderer
            subcategoryName={bookingData.subcategoryName}
            subSubcategoryName={bookingData.subSubcategoryName}
            categoryName={bookingData.categoryName}
            selectedUsage={selectedUsage}
            customUsage={customUsage}
            durationType={durationType}
            durationValue={durationValue}
            durationOptions={durationOptions}
            durationError={durationError}
            onUsageChange={handleUsageChange}
            onCustomUsageChange={(value) => {
              setCustomUsage(value);
              setSelectedUsage('');
            }}
            onDurationTypeChange={handleDurationTypeChange}
            onDurationValueChange={handleDurationValueChange}
          />

          {/* Date Selection for Weekly/Monthly */}
          {(bookingData?.subcategoryName?.toLowerCase().includes('weekly') || bookingData?.subcategoryName?.toLowerCase().includes('monthly')) && (
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Select Dates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-2">
                  {displayDates.map((dateObj) => {
                    const isSelected = selectedDates.includes(dateObj.dateStr);

                    return (
                      <div
                        key={dateObj.dateStr}
                        onClick={() => {
                          if (isSelected) {
                            // Remove the date
                            const newSelected = selectedDates.filter(d => d !== dateObj.dateStr);

                            // Find the max index in displayDates
                            const maxIndex = Math.max(...displayDates.map(d => d.index));

                            // Generate next date
                            const nextDate = new Date();
                            nextDate.setDate(nextDate.getDate() + maxIndex + 2);
                            const nextDateStr = nextDate.toISOString().split('T')[0];
                            const nextDisplayDate = nextDate.toLocaleDateString('en-US', {
                              weekday: 'short',
                              month: 'short',
                              day: 'numeric'
                            });

                            // Add new date to display
                            const dateExists = displayDates.some(d => d.dateStr === nextDateStr);
                            if (!dateExists) {
                              setDisplayDates([...displayDates, {
                                dateStr: nextDateStr,
                                displayDate: nextDisplayDate,
                                index: maxIndex + 1
                              }]);
                            }

                            // Add the new date to selected dates
                            setSelectedDates([...newSelected, nextDateStr]);
                          } else {
                            // Select the date
                            setSelectedDates([...selectedDates, dateObj.dateStr]);
                          }
                        }}
                        className={`
                relative p-2 rounded-lg border-2 cursor-pointer transition-all text-center
                ${isSelected
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-300 bg-white hover:border-blue-300'
                          }
              `}
                      >
                        {/* Checkbox indicator */}
                        <div className="absolute top-1 left-1">
                          <div className={`
                  w-4 h-4 rounded border-2 flex items-center justify-center
                  ${isSelected
                              ? 'bg-blue-500 border-blue-500'
                              : 'bg-white border-gray-400'
                            }
                `}>
                            {isSelected && (
                              <svg className="w-2 h-2 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M5 13l4 4L19 7"></path>
                              </svg>
                            )}
                          </div>
                        </div>

                        {/* Date text */}
                        <div className="mt-1">
                          <div className="text-xs text-gray-600 font-medium">
                            {dateObj.displayDate.split(',')[0]}
                          </div>
                          <div className="text-xs font-semibold text-gray-800">
                            {dateObj.displayDate.split(',')[1]}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Car Categories for Cab */}
          {bookingData?.categoryName?.toLowerCase() === 'cab' && carCategories.length > 0 && (
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Select Car Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {carCategories
                    // ✅ Put Classic first, then keep the rest as they are
                    .sort((a, b) => {
                      if (a.name.toLowerCase() === "classic") return -1;
                      if (b.name.toLowerCase() === "classic") return 1;
                      return a.name.localeCompare(b.name);
                    })
                    .map((category) => (
                      <button
                        key={category._id}
                        type="button"
                        onClick={() => setSelectedCarCategory(category)}
                        className={`p-4 rounded-lg transition-all duration-200 text-left
                ${selectedCarCategory?._id === category._id
                            ? "border-2 border-blue-700 bg-blue-50 shadow-md"
                            : "border border-gray-200 bg-white hover:shadow-md hover:border-blue-300"}
              `}
                      >
                        <h3 className="font-semibold text-gray-800">{category.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">{category.description}</p>
                      </button>
                    ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Parcel Categories for Parcel */}
          {bookingData?.categoryName?.toLowerCase() === 'parcel' && parcelCategories.length > 0 && (
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Select Parcel Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {parcelCategories
                    .sort((a, b) => {
                      if (a.categoryName.toLowerCase() === "classic") return -1;
                      if (b.categoryName.toLowerCase() === "classic") return 1;
                      return a.categoryName.localeCompare(b.categoryName);
                    })
                    .map((category) => (
                      <button
                        key={category._id}
                        type="button"
                        onClick={() => setSelectedParcelCategory(category)}
                        className={`p-4 rounded-lg transition-all duration-200 text-left
                ${selectedParcelCategory?._id === category._id
                            ? "border-2 border-blue-700 bg-blue-50 shadow-md"
                            : "border border-gray-200 bg-white hover:shadow-md hover:border-blue-300"}
              `}
                      >
                        <h3 className="font-semibold text-gray-800">{category.categoryName}</h3>
                        <p className="text-sm text-gray-500 mt-1">{category.description}</p>
                      </button>
                    ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Price Categories */}
          {isCalculating && (bookingData?.categoryName?.toLowerCase() === 'cab' || bookingData?.categoryName?.toLowerCase() === 'parcel') ? (
            <Card className="bg-white shadow-lg">
              <CardContent className="p-8">
                <div className="flex flex-col items-center justify-center space-y-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <p className="text-gray-600 text-center">
                    {bookingData?.categoryName?.toLowerCase() === 'cab' 
                      ? 'Calculating prices for selected car category...' 
                      : 'Calculating prices for selected parcel category...'}
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            totalAmount.map((item, index) => (
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
                    <p className="text-lg font-bold text-gray-800">₹{(item.totalPayable || 0).toFixed(2)}</p>
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
            ))
          )}

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



          {/* Payment Method Selection */}
          {termsAccepted && (
            <div className="p-4">
              <h3 className="font-semibold text-gray-800 mb-3">Choose Payment Method</h3>
              <div className="space-y-3">
                <label className="flex items-center space-x-3 cursor-pointer p-3 border rounded-lg ">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    checked={selectedPaymentMethod === 'cash'}
                    onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                    className="text-blue-600"
                  />
                  <Banknote className="w-5 h-5 text-green-600" />
                  <span className="font-medium">Cash on Delivery</span>
                </label>

                <label className="flex items-center space-x-3 cursor-pointer p-3 border rounded-lg ">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="wallet"
                    checked={selectedPaymentMethod === 'wallet'}
                    onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                    className="text-blue-600"
                  />
                  <Wallet className="w-5 h-5 text-blue-600" />
                  <div className="flex-1">
                    <span className="font-medium">Wallet Payment</span>
                    {selectedPaymentMethod === 'wallet' && (
                      <div className="mt-2 text-sm">
                        {walletLoading ? (
                          <div className="flex items-center space-x-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                            <span className="text-gray-500">Loading balance...</span>
                          </div>
                        ) : (
                          <div className="space-y-1">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Current Balance:</span>
                              <span className="font-medium text-green-600">₹{(walletBalance || 0).toFixed(2)}</span>
                            </div>
                            {walletBalance < finalPayable ? (
                              <div className="text-red-600">
                                <div className="flex justify-between">
                                  <span>Required:</span>
                                  <span>₹{(finalPayable || 0).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Need to add:</span>
                                  <span className="font-medium">₹{((finalPayable || 0) - (walletBalance || 0)).toFixed(2)}</span>
                                </div>
                                <Button
                                  onClick={() => navigate("/wallet")}
                                  variant="outline"
                                  size="sm"
                                  className="mt-2 w-full text-blue-600 border-blue-600 hover:bg-blue-50"
                                >
                                  Add Balance
                                </Button>
                              </div>
                            ) : (
                              <div className="text-green-600">
                                <div className="flex justify-between">
                                  <span>After payment:</span>
                                  <span className="font-medium">₹{((walletBalance || 0) - (finalPayable || 0)).toFixed(2)}</span>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </label>
              </div>
            </div>
          )}

          {/* Total and Price Breakdown Section */}
          {selectedCategory?.category && (
            <Button
              onClick={termsAccepted ? handleFinalBooking : handleConfirmBooking}
              disabled={(selectedPaymentMethod === 'wallet' && walletBalance < finalPayable) || durationError}
              className={`w-full py-3 text-lg font-semibold rounded-lg ${(selectedPaymentMethod === 'wallet' && walletBalance < finalPayable) || durationError
                ? 'bg-gray-400 hover:bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
                } text-white`}
            >
              {termsAccepted ?
                (selectedPaymentMethod === 'wallet' && walletBalance < finalPayable ?
                  'Insufficient Wallet Balance' :
                  durationError ?
                    'Fix Duration Error' :
                    `Confirm Booking ₹${(finalPayable || 0).toFixed(2)}`
                ) :
                durationError ?
                  'Fix No Of Days Error' :
                  `Book Ride ₹${(finalPayable || 0).toFixed(2)}`
              }
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


              {/* Referral Earning Section */}
              {referralBalance > 0 && (
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-gray-800">
                      Use Referral Balance (₹{referralBalance})
                    </h4>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={useReferral}
                        onChange={(e) => setUseReferral(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-green-300 peer-checked:bg-green-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                    </label>
                  </div>
                </div>
              )}

              {/* Fare Details */}
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-gray-900">Fare Details</h4>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Driver Category:</span>
                    <span className="font-medium">{selectedCategory.category}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className=" font-medium">Package:</span>
                    <span className="font-medium">{selectedUsage} {bookingData?.subcategoryName?.toLowerCase().includes('hourly') || bookingData?.subcategoryName?.toLowerCase().includes('weekly') || bookingData?.subcategoryName?.toLowerCase().includes('monthly') || bookingData?.subSubcategoryName?.toLowerCase().includes('roundtrip') ? 'Hours' : 'Km'}</span>
                  </div>
                </div>

                <Separator className="my-3" />

                {/* Insurance Section - Above Trip Summary */}
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Insurance Coverage</span>
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


                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Base Fare:</span>
                    <span className="font-medium">₹{selectedCategory.subtotal || 0}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="font-medium">Discount:</span>
                    <span className="font-medium">-{selectedCategory.discountApplied || 0}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="font-medium">Taxes & Fees:</span>
                    <span className="font-medium">₹{selectedCategory.gstCharges || 0}</span>
                  </div>

                  {selectedCategory.insuranceCharges > 0 && (
                    <div className="flex justify-between">
                      <span className="font-medium">Secure Fee:</span>
                      <span className="font-medium">₹{selectedCategory.insuranceCharges || 0}</span>
                    </div>
                  )}

                  {/* <div className="flex justify-between">
                    <span className="font-medium">Cancellation Fee:</span>
                    <span className="font-medium">₹{selectedCategory.cancellationCharges || 0}</span>
                  </div> */}

                  {useReferral && referralBalance > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span className="font-medium">Referral Discount:</span>
                      <span className="font-medium">-₹{Math.min(referralBalance || 0, selectedCategory.totalPayable || 0)}</span>
                    </div>
                  )}
                </div>

                <Separator className="my-3" />

                <div className="flex justify-between text-lg font-bold">
                  <span>Estimated Total:</span>
                  <span className="text-green-600">
                    ₹{Math.max(
                      0,
                      (selectedCategory.totalPayable || 0) -
                      (useReferral ? Math.min(referralBalance || 0, selectedCategory.totalPayable || 0) : 0)
                    )}
                  </span>
                </div>
              </div>

              {/* Instructions Section without Horizontal Scroll */}
              {instructions && instructions.length > 0 ? (
                <div className="pt-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Important Instructions</h4>
                  <ul className="space-y-2 list-decimal list-inside">
                    {instructions.map((instruction, index) => (
                      <li
                        key={index}
                        className="  text-sm text-gray-700 leading-relaxed"
                      >
                        {instruction}
                      </li>
                    ))}
                  </ul>
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
                  disabled={durationError}
                  className={`flex-1 ${durationError
                    ? 'bg-gray-400 hover:bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                    } text-white`}
                >
                  {durationError ? 'Fix Duration Error' : 'Confirm & Pay'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Back Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={showBackConfirmation}
        onClose={() => setShowBackConfirmation(false)}
        onConfirm={handleConfirmBack}
        title="Discard Changes?"
        description="Going back will clear all your selections on this page. Are you sure you want to continue?"
        confirmText="Yes, Go Back"
        cancelText="Stay Here"
      />
    </div>
  );
};

export default BookingStep2;