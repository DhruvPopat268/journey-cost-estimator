import React from 'react';
import { Navbar } from '../components/Sidebar';
import { Phone, Shield, Clock, Car, Users, CheckCircle, Star, MapPin } from 'lucide-react';

const OnCallDriverService = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar title="On-Call Driver Service" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            On-Call Driver Service in Bangalore – Hire a Driver Anytime
          </h1>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            Need a driver urgently? DriveGo provides fast, verified, and trained drivers on demand – available within 60 minutes across Bangalore.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Why Choose On-Call Driver Service */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Choose On-Call Driver Service?</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Clock className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Instant Availability:</h3>
                  <p className="text-gray-600 text-sm">Book a driver in just 60 minutes, anytime.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Shield className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Verified & Trained Drivers:</h3>
                  <p className="text-gray-600 text-sm">Safe and reliable drivers for urgent needs.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Car className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Flexible Booking:</h3>
                  <p className="text-gray-600 text-sm">Hire for a few hours, one-way trips, or full day.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Star className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Affordable Rates:</h3>
                  <p className="text-gray-600 text-sm">Competitive pricing even for last-minute bookings.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Phone className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">24/7 Support:</h3>
                  <p className="text-gray-600 text-sm">Call, WhatsApp, or book online – we're always available.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Perfect For */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Perfect For:</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Clock className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Last-Minute Travel:</h3>
                  <p className="text-gray-600 text-sm">Sudden plans? We've got you covered.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Users className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Post-Party Driving:</h3>
                  <p className="text-gray-600 text-sm">Had a drink? Let us drive you home safely.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Shield className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Medical Emergencies:</h3>
                  <p className="text-gray-600 text-sm">Need to reach the hospital? We act fast.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Driver Absence:</h3>
                  <p className="text-gray-600 text-sm">Regular driver on leave? We're your backup.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <MapPin className="w-6 h-6 text-indigo-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Airport Drop/Pickup:</h3>
                  <p className="text-gray-600 text-sm">Urgent airport transfers made easy.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How to Book Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">How to Book a Driver on Call?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">1. Call Us</h3>
              <p className="text-gray-600 text-sm">
                Call <span className="text-blue-600 font-semibold">+91 88848 48098</span> or message us on WhatsApp.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">2. Driver Assigned</h3>
              <p className="text-gray-600 text-sm">
                We assign a nearby verified driver based on your location and need.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">3. Ride Starts</h3>
              <p className="text-gray-600 text-sm">
                Your driver arrives on time and drives your vehicle safely.
              </p>
            </div>
          </div>
        </div>

        {/* Need a Driver Right Now Section */}
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Need a Driver Right Now?</h2>
          <p className="text-gray-600 mb-6">
            Don't wait. Get a professional driver at your doorstep in just 60 minutes – anytime, anywhere in Bangalore.
          </p>
          <a href="tel:+918884848098">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-lg transition-colors inline-flex items-center space-x-2">
              <Phone className="w-5 h-5" />
              <span>Call Now to Book</span>
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default OnCallDriverService;