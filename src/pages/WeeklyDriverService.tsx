import React from 'react';
import { Navbar } from '../components/Sidebar';
import { Phone, Shield, Clock, Car, Users, CheckCircle, Star, MapPin } from 'lucide-react';

const WeeklyDriverService = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar title="Weekly Driver Service" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Hire a Weekly Driver in Bangalore – Flexible Part-Time Driver Service
          </h1>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            Need a driver just a few days a week? Hire4Drive provides reliable and verified drivers for your car on a weekly schedule – ideal for office travel, shopping, or short trips.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Benefits of Weekly Driver Service */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Benefits of Weekly Driver Service</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Clock className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Flexible Days:</h3>
                  <p className="text-gray-600 text-sm">Choose specific days of the week when you need a driver – 2, 3, or 5 days.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Star className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Cost-Effective:</h3>
                  <p className="text-gray-600 text-sm">Pay only for the days you need. Ideal for part-time use.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Shield className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Verified Drivers:</h3>
                  <p className="text-gray-600 text-sm">All drivers are ID-verified, skilled, and background-checked.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Users className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Consistent Driver:</h3>
                  <p className="text-gray-600 text-sm">Get the same driver every time for familiarity and trust.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Timely & Reliable:</h3>
                  <p className="text-gray-600 text-sm">Drivers arrive on time and ensure a smooth ride every trip.</p>
                </div>
              </div>
            </div>
          </div>

          {/* When to Choose Weekly Driver Service */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">When to Choose Weekly Driver Service?</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Car className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Office Commute (3 days/week):</h3>
                  <p className="text-gray-600 text-sm">Great for hybrid work schedules.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <MapPin className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Market & Shopping Runs:</h3>
                  <p className="text-gray-600 text-sm">Designated driver for errands or heavy purchases.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Shield className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Doctor Appointments:</h3>
                  <p className="text-gray-600 text-sm">Weekly hospital/clinic visits for seniors or families.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Users className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Kids' Classes:</h3>
                  <p className="text-gray-600 text-sm">Reliable pick & drop for weekly school or tuition trips.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-indigo-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Social Outings:</h3>
                  <p className="text-gray-600 text-sm">Reserve a driver for regular community or group events.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How to Book Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">How to Book a Weekly Driver?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">1. Contact Us</h3>
              <p className="text-gray-600 text-sm">
                Call <span className="text-blue-600 font-semibold">+91 88848 48098</span> or fill out our online form.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">2. Choose Days</h3>
              <p className="text-gray-600 text-sm">
                Select preferred days and timing. We assign the best-matched driver accordingly.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">3. Start Your Ride</h3>
              <p className="text-gray-600 text-sm">
                Enjoy consistent weekly rides with the same trusted driver every time.
              </p>
            </div>
          </div>
        </div>

        {/* Want to Hire a Weekly Driver Section */}
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Want to Hire a Weekly Driver?</h2>
          <p className="text-gray-600 mb-6">
            Hire4Drive is your trusted weekly driver partner in Bangalore. Comfort, safety, and reliability guaranteed.
          </p>
          <a href="tel:+918884848098">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-lg transition-colors inline-flex items-center space-x-2">
              <Phone className="w-5 h-5" />
              <span>Call Now to Book Weekly Driver</span>
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default WeeklyDriverService;