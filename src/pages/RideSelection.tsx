import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  ArrowLeft, Clock, MapPin, Calendar, RotateCcw, Repeat, Car,
  User, Package, CircleHelp, ChevronDown
} from 'lucide-react';
import { Navbar } from '../components/Sidebar';


const RideSelection = () => {
  const navigate = useNavigate();

  // State management
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [filteredSubcategories, setFilteredSubcategories] = useState([]);

  // Loading and error states
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [subcategoriesLoading, setSubcategoriesLoading] = useState(false);
  const [error, setError] = useState(null);

  // Icon mappings
  const categoryIconMap = {
    Driver: User,
    Cab: Car,
    Parcel: Package,
  };

  //fetch rider using mobile from local storage
  // useEffect(() => {
  //   const fetchRider = async () => {
  //     try {
  //       // 1️⃣ Get RiderToken from localStorage
  //       const token = localStorage.getItem("RiderToken");

  //       if (!token) {
  //         console.warn("No RiderToken found in localStorage");
  //         navigate("/login"); // redirect if no token
  //         return;
  //       }

  //       // 2️⃣ Make POST API call with Bearer token
  //       const res = await fetch(`${import.meta.env.VITE_API_URL}/api/rider-auth/find-rider`, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           "Authorization": `Bearer ${token}`,
  //         },
  //       });

  //       // 3️⃣ Handle unauthorized response
  //       if (res.status === 401) {
  //         console.warn("Unauthorized, redirecting to login...");
  //         localStorage.clear(); // optional: clear storage
  //         navigate("/login");
  //         return;
  //       }

  //       const data = await res.json();

  //       // 4️⃣ Check response and store rider info
  //       if (data.success && data.rider) {
  //         const { name, gender, email } = data.rider;
  //         localStorage.setItem("rider", JSON.stringify({ name, gender, email }));
  //         console.log("Rider stored:", { name, gender, email });
  //       } else {
  //         console.warn("Rider not found:", data.message);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching rider:", error);
  //     }
  //   };

  //   fetchRider();
  // }, [navigate]);

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      setCategoriesLoading(true);
      setError(null);

      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/categories`);
        if (res.status === 200) {
          setCategories(res.data.data || []);
        } else {
          setError('Failed to load categories');
        }
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Something went wrong while loading categories');
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Fetch subcategories when component mounts
  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/subcategories`);
        setSubcategories(res.data || []);
      } catch (err) {
        console.error('Error fetching subcategories:', err);
      }
    };

    fetchSubcategories();
  }, []);

  // Filter subcategories when category changes
  useEffect(() => {
    if (selectedCategory && subcategories.length > 0) {
      const filtered = subcategories.filter(sub => sub.categoryId === selectedCategory);
      setFilteredSubcategories(filtered);
      setSelectedSubcategory(''); // Reset subcategory selection
    } else {
      setFilteredSubcategories([]);
      setSelectedSubcategory('');
    }
  }, [selectedCategory, subcategories]);

  // Handle category selection
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setSubcategoriesLoading(true);
    // Add a small delay to show loading state
    setTimeout(() => setSubcategoriesLoading(false), 300);
  };

  // Handle subcategory selection
  const handleSubcategoryChange = (subcategoryId) => {
    setSelectedSubcategory(subcategoryId);
  };

  // Handle booking
  const handleBookNow = () => {
    if (selectedCategory && selectedSubcategory) {
      navigate(`/booking/${selectedCategory}/${selectedSubcategory}`);
    }
  };

  // Get category title
  const getCategoryTitle = (categoryId) => {
    const category = categories.find(cat => cat._id === categoryId);
    return category ? category.name : 'Services';
  };

  // Function to get icon based on subcategory name
  const getIconForSubcategory = (name) => {
    const normalizedName = name.toLowerCase().trim();

    if (normalizedName.includes('one-way') || normalizedName.includes('oneway')) return MapPin;
    if (normalizedName.includes('hourly') || normalizedName.includes('hour')) return Clock;
    if (normalizedName.includes('outstation') || normalizedName.includes('intercity')) return RotateCcw;
    if (normalizedName.includes('monthly') || normalizedName.includes('month')) return Calendar;
    if (normalizedName.includes('weekly') || normalizedName.includes('week')) return Repeat;
    if (normalizedName.includes('round') || normalizedName.includes('return')) return RotateCcw;
    if (normalizedName.includes('daily') || normalizedName.includes('day')) return Calendar;
    if (normalizedName.includes('airport')) return MapPin;
    if (normalizedName.includes('local')) return Car;

    return Car; // Default icon
  };

  // Function to generate subtitle based on subcategory name
  const getSubtitleForSubcategory = (name) => {
    const normalizedName = name.toLowerCase().trim();

    if (normalizedName.includes('one-way') || normalizedName.includes('oneway')) return 'Point to Point';
    if (normalizedName.includes('hourly') || normalizedName.includes('hour')) return 'Book by Hours';
    if (normalizedName.includes('outstation') || normalizedName.includes('intercity')) return 'City to City';
    if (normalizedName.includes('monthly') || normalizedName.includes('month')) return 'Long Term';
    if (normalizedName.includes('weekly') || normalizedName.includes('week')) return 'Weekly Plans';
    if (normalizedName.includes('round') || normalizedName.includes('return')) return 'Round Trip';
    if (normalizedName.includes('daily') || normalizedName.includes('day')) return 'Daily Service';
    if (normalizedName.includes('airport')) return 'Airport Transfer';
    if (normalizedName.includes('local')) return 'Local Service';

    return 'Service Booking';
  };

  // Function to generate description based on subcategory name
  const getDescriptionForSubcategory = (name) => {
    const normalizedName = name.toLowerCase().trim();

    if (normalizedName.includes('one-way') || normalizedName.includes('oneway')) return 'Single journey from pickup to destination';
    if (normalizedName.includes('hourly') || normalizedName.includes('hour')) return 'Flexible hourly booking for multiple stops';
    if (normalizedName.includes('outstation') || normalizedName.includes('intercity')) return 'Long distance travel between cities';
    if (normalizedName.includes('monthly') || normalizedName.includes('month')) return 'Monthly subscription for regular travel';
    if (normalizedName.includes('weekly') || normalizedName.includes('week')) return 'Weekly packages for frequent travelers';
    if (normalizedName.includes('round') || normalizedName.includes('return')) return 'Round trip service with return journey';
    if (normalizedName.includes('daily') || normalizedName.includes('day')) return 'Daily service for regular commute';
    if (normalizedName.includes('airport')) return 'Reliable airport pickup and drop service';
    if (normalizedName.includes('local')) return 'Local area transportation service';

    return `Book ${name.toLowerCase()} service for your transportation needs`;
  };

  if (categoriesLoading) {
    return (
      <div className="flex justify-center items-center min-h-[150px]">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-red-600 text-center">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pb-8 px-4">
      <Navbar title="Book Your Service" />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        {/* Header */}
        <div className="flex items-center justify-center mb-8">
          <h2 className="text-gray-600 text-center font-medium mt-4">Select category and service type</h2>
        </div>

        {/* Dropdown Selection Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Category
              </label>
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Choose a category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Subcategory Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Service Type
              </label>
              <div className="relative">
                <select
                  value={selectedSubcategory}
                  onChange={(e) => handleSubcategoryChange(e.target.value)}
                  disabled={!selectedCategory || subcategoriesLoading}
                  className="w-full p-3 border border-gray-300 rounded-lg bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="">
                    {!selectedCategory ? 'Select category first' : 'Choose service type'}
                  </option>
                  {filteredSubcategories.map((subcategory) => (
                    <option key={subcategory.id} value={subcategory.id}>
                      {subcategory.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
              {subcategoriesLoading && (
                <div className="flex items-center mt-2 text-sm text-gray-500">
                  <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin mr-2" />
                  Loading service types...
                </div>
              )}
            </div>
          </div>

          {/* Book Now Button */}
          <div className="mt-6 text-center">
            <Button
              onClick={handleBookNow}
              disabled={!selectedCategory || !selectedSubcategory}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors duration-200"
            >
              Book Now
            </Button>
          </div>
        </div>

        {/* Selected Service Preview */}
        {selectedSubcategory && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Selected Service</h2>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
              {filteredSubcategories
                .filter(sub => sub.id === selectedSubcategory)
                .map((subcategory) => {
                  const IconComponent = getIconForSubcategory(subcategory.name);
                  const subtitle = getSubtitleForSubcategory(subcategory.name);
                  const description = getDescriptionForSubcategory(subcategory.name);

                  return (
                    <Card
                      key={subcategory.id}
                      className="bg-white shadow-lg border-2 border-blue-200"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="w-16 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <IconComponent className="w-8 h-8 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-900 mb-1">
                              {subcategory.name}
                            </h3>
                            <p className="text-blue-600 font-medium mb-2">
                              {subtitle}
                            </p>
                            <p className="text-sm text-gray-500">
                              {description}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-500 mb-1">Category:</p>
                            <p className="font-medium text-gray-900">
                              {getCategoryTitle(selectedCategory)}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RideSelection;