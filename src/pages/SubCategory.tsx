import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  ArrowLeft, Clock, MapPin, Calendar, RotateCcw, Repeat, Car
} from 'lucide-react';

const SubCategory = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams();
 
  const [apiSubcategories, setApiSubcategories] = useState<any[]>([]);

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/subcategories`);
        console.log(res)
        const filtered = res.data.filter((sub: any) => sub.categoryId === categoryId);
        setApiSubcategories(filtered);
      } catch (err) {
        console.error('Error fetching subcategories:', err);
      }
    };

    if (categoryId) fetchSubcategories();
  }, [import.meta.env.VITE_API_URL, categoryId]);

  const handleSubcategorySelect = (subcategoryId: string) => {
    navigate(`/booking/${categoryId}/${subcategoryId}`);
  };

  const getCategoryTitle = () => {
    switch (categoryId) {
      case 'driver':
        return 'Driver Services';
      case 'cab':
        return 'Cab Services';
      case 'parcel':
        return 'Parcel Services';
      default:
        return 'Services';
    }
  };

  // Function to get icon based on subcategory name or use default
  const getIconForSubcategory = (name: string) => {
    const normalizedName = name.toLowerCase().trim();
    
    // Check for common service types and assign appropriate icons
    if (normalizedName.includes('one-way') || normalizedName.includes('oneway')) return MapPin;
    if (normalizedName.includes('hourly') || normalizedName.includes('hour')) return Clock;
    if (normalizedName.includes('outstation') || normalizedName.includes('intercity')) return RotateCcw;
    if (normalizedName.includes('monthly') || normalizedName.includes('month')) return Calendar;
    if (normalizedName.includes('weekly') || normalizedName.includes('week')) return Repeat;
    
    // Add more icon mappings as needed
    if (normalizedName.includes('round') || normalizedName.includes('return')) return RotateCcw;
    if (normalizedName.includes('daily') || normalizedName.includes('day')) return Calendar;
    if (normalizedName.includes('airport')) return MapPin;
    if (normalizedName.includes('local')) return Car;
    
    // Default icon for any other subcategory
    return Car;
  };

  // Function to generate subtitle based on subcategory name
  const getSubtitleForSubcategory = (name: string) => {
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
    
    // Default subtitle
    return 'Service Booking';
  };

  // Function to generate description based on subcategory name
  const getDescriptionForSubcategory = (name: string) => {
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
    
    // Default description
    return `Book ${name.toLowerCase()} service for your transportation needs`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mr-4 p-2 hover:bg-white/50 rounded-full"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {getCategoryTitle()}
            </h1>
            <p className="text-gray-600">Choose your booking type</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apiSubcategories.map((apiSub) => {
            // Dynamically generate data for each subcategory
            const IconComponent = getIconForSubcategory(apiSub.name);const subtitle = getSubtitleForSubcategory(apiSub.name);
            const description = getDescriptionForSubcategory(apiSub.name);

            return (
              <Card
                key={apiSub.id}
                className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border-2 hover:border-blue-200"
                onClick={() => handleSubcategorySelect(apiSub.id)}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <IconComponent className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {apiSub.name}
                  </h3>
                  <p className="text-blue-600 font-medium mb-3">
                    {subtitle}
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    {description}
                  </p>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold">
                    Book Now
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {apiSubcategories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No subcategories available for this service.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubCategory;