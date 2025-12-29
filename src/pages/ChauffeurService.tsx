import React from 'react';
import { Navbar } from '../components/Sidebar';
import { Phone, Shield, Clock, Car, Users, CheckCircle, Star, MapPin } from 'lucide-react';

const ChauffeurService = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar title="Chauffeur Service" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Hire Chauffeur Driver in Bangalore – Hire4Drive
          </h1>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            Looking for a trained, well-behaved chauffeur to drive your personal or company car? Hire4Drive offers professional chauffeur drivers in Bangalore for hourly, daily, or monthly needs.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Why Choose a Chauffeur from Hire4Drive */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Choose a Chauffeur from Hire4Drive?</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Shield className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Trained & Verified:</h3>
                  <p className="text-gray-600 text-sm">All chauffeurs are background-checked and trained for safe, professional driving.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Users className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Polite & Well-Dressed:</h3>
                  <p className="text-gray-600 text-sm">Chauffeurs are punctual, well-groomed, and behave respectfully with clients.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Car className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Flexible Services:</h3>
                  <p className="text-gray-600 text-sm">Available for personal family trips, corporate meetings, and special events.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Star className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Luxury Ride Experience:</h3>
                  <p className="text-gray-600 text-sm">Enjoy the convenience of a skilled driver managing your vehicle with care.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Clock className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Quick Booking:</h3>
                  <p className="text-gray-600 text-sm">Hire a chauffeur in just 60 minutes via call or website.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Ideal for */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Ideal for:</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Business Executives</h3>
                  <p className="text-gray-600 text-sm">who need a corporate driver for travel in the city.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Families</h3>
                  <p className="text-gray-600 text-sm">looking for a safe and comfortable travel experience.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Luxury Car Owners</h3>
                  <p className="text-gray-600 text-sm">needing experienced chauffeurs to manage their vehicles.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Senior Citizens</h3>
                  <p className="text-gray-600 text-sm">who prefer reliable and calm drivers.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-indigo-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Airport or Hotel Transfers</h3>
                  <p className="text-gray-600 text-sm">for clients or guests.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Book Your Chauffeur Today Section */}
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Book Your Chauffeur Today</h2>
          <p className="text-gray-600 mb-6">
            Call us at <span className="text-blue-600 font-semibold">+91 88848 48098</span> or submit a request online to hire a professional chauffeur driver in Bangalore today.
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

export default ChauffeurService;