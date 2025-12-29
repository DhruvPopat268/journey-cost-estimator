import React from 'react';
import { Navbar } from '../components/Sidebar';
import { Phone, Shield, Clock, Car, Users, CheckCircle, Star, MapPin } from 'lucide-react';

const MonthlyDriverService = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar title="Monthly Driver Service" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Hire a Monthly Driver in Bangalore – Full-Time Driver Service
          </h1>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            Need a full-time driver for your car? Hire4Drive offers background-verified, experienced monthly drivers for your everyday travel needs in Bangalore.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Why Choose a Monthly Driver */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Choose a Monthly Driver?</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Clock className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Fixed Monthly Availability:</h3>
                  <p className="text-gray-600 text-sm">Enjoy the convenience of having the same driver every day.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Shield className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Trained Professionals:</h3>
                  <p className="text-gray-600 text-sm">All drivers are skilled, courteous, and road-safe.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Background Verified:</h3>
                  <p className="text-gray-600 text-sm">Safety is our priority — every driver is ID verified and screened.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Car className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Flexible Timings:</h3>
                  <p className="text-gray-600 text-sm">Customize work hours to suit your daily routine or office schedule.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Star className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Affordable Pricing:</h3>
                  <p className="text-gray-600 text-sm">Cost-effective packages for individuals, families, or corporates.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Best for Your Daily Routine */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Best for Your Daily Routine</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Car className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Office Commute:</h3>
                  <p className="text-gray-600 text-sm">Get picked up and dropped off daily without stress.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Users className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">School Runs:</h3>
                  <p className="text-gray-600 text-sm">Safe travel for your children with a regular trusted driver.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Senior Citizens:</h3>
                  <p className="text-gray-600 text-sm">Assist elderly parents with hospital visits, errands, and social outings.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <MapPin className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Personal/Family Use:</h3>
                  <p className="text-gray-600 text-sm">Shopping, events, or day-to-day travel — no worries.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Shield className="w-6 h-6 text-indigo-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Business Professionals:</h3>
                  <p className="text-gray-600 text-sm">Focus on work while we drive you safely.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Book Your Monthly Driver Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Book Your Monthly Driver in 3 Easy Steps</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">1. Contact Us</h3>
              <p className="text-gray-600 text-sm">
                Call <span className="text-blue-600 font-semibold">+91 88848 48098</span> or fill the form on our website.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">2. Driver Assigned</h3>
              <p className="text-gray-600 text-sm">
                We assign a driver matching your timing and location needs.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">3. Start the Ride</h3>
              <p className="text-gray-600 text-sm">
                Begin your hassle-free daily routine with Hire4Drive's monthly driver.
              </p>
            </div>
          </div>
        </div>

        {/* Looking for a Dedicated Driver Section */}
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Looking for a Dedicated Driver in Bangalore?</h2>
          <p className="text-gray-600 mb-6">
            Let us help you find the right full-time driver for your lifestyle. Safe, reliable, and always on time.
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

export default MonthlyDriverService;