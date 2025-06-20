
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Clock, MapPin, Calendar, RotateCcw, Repeat } from 'lucide-react';

const SubCategory = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams();

  const subcategories = [
    {
      id: 'one-way',
      title: 'One-Way',
      subtitle: 'Point to Point',
      icon: MapPin,
      description: 'Single journey from pickup to destination'
    },
    {
      id: 'hourly',
      title: 'Hourly',
      subtitle: 'Book by Hours',
      icon: Clock,
      description: 'Flexible hourly booking for multiple stops'
    },
    {
      id: 'outstation',
      title: 'Outstation',
      subtitle: 'City to City',
      icon: RotateCcw,
      description: 'Long distance travel between cities'
    },
    {
      id: 'monthly',
      title: 'Monthly',
      subtitle: 'Long Term',
      icon: Calendar,
      description: 'Monthly subscription for regular travel'
    },
    {
      id: 'weekly',
      title: 'Weekly',
      subtitle: 'Weekly Plans',
      icon: Repeat,
      description: 'Weekly packages for frequent travelers'
    }
  ];

  const handleSubcategorySelect = (subcategoryId: string) => {
    if (subcategoryId === 'one-way' || subcategoryId === 'hourly') {
      navigate(`/booking/${categoryId}/${subcategoryId}`);
    } else {
      // For other subcategories, you can add specific handling later
      navigate(`/booking/${categoryId}/${subcategoryId}`);
    }
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
          {subcategories.map((subcategory) => {
            const IconComponent = subcategory.icon;
            return (
              <Card 
                key={subcategory.id}
                className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border-2 hover:border-blue-200"
                onClick={() => handleSubcategorySelect(subcategory.id)}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <IconComponent className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {subcategory.title}
                  </h3>
                  <p className="text-blue-600 font-medium mb-3">
                    {subcategory.subtitle}
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    {subcategory.description}
                  </p>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold">
                    Book Now
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SubCategory;
