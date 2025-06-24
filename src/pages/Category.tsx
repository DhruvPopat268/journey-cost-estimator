import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { User, Car, Package, CircleHelp } from 'lucide-react';

const Category = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  const iconMap: Record<string, any> = {
    Driver: User,
    Cab: Car,
    Parcel: Package,
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/categories`);
        setCategories(res.data.data || []);
      } catch (err) {
        console.error('Failed to fetch categories', err);
      }
    };
    fetchCategories();
  }, [import.meta.env.VITE_API_URL]);

  const handleCategorySelect = (categoryId: string) => {
    navigate(`/subcategory/${categoryId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      {/* Header Section - Compact */}
      <div className="text-center py-6 px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Service</h1>
        <p className="text-base text-gray-600">Select the service that best fits your needs</p>
      </div>

      {/* Categories Grid - Optimized for viewport */}
      <div className="flex-1 px-4 pb-6 flex items-center">
        <div className="w-full max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
            {categories.map((category) => {
              const IconComponent = iconMap[category.name] || CircleHelp;
              return (
                <Card
                  key={category.id}
                  className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border-2 hover:border-blue-200 h-full"
                  onClick={() => handleCategorySelect(category.id)}
                >
                  <CardContent className="p-6 text-center h-full flex flex-col justify-between min-h-[280px]">
                    <div className="flex-1 flex flex-col justify-center">
                      <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
                        <IconComponent className="w-8 h-8 text-blue-600" />
                      </div>
                      <h2 className="text-xl font-bold text-gray-900 mb-2">{category.name}</h2>
                      <p className="text-gray-600 text-sm mb-2">Explore our {category.name} services</p>
                      <p className="text-xs text-gray-500 mb-4">
                        Book or manage your {category.name.toLowerCase()} rides easily
                      </p>
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-semibold transition-colors duration-200">
                      Book Now
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;