
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, MapPin, Navigation, Clock, Star, Award, Crown } from 'lucide-react';

const Booking = () => {
  const navigate = useNavigate();
  const { categoryId, subcategoryId } = useParams();
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [selectedUsage, setSelectedUsage] = useState('');
  const [customUsage, setCustomUsage] = useState('');
  const [carType, setCarType] = useState('');
  const [transmissionType, setTransmissionType] = useState('');
  const [driverCategory, setDriverCategory] = useState('');

  const getUsageOptions = () => {
    if (subcategoryId === 'one-way') {
      return ['25', '50', '100', '150'];
    } else if (subcategoryId === 'hourly') {
      return ['1', '2', '3', '4', '5', '6', '7', '8'];
    }
    return [];
  };

  const getUsageUnit = () => {
    return subcategoryId === 'one-way' ? 'KM' : 'Hr';
  };

  const carOptions = ['Sedan', 'SUV', 'Luxury', 'Hatchback'];
  const transmissionOptions = ['Manual', 'Automatic'];

  const driverCategories = [
    {
      id: 'normal',
      title: 'Normal',
      icon: Star,
      price: '₹299',
      description: 'Standard service'
    },
    {
      id: 'classic',
      title: 'Classic',
      icon: Award,
      price: '₹399',
      description: 'Verified, trained & tested'
    },
    {
      id: 'prime',
      title: 'Prime',
      icon: Crown,
      price: '₹499',
      description: 'Top-rated veterans'
    }
  ];

  const handleBookRide = () => {
    const bookingData = {
      categoryId,
      subcategoryId,
      fromLocation,
      toLocation,
      usage: selectedUsage || customUsage,
      carType,
      transmissionType,
      driverCategory
    };
    
    navigate('/cost-breakdown', { state: bookingData });
  };

  const isFormValid = fromLocation && toLocation && (selectedUsage || customUsage) && carType && transmissionType && driverCategory;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-4 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mr-4 p-2 hover:bg-white/50 rounded-full"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-2xl font-bold text-gray-900 capitalize">
            {subcategoryId?.replace('-', ' ')} Booking
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
                  <Input
                    id="from"
                    placeholder="Enter pickup location"
                    value={fromLocation}
                    onChange={(e) => setFromLocation(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
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
            </CardContent>
          </Card>

          {/* Estimated Usage */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-blue-600" />
                Estimated Usage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-2 mb-4">
                {getUsageOptions().map((option) => (
                  <Button
                    key={option}
                    variant={selectedUsage === option ? "default" : "outline"}
                    onClick={() => {
                      setSelectedUsage(option);
                      setCustomUsage('');
                    }}
                    className="text-sm"
                  >
                    {option} {getUsageUnit()}
                  </Button>
                ))}
              </div>
              <div>
                <Label htmlFor="custom">Custom {getUsageUnit()}</Label>
                <Input
                  id="custom"
                  placeholder={`Enter custom ${getUsageUnit().toLowerCase()}`}
                  value={customUsage}
                  onChange={(e) => {
                    setCustomUsage(e.target.value);
                    setSelectedUsage('');
                  }}
                  type="number"
                />
              </div>
            </CardContent>
          </Card>

          {/* Car Selection */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle>Car Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Car Type</Label>
                <Select value={carType} onValueChange={setCarType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select car type" />
                  </SelectTrigger>
                  <SelectContent>
                    {carOptions.map((car) => (
                      <SelectItem key={car} value={car.toLowerCase()}>
                        {car}
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
                    {transmissionOptions.map((transmission) => (
                      <SelectItem key={transmission} value={transmission.toLowerCase()}>
                        {transmission}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Driver Category */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle>Choose Driver Type</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {driverCategories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <div
                      key={category.id}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        driverCategory === category.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setDriverCategory(category.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                            <IconComponent className="w-5 h-5 text-gray-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{category.title}</h3>
                            <p className="text-sm text-gray-500">{category.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">{category.price}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Book Ride Button */}
          <Button
            onClick={handleBookRide}
            disabled={!isFormValid}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Book Ride
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Booking;
