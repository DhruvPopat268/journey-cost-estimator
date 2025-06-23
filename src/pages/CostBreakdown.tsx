import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, MapPin, Clock, Car, CreditCard } from 'lucide-react';

const CostBreakdown = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const bookingData = location.state;
  console.log("booking data", bookingData)

  const [driverCategory, setDriverCategory] = useState(null);
  const [filterDriver, setFilterDriver] = useState(null);

  useEffect(() => {
    const fetchDriverCategory = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/price-categories`);
        const allDrivers = res.data;
        setDriverCategory(allDrivers);
        console.log("driverDetails", allDrivers);

        const driverType = allDrivers.filter(
          (driver) => bookingData.driverCategory === driver.priceCategoryName
        );
        setFilterDriver(driverType[0]); // Get the first matching driver
      } catch (error) {
        console.error('Failed to fetch driver category data:', error);
      }
    };

    fetchDriverCategory();
  }, []);

  if (!bookingData || !filterDriver) {
    return null;
  }

  const calculateCosts = () => {
    const usage = parseInt(bookingData.usage) || 0;
    
    // Driver Charges = filterDriver.chargePerKm * bookingData.usage
    const driverCharges = filterDriver.chargePerKm * usage;
    
    // Admin Charges = 10% of Driver Charges
    const adminCharges = Math.round(driverCharges * 0.10);
    
    // GST Charges (18%) = 18% of Admin Charges
    const gstCharges = Math.round(adminCharges * 0.18);
    
    // Total = Driver Charges + Admin Charges + GST Charges
    const total = Math.round(driverCharges + adminCharges + gstCharges);

    return {
      driverCharges: Math.round(driverCharges),
      adminCharges,
      gstCharges,
      total
    };
  };

  const costs = calculateCosts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-4 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mr-4 p-2 hover:bg-white/50 rounded-full">
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Cost Breakdown</h1>
        </div>

        <div className="space-y-6">
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-blue-600" /> Trip Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between"><span>From:</span><span>{bookingData.fromLocation}</span></div>
              <div className="flex justify-between"><span>To:</span><span>{bookingData.toLocation}</span></div>
              <div className="flex justify-between">
                <span>Usage:</span>
                <span>{bookingData.usage} {bookingData.subcategoryId === 'one-way' ? 'KM' : 'Minutes'}</span>
              </div>
              <div className="flex justify-between">
                <span>Driver Category:</span>
                <span>{bookingData.driverCategory}</span>
              </div>
              <div className="flex justify-between">
                <span>Rate per KM:</span>
                <span>₹{filterDriver.chargePerKm}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg">
            <CardHeader><CardTitle>Price Breakdown</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span>Driver Charges:</span>
                <span>₹{costs.driverCharges}</span>
              </div>
              <div className="flex justify-between">
                <span>Admin Charges (10%):</span>
                <span>₹{costs.adminCharges}</span>
              </div>
              <div className="flex justify-between">
                <span>GST Charges (18%):</span>
                <span>₹{costs.gstCharges}</span>
              </div>
              <Separator className="my-4" />
              <div className="flex justify-between text-xl font-bold">
                <span>Total:</span>
                <span>₹{costs.total}</span>
              </div>
            </CardContent>
          </Card>

          <Button
            onClick={() => alert('Payment flow here')}
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