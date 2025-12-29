import React from 'react';
import { Navbar } from '../components/Sidebar';
import { Phone, Shield, Clock, Car, Users, CheckCircle, MapPin } from 'lucide-react';

const DriverForHire = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar title="Driver for Hire" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Driver for Hire in Bangalore – DriveGo
          </h1>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            Need a reliable driver for your car? Whether it's for a few hours, a full day, or a long-term requirement, DriveGo provides professional drivers on demand across Bangalore.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Why Hire a Driver from DriveGo */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Hire a Driver from DriveGo?</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Shield className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Trained & Verified:</h3>
                  <p className="text-gray-600 text-sm">Our drivers are background-checked, ID-verified, and professionally trained.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Clock className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Flexible Booking:</h3>
                  <p className="text-gray-600 text-sm">Hire drivers for hourly, daily, or monthly durations depending on your needs.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Safety First:</h3>
                  <p className="text-gray-600 text-sm">All drivers follow safe driving practices and are familiar with Bangalore's routes.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Car className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Affordable Pricing:</h3>
                  <p className="text-gray-600 text-sm">Transparent, competitive rates with no hidden charges.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Phone className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Quick Availability:</h3>
                  <p className="text-gray-600 text-sm">Get a driver assigned within 60 minutes of your request.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Popular Use Cases */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Use Cases</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Users className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Family Travel:</h3>
                  <p className="text-gray-600 text-sm">Hire a driver for family trips or daily school-office routines.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Elderly Care:</h3>
                  <p className="text-gray-600 text-sm">Book a driver to assist senior citizens with medical or personal appointments.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Clock className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Night Parties:</h3>
                  <p className="text-gray-600 text-sm">Enjoy your evening out and let our driver get you home safely.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <MapPin className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Outstation Drives:</h3>
                  <p className="text-gray-600 text-sm">Long-distance journeys made easy with a reliable chauffeur.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Car className="w-6 h-6 text-indigo-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Corporate Travel:</h3>
                  <p className="text-gray-600 text-sm">Professional drivers for executives and office staff movement.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How to Book Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">How to Book a Driver?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">1. Call or Enquire Online</h3>
              <p className="text-gray-600 text-sm">
                Call us at <span className="text-blue-600 font-semibold">+91 88848 48098</span> or fill out the booking form on our website.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">2. Driver Assigned</h3>
              <p className="text-gray-600 text-sm">
                We'll assign a suitable driver based on your location, timing, and preferences.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">3. Ride with Ease</h3>
              <p className="text-gray-600 text-sm">
                Relax while our driver handles your car responsibly. Pay only after service.
              </p>
            </div>
          </div>
        </div>

        {/* Book a Driver Now Section */}
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Book a Driver Now</h2>
          <p className="text-gray-600 mb-6">
            DriveGo makes it easy and safe to hire a professional driver whenever you need one.
          </p>
          <a href="tel:+918884848098">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-lg transition-colors inline-flex items-center space-x-2">
              <Phone className="w-5 h-5" />
              <span>Call to Hire a Driver</span>
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default DriverForHire;