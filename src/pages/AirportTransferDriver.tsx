import React from 'react';
import { Navbar } from '../components/Sidebar';
import { Phone, Shield, Clock, Car, Users, CheckCircle, Star, MapPin, Plane } from 'lucide-react';

const AirportTransferDriver = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar title="Airport Transfer Driver" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Hire Driver for Airport Drop & Pickup in Bangalore – On-Time Transfers
          </h1>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            Traveling to or from the airport? Hire4Drive provides reliable, trained, and verified drivers to drive your car for airport drop or pickup — available 24/7 across Bangalore.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Why Choose Hire4Drive for Airport Transfers */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Hire4Drive for Airport Transfers?</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Clock className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">On-Time Service:</h3>
                  <p className="text-gray-600 text-sm">Drivers arrive ahead of schedule to ensure timely airport drop/pickup.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Shield className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Verified Professionals:</h3>
                  <p className="text-gray-600 text-sm">Trained chauffeurs with valid ID, license, and polite behavior.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Safe & Reliable:</h3>
                  <p className="text-gray-600 text-sm">Your car, your driver — we ensure peace of mind.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Star className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">24x7 Availability:</h3>
                  <p className="text-gray-600 text-sm">Early morning or midnight flight? We're ready anytime.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Car className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">One-Way or Round-Trip:</h3>
                  <p className="text-gray-600 text-sm">Flexible booking options as per your flight schedule.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Airport Routes We Cover */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Airport Routes We Cover</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Plane className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">To Kempegowda Airport:</h3>
                  <p className="text-gray-600 text-sm">Pickups from anywhere in Bangalore.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <MapPin className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">From Airport to City:</h3>
                  <p className="text-gray-600 text-sm">Driver reaches airport and drives your car home.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Round Trips:</h3>
                  <p className="text-gray-600 text-sm">Pickup + Drop with wait time included.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Users className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Corporate Transfers:</h3>
                  <p className="text-gray-600 text-sm">For executives, clients, or business guests.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Shield className="w-6 h-6 text-indigo-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Family & Senior Citizens:</h3>
                  <p className="text-gray-600 text-sm">Safe driver for stress-free travel.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How to Book Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">How to Book Your Airport Driver?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">1. Contact Us</h3>
              <p className="text-gray-600 text-sm">
                Call <span className="text-blue-600 font-semibold">+91 88848 48098</span> or book online.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plane className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">2. Share Flight Time</h3>
              <p className="text-gray-600 text-sm">
                Tell us your location, flight timing, and pickup/drop requirements.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">3. Enjoy the Ride</h3>
              <p className="text-gray-600 text-sm">
                Your driver arrives on time and ensures a smooth, timely journey.
              </p>
            </div>
          </div>
        </div>

        {/* Need an Airport Driver Now Section */}
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Need an Airport Driver Now?</h2>
          <p className="text-gray-600 mb-6">
            Don't worry about parking, waiting, or timing. Let us handle your airport transfer with ease.
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

export default AirportTransferDriver;