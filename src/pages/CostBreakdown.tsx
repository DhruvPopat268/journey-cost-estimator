
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, MapPin, Clock, Car, User, CreditCard } from 'lucide-react';

const CostBreakdown = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const bookingData = location.state;

  if (!bookingData) {
    navigate('/');
    return null;
  }

  const calculateCosts = () => {
    const baseRate = bookingData.subcategoryId === 'one-way' ? 15 : 50; // per km or per hour
    const usage = parseInt(bookingData.usage) || 0;
    
    const driverMultiplier = {
      normal: 1,
      classic: 1.3,
      prime: 1.6
    };

    const carMultiplier = {
      hatchback: 1,
      sedan: 1.2,
      suv: 1.5,
      luxury: 2
    };

    const baseCost = baseRate * usage;
    const driverCost = baseCost * (driverMultiplier[bookingData.driverCategory] || 1);
    const carCost = driverCost * (carMultiplier[bookingData.carType] || 1);
    
    const taxes = Math.round(carCost * 0.18); // 18% GST
    const platformFee = 25;
    const total = Math.round(carCost + taxes + platformFee);

    return {
      baseCost: Math.round(baseCost),
      driverCost: Math.round(driverCost - baseCost),
      carCost: Math.round(carCost - driverCost),
      taxes,
      platformFee,
      total
    };
  };

  const costs = calculateCosts();

  const handlePayment = () => {
    // Here you would integrate with a payment gateway
    alert('Payment integration would be implemented here');
  };

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
          <h1 className="text-2xl font-bold text-gray-900">Cost Breakdown</h1>
        </div>

        <div className="space-y-6">
          {/* Trip Details */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                Trip Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Service Type:</span>
                <span className="font-semibold capitalize">
                  {bookingData.categoryId} - {bookingData.subcategoryId?.replace('-', ' ')}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">From:</span>
                <span className="font-semibold">{bookingData.fromLocation}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">To:</span>
                <span className="font-semibold">{bookingData.toLocation}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Distance/Duration:</span>
                <span className="font-semibold">
                  {bookingData.usage} {bookingData.subcategoryId === 'one-way' ? 'KM' : 'Hours'}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Vehicle & Driver Details */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Car className="w-5 h-5 mr-2 text-blue-600" />
                Vehicle & Driver
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Car Type:</span>
                <span className="font-semibold capitalize">{bookingData.carType}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Transmission:</span>
                <span className="font-semibold capitalize">{bookingData.transmissionType}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Driver Category:</span>
                <span className="font-semibold capitalize">{bookingData.driverCategory}</span>
              </div>
            </CardContent>
          </Card>

          {/* Cost Breakdown */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="w-5 h-5 mr-2 text-blue-600" />
                Price Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Base Fare:</span>
                <span className="font-semibold">₹{costs.baseCost}</span>
              </div>
              {costs.driverCost > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Driver Category:</span>
                  <span className="font-semibold">₹{costs.driverCost}</span>
                </div>
              )}
              {costs.carCost > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Car Type:</span>
                  <span className="font-semibold">₹{costs.carCost}</span>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Platform Fee:</span>
                <span className="font-semibold">₹{costs.platformFee}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Taxes & Fees (18%):</span>
                <span className="font-semibold">₹{costs.taxes}</span>
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total Amount:</span>
                <span className="text-blue-600">₹{costs.total}</span>
              </div>
            </CardContent>
          </Card>

          {/* Payment Options */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 border-2 border-blue-200 bg-blue-50 rounded-lg">
                  <input type="radio" name="payment" defaultChecked className="text-blue-600" />
                  <div className="flex items-center">
                    <CreditCard className="w-5 h-5 mr-2 text-blue-600" />
                    <span>Cash Payment</span>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 border-2 border-gray-200 rounded-lg">
                  <input type="radio" name="payment" className="text-blue-600" />
                  <div className="flex items-center">
                    <CreditCard className="w-5 h-5 mr-2 text-gray-600" />
                    <span>Online Payment</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Confirm & Pay Button */}
          <Button
            onClick={handlePayment}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg font-semibold rounded-lg"
          >
            Confirm & Pay ₹{costs.total}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CostBreakdown;
