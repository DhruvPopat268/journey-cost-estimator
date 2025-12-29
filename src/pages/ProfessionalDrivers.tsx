import React from 'react';
import { Navbar } from '../components/Sidebar';
import { Phone, Shield, Clock, Car, Users, CheckCircle, Star, MapPin } from 'lucide-react';

const ProfessionalDrivers = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar title="Professional Drivers" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Hire Professional Driver Services in Bangalore – Verified & Reliable
          </h1>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            Looking for skilled, trained, and well-mannered drivers? DriveGo offers professional driver services in Bangalore with flexible booking options — by hour, day, or month.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Why Choose Professional Drivers from DriveGo */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Professional Drivers from DriveGo?</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Shield className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Trained & Experienced:</h3>
                  <p className="text-gray-600 text-sm">Drivers trained in city, highway, and outstation driving.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Verified & Background Checked:</h3>
                  <p className="text-gray-600 text-sm">Complete ID and police verification.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Users className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Corporate & Personal Use:</h3>
                  <p className="text-gray-600 text-sm">Suitable for family use, executives, and senior citizens.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Star className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Etiquette & Safety Focused:</h3>
                  <p className="text-gray-600 text-sm">Polite, punctual, and well-dressed drivers.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Clock className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Flexible Booking:</h3>
                  <p className="text-gray-600 text-sm">Hourly, daily, weekly, or monthly as per your need.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Use Cases of Professional Driver Services */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Use Cases of Professional Driver Services</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Car className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Corporate Travel:</h3>
                  <p className="text-gray-600 text-sm">Chauffeurs for CEOs, guests, or company cars.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Users className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Family Travel:</h3>
                  <p className="text-gray-600 text-sm">Outings, events, and personal errands.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Shield className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Senior Citizen Assistance:</h3>
                  <p className="text-gray-600 text-sm">Drivers trained for senior-friendly driving.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <MapPin className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Regular Commute:</h3>
                  <p className="text-gray-600 text-sm">Office travel with full part-time drivers.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Star className="w-6 h-6 text-indigo-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Luxury Car Drivers:</h3>
                  <p className="text-gray-600 text-sm">Experienced in handling premium and automatic vehicles.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How to Hire Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">How to Hire a Professional Driver?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">1. Call or Book Online</h3>
              <p className="text-gray-600 text-sm">
                Call <span className="text-blue-600 font-semibold">+91 88848 48098</span> or book online/WhatsApp anytime.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">2. Driver Assigned</h3>
              <p className="text-gray-600 text-sm">
                We match you with the best-suited driver based on your requirements.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">3. Ride with Confidence</h3>
              <p className="text-gray-600 text-sm">
                Enjoy a smooth ride with our professional, courteous driver.
              </p>
            </div>
          </div>
        </div>

        {/* Looking for a Professional Driver Now Section */}
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Looking for a Professional Driver Now?</h2>
          <p className="text-gray-600 mb-6">
            Get access to top-rated drivers trusted by hundreds across Bangalore — just a call away.
          </p>
          <a href="tel:+918884848098">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-lg transition-colors inline-flex items-center space-x-2">
              <Phone className="w-5 h-5" />
              <span>Call to Book Now</span>
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalDrivers;