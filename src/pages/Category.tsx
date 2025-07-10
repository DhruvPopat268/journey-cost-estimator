import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { User, Car, Package, CircleHelp } from 'lucide-react'; // CircleHelp = default icon

const Category = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true); // loader state
  const [error, setError] = useState(null);


  const iconMap: Record<string, any> = {
    Driver: User,
    Cab: Car,
    Parcel: Package,
  };

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/categories`);
        if (res.status === 200) {
          setCategories(res.data.data || []);
        } else {
          setError('Failed to load categories');
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Something went wrong');
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []); //

  const handleCategorySelect = (categoryId: string) => {
    navigate(`/subcategory/${categoryId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[150px]">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin" />
      </div>
    );
  }

  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Service</h1>
          <p className="text-lg text-gray-600">Select the service that best fits your needs</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => {
            const IconComponent = iconMap[category.name] || CircleHelp; // fallback icon
            return (
              <Card
                key={category._id}
                className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border-2 hover:border-blue-200"
                onClick={() => handleCategorySelect(category._id)}
              >
                <CardContent className="p-8 text-center">
                  <div className="mb-6">
                    <div className="w-20 h-20 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
                      <IconComponent className="w-10 h-10 text-blue-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{category.name}</h2>
                    <p className="text-gray-600 mb-4">Explore our {category.name} services</p>
                    <p className="text-sm text-gray-500 mb-6">
                      Book or manage your {category.name.toLowerCase()} rides easily
                    </p>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors duration-200">
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

export default Category;