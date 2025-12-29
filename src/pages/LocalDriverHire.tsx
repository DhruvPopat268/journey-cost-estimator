import React from 'react';
import { Navbar } from '../components/Sidebar';
import { Phone, Shield, Clock, Car, Users, CheckCircle, Star, MapPin } from 'lucide-react';

const LocalDriverHire = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar title="Local Driver Hire" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Hire Local Driver in Bangalore – Verified & Experienced Drivers Near You
          </h1>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            Need a reliable local driver in your area? Hire4Drive offers trained, verified drivers available across Bangalore for personal or professional use — on call or scheduled.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Why Hire a Local Driver with Hire4Drive */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Hire a Local Driver with Hire4Drive?</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Drivers Near You:</h3>
                  <p className="text-gray-600 text-sm">Get drivers from your locality — faster reach and better convenience.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Shield className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Verified & Trained:</h3>
                  <p className="text-gray-600 text-sm">All drivers are background-checked and road-safe.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Clock className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Flexible Booking:</h3>
                  <p className="text-gray-600 text-sm">Hourly, daily, weekly, or monthly options available.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Star className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Affordable Pricing:</h3>
                  <p className="text-gray-600 text-sm">Local pricing, no hidden charges.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Trusted Service:</h3>
                  <p className="text-gray-600 text-sm">Serving thousands of happy customers across Bangalore.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Where Local Driver Services Help */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Where Local Driver Services Help</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Car className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Daily Office Travel —</h3>
                  <p className="text-gray-600 text-sm">Regular commutes made easier with a local driver.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Users className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Family Outings —</h3>
                  <p className="text-gray-600 text-sm">For weekend plans, weddings, or functions.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Shield className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Elderly & Medical Visits —</h3>
                  <p className="text-gray-600 text-sm">Safe drivers for seniors or hospital appointments.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <MapPin className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Shopping or Personal Errands —</h3>
                  <p className="text-gray-600 text-sm">Hire someone who knows your area well.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-indigo-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Business or Executive Use —</h3>
                  <p className="text-gray-600 text-sm">Professional drivers with punctuality and etiquette.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Book Your Local Driver Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Book Your Local Driver in 3 Simple Steps</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">1. Contact Us</h3>
              <p className="text-gray-600 text-sm">
                Call <span className="text-blue-600 font-semibold">+91 88848 48098</span> or book online via our website or WhatsApp.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">2. Choose Timing</h3>
              <p className="text-gray-600 text-sm">
                Tell us your preferred time and locality — we assign the closest available driver.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">3. Enjoy the Ride</h3>
              <p className="text-gray-600 text-sm">
                Your local driver will arrive on time and ensure a safe, comfortable trip.
              </p>
            </div>
          </div>
        </div>

        {/* Looking for a Local Driver Today Section */}
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Looking for a Local Driver Today?</h2>
          <p className="text-gray-600 mb-6">
            Hire trained and trusted drivers from your area — just a call away!
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

export default LocalDriverHire;