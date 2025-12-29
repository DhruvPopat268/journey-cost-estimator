import React from 'react';
import { Navbar } from '../components/Sidebar';
import { Phone, Clock, Shield, Car, Users, MapPin, Star } from 'lucide-react';

const HireADriver = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar title="Hire a Driver" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Hire a Professional Driver in Bangalore – Hire4Drive
          </h1>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            Looking for a reliable driver for your car? Hire trained, background-verified drivers for hourly, daily, or outstation needs – starting in just 60 minutes.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Why Choose Hire4Drive Drivers */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Hire4Drive Drivers?</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Clock className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">On-Demand Availability:</h3>
                  <p className="text-gray-600 text-sm">Book a driver within 60 minutes, anytime, anywhere in Bangalore.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Shield className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Trained & Verified:</h3>
                  <p className="text-gray-600 text-sm">All our drivers undergo ID verification, driving tests, and behavior screening.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Car className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Flexible Hiring:</h3>
                  <p className="text-gray-600 text-sm">Hire drivers by the hour, by the day, or for round outstation trips.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Star className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Affordable Rates:</h3>
                  <p className="text-gray-600 text-sm">Cost-effective pricing for personal, family, and business needs.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Phone className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">24/7 Support:</h3>
                  <p className="text-gray-600 text-sm">We're always available to assist you via call or WhatsApp.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Driver Services We Offer */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Driver Services We Offer</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Clock className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Hourly Driver Services:</h3>
                  <p className="text-gray-600 text-sm">Book a driver for short city errands or shopping trips.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Users className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Daily/Monthly Drivers:</h3>
                  <p className="text-gray-600 text-sm">Hire full-day or monthly drivers for regular travel or office commutes.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <MapPin className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Outstation Trips:</h3>
                  <p className="text-gray-600 text-sm">Experienced drivers for long-distance intercity travel and round-trips.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Car className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Corporate Driver Service:</h3>
                  <p className="text-gray-600 text-sm">Reliable chauffeurs for business executives and company vehicles.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Clock className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Late Night & Emergency:</h3>
                  <p className="text-gray-600 text-sm">Safe drivers available for late-night pickups or urgent situations.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Shield className="w-6 h-6 text-indigo-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Driver for Drink & Drive:</h3>
                  <p className="text-gray-600 text-sm">Book a driver when you're not fit to drive – we get you home safely.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How to Book Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">How to Book a Driver with Hire4Drive?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">1. Call or Book Online</h3>
              <p className="text-gray-600 text-sm">
                Call us at <span className="text-blue-600 font-semibold">+91 88848 48098</span> or use our website to submit your driver request.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">2. Driver Assigned</h3>
              <p className="text-gray-600 text-sm">
                We assign a trained, verified driver based on your location, trip type, and timing.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">3. Enjoy the Ride</h3>
              <p className="text-gray-600 text-sm">
                Your driver reaches you on time and drives your car safely. Pay after the ride.
              </p>
            </div>
          </div>
        </div>

        {/* Need a Driver Now Section */}
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Need a Driver Now?</h2>
          <p className="text-gray-600 mb-6">
            We're just a call away. Whether it's an office drop, outstation trip, or night party, Hire4Drive ensures safety and convenience every time.
          </p>
          <a href="tel:+918884848098">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-lg transition-colors inline-flex items-center space-x-2">
              <Phone className="w-5 h-5" />
              <span>Call to Hire Now</span>
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default HireADriver;