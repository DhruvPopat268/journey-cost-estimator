import React from 'react';
import { Navbar } from '../components/Sidebar';
import { Phone, Shield, Clock, Car, Users, CheckCircle, Star } from 'lucide-react';

const PrivateCarDrivers = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar title="Private Car Drivers" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Hire a Private Driver in Bangalore – Hire4Drive
          </h1>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            Looking for a dedicated driver for your personal vehicle? Hire a private, background-verified chauffeur from Hire4Drive for your daily, weekly, or monthly needs.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Why Choose Hire4Drive's Private Driver Service */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Hire4Drive's Private Driver Service?</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Shield className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Trained & Verified:</h3>
                  <p className="text-gray-600 text-sm">Our private drivers are ID-verified, background-checked, and trained in safe, professional driving etiquette.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Car className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Personalized Service:</h3>
                  <p className="text-gray-600 text-sm">Get a consistent driver for your routine routes and personal convenience.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Clock className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Flexible Duration:</h3>
                  <p className="text-gray-600 text-sm">Hire private drivers on a daily, weekly, or monthly basis.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Users className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Punctual & Polite:</h3>
                  <p className="text-gray-600 text-sm">Our drivers ensure timely pickups and maintain a courteous attitude.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Star className="w-6 h-6 text-indigo-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Affordable Plans:</h3>
                  <p className="text-gray-600 text-sm">Choose from flexible plans that suit your schedule and budget.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Perfect For */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Perfect For:</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Senior citizens</h3>
                  <p className="text-gray-600 text-sm">who need a reliable chauffeur.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Working professionals</h3>
                  <p className="text-gray-600 text-sm">for daily office commute.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Families</h3>
                  <p className="text-gray-600 text-sm">needing a driver for school drops, shopping, and more.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Corporate executives</h3>
                  <p className="text-gray-600 text-sm">requiring a dedicated car and driver.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Individuals</h3>
                  <p className="text-gray-600 text-sm">who value comfort, safety, and consistency.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How to Book Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">How to Book a Private Driver?</h2>
          <p className="text-gray-600 text-center mb-8">
            Call us at <span className="text-blue-600 font-semibold">+91 88848 48098</span> or submit your requirement online. Our team will assign the best-suited driver based on your preferences.
          </p>
          
          <div className="text-center">
            <a href="tel:+918884848098">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-lg transition-colors inline-flex items-center space-x-2">
                <Phone className="w-5 h-5" />
                <span>Book Your Private Driver</span>
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivateCarDrivers;