import React from 'react';
import { Navbar } from '../components/Sidebar';
import { Phone, Clock, Shield, Car, Users, CheckCircle, Star } from 'lucide-react';

const HourlyDriverService = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar title="Hourly Driver Service" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Hourly Driver Service in Bangalore – Hire Trained Drivers with Hire4Drive
          </h1>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            Need a driver for just a few hours? Hire4Drive offers flexible hourly driver services in Bangalore for your personal car. Fast, safe, and affordable.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Why Choose Hire4Drive's Hourly Driver Service */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Hire4Drive's Hourly Driver Service?</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Clock className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Quick Availability:</h3>
                  <p className="text-gray-600 text-sm">Get a professional driver at your doorstep within 60 minutes.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Shield className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Verified & Trained Drivers:</h3>
                  <p className="text-gray-600 text-sm">Background-checked, behavior-screened, and road-tested drivers.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Star className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Pay Only for Time Used:</h3>
                  <p className="text-gray-600 text-sm">Flexible billing – per hour, so you don't overpay.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Car className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">For Any Purpose:</h3>
                  <p className="text-gray-600 text-sm">Use for shopping trips, doctor visits, office meetings, school drops, or functions.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Clock className="w-6 h-6 text-indigo-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Safe Night Driving:</h3>
                  <p className="text-gray-600 text-sm">Hire a driver for night outs or late returns when you're tired or need a backup.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Users className="w-6 h-6 text-pink-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Women-Friendly Service:</h3>
                  <p className="text-gray-600 text-sm">Experienced and courteous drivers for senior citizens and women passengers.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Ideal For */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Ideal For:</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Senior Citizens</h3>
                  <p className="text-gray-600 text-sm">who need help driving around the city.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Working Professionals</h3>
                  <p className="text-gray-600 text-sm">attending back-to-back meetings, calls, or appointments.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Families</h3>
                  <p className="text-gray-600 text-sm">going out for shopping, weddings, or functions.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Tourists</h3>
                  <p className="text-gray-600 text-sm">looking for safe navigation in a personal or rented car.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Drink & Drive Situations</h3>
                  <p className="text-gray-600 text-sm">– when you're not fit to drive back home.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">How It Works?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">1. Contact Us</h3>
              <p className="text-gray-600 text-sm">
                Call <span className="text-blue-600 font-semibold">+91 88848 48098</span> or book online through our site.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">2. Schedule & Confirm</h3>
              <p className="text-gray-600 text-sm">
                Choose the hours, pickup point, and vehicle. We'll assign a verified driver.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">3. Enjoy Your Ride</h3>
              <p className="text-gray-600 text-sm">
                Your assigned driver will arrive on time, drive your vehicle safely, and leave after your trip.
              </p>
            </div>
          </div>
        </div>

        {/* Call Now Section */}
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Call Now & Book an Hourly Driver</h2>
          <p className="text-gray-600 mb-6">
            Hire4Drive brings convenience to your doorstep with trusted, verified hourly drivers.
          </p>
          <a href="tel:+918884848098">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-lg transition-colors inline-flex items-center space-x-2">
              <Phone className="w-5 h-5" />
              <span>Call +91 88848 48098</span>
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default HourlyDriverService;