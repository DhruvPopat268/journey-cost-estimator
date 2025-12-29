import React from 'react';
import { Navbar } from '../components/Sidebar';
import { Phone, Clock, Shield, Car, Users, MapPin, CheckCircle } from 'lucide-react';

const OutstationDriver = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar title="Outstation Driver" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Outstation Driver Services from Bangalore – Hire4Drive
          </h1>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Planning a long-distance journey outside Bangalore? Whether you're going for a family trip, a business meeting, a wedding, or a vacation, Hire4Drive offers experienced and background-verified outstation drivers you can trust. With Hire4Drive, you can now hire a trained driver for one-way, round trip, or multi-day journeys — all in the comfort of your own car.
          </p>
        </div>

        {/* Driver Experience Section */}
        <div className="mb-12">
          <p className="text-gray-700 text-center max-w-4xl mx-auto leading-relaxed mb-8">
            Our drivers are well-versed with long-distance travel, national highways, state borders, and terrain driving. We ensure each driver is ID verified, experienced, and capable of handling city-to-city drives during both day and night. So, no matter your destination — be it Mysore, Coorg, Mangalore, Hyderabad, Chennai, or any city in India — Hire4Drive has the right driver for you.
          </p>
        </div>

        {/* Why Choose Hire4Drive Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Why choose Hire4Drive for outstation trips?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-3">
              <Car className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
              <p className="text-gray-700 text-sm">Hire a driver for one-way, round-trip, or multi-day journeys.</p>
            </div>
            
            <div className="flex items-start space-x-3">
              <Clock className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
              <p className="text-gray-700 text-sm">Get doorstep pickup within 60 minutes.</p>
            </div>
            
            <div className="flex items-start space-x-3">
              <Shield className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
              <p className="text-gray-700 text-sm">Drivers with road knowledge, proper etiquette, and long-distance experience.</p>
            </div>
            
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" />
              <p className="text-gray-700 text-sm">Transparent pricing with no hidden charges.</p>
            </div>
            
            <div className="flex items-start space-x-3">
              <Phone className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
              <p className="text-gray-700 text-sm">24/7 customer support and emergency assistance.</p>
            </div>
            
            <div className="flex items-start space-x-3">
              <MapPin className="w-6 h-6 text-indigo-600 mt-1 flex-shrink-0" />
              <p className="text-gray-700 text-sm">Flexible packages for 1-day, 3-day, 7-day, or even monthly long tours.</p>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-12">
          <p className="text-gray-700 text-center max-w-4xl mx-auto leading-relaxed mb-8">
            Whether it's a religious trip with family, a late-night emergency drive, or a vacation to a hill station, our drivers ensure your safety and comfort. You relax in your car while we do the driving. Unlike taxis, you avoid high fares, unknown drivers, and waiting time — you stay in control with your own vehicle.
          </p>
          
          <p className="text-gray-700 text-center max-w-4xl mx-auto leading-relaxed">
            Hire4Drive is trusted by over 50,000 customers in Bangalore and has completed 1 lakh+ outstation trips successfully since 2017. Book online or call us directly, and we'll assign a professional driver based on your schedule and route.
          </p>
        </div>

        {/* Need an Outstation Driver Section */}
        <div className="bg-white rounded-lg shadow-md p-8 text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Need an Outstation Driver?</h2>
          <p className="text-gray-600 mb-6">
            Call us now at <span className="text-blue-600 font-semibold">+91 88848 48098</span> – Hire4Drive is ready when you are!
          </p>
          <a href="tel:+918884848098">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-lg transition-colors inline-flex items-center space-x-2">
              <Phone className="w-5 h-5" />
              <span>Call +91 88848 48098</span>
            </button>
          </a>
        </div>

        {/* Become Driver CTA */}
        <div className="text-center">
          <a
            href="https://play.google.com/store/apps/details?id=com.hiredrive.app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-3 rounded-lg transition-colors inline-flex items-center space-x-2">
              <Car className="w-5 h-5" />
              <span>Become Hire4Drive Driver</span>
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default OutstationDriver;