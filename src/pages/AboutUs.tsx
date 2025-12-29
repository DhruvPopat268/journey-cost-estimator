import React from 'react';
import { Navbar } from '../components/Sidebar';
import { Car, Clock, Smartphone, Users, Award, Target, TrendingUp, Heart, MapPin, Calendar, Shield, CheckCircle } from 'lucide-react';

const AboutUs = () => {
  const stats = [
    { icon: Users, value: '5000+', label: 'Happy Customers', color: 'bg-black' },
    { icon: Car, value: '20000+', label: 'Bookings Delivered', color: 'bg-gray-800' },
    { icon: Users, value: '200+', label: 'Professional Drivers', color: 'bg-gray-700' },
    { icon: MapPin, value: '50+', label: 'Cities Covered', color: 'bg-gray-600' }
  ];

  const features = [
    {
      icon: Clock,
      title: 'Quick Response',
      description: 'On-demand service availability within 60 minutes across major cities'
    },
    {
      icon: Shield,
      title: 'Safe & Secure',
      description: 'All drivers are verified and trained for professional service'
    },
    {
      icon: Smartphone,
      title: 'Easy Booking',
      description: 'Web-based and mobile app booking for instant cab requests'
    },
    {
      icon: Award,
      title: 'Best Quality',
      description: 'Trusted by travelers, corporates, and car owners nationwide'
    }
  ];

  const milestones = [
    {
      year: '2017',
      title: 'Founded in Bangalore',
      description: 'Started our journey to revolutionize the driver-on-demand sector'
    },
    {
      year: '2019',
      title: '10,000 Bookings',
      description: 'Reached our first major milestone with expanding customer base'
    },
    {
      year: '2021',
      title: 'Multi-City Launch',
      description: 'Expanded services to multiple cities across India'
    },
    {
      year: '2025',
      title: 'Industry Leader',
      description: '20,000+ bookings and growing with innovative technology'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar title="About Us" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            About <span className="text-black">Hire4Drive</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
            The aggregate-based technology company delivering on-demand Drivers & Cabs for hire. 
            Since <span className="font-semibold">2017</span>, we've been the most convenient, reliable, 
            and fastest platform for hourly and point-to-point services.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <div className={`w-16 h-16 ${stat.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Our Mission Section */}
        <div className="bg-black rounded-3xl shadow-xl p-8 sm:p-12 mb-16 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center mb-6">
                <Target className="w-10 h-10 mr-4" />
                <h2 className="text-3xl sm:text-4xl font-bold">Our Mission</h2>
              </div>
              <p className="text-lg text-gray-300 leading-relaxed">
                To revolutionize urban mobility by providing reliable, safe, and affordable driver-on-demand 
                services. We integrate cutting-edge technology with professional service to enhance the customer 
                experience and make transportation accessible for everyone.
              </p>
            </div>
            <div>
              <div className="flex items-center mb-6">
                <Heart className="w-10 h-10 mr-4" />
                <h2 className="text-3xl sm:text-4xl font-bold">Our Vision</h2>
              </div>
              <p className="text-lg text-gray-300 leading-relaxed">
                To become India's most trusted and preferred platform for driver and cab services, 
                expanding to every major city and setting new standards in customer satisfaction and service excellence.
              </p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
            <p className="text-lg text-gray-600">We deliver excellence through innovation and dedication</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="w-14 h-14 bg-black rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Our Journey Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-lg text-gray-600">Milestones that shaped our success</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((milestone, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow h-full">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <span className="ml-3 text-2xl font-bold text-black">{milestone.year}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{milestone.description}</p>
                </div>
                {index < milestones.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gray-300 transform -translate-y-1/2"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Achievements Section */}
        <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12 mb-16">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center mb-4">
              <TrendingUp className="w-10 h-10 text-black mr-3" />
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Our Achievements</h2>
            </div>
            <p className="text-lg text-gray-600">Numbers that speak for themselves</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl">
              <CheckCircle className="w-8 h-8 text-black flex-shrink-0 mt-1" />
              <div>
                <div className="text-2xl font-bold text-gray-900 mb-2">2000+ Drink & Drive Bookings</div>
                <p className="text-gray-600">Ensuring safe rides home for thousands of customers</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl">
              <CheckCircle className="w-8 h-8 text-black flex-shrink-0 mt-1" />
              <div>
                <div className="text-2xl font-bold text-gray-900 mb-2">3000+ Outstation Trips</div>
                <p className="text-gray-600">Long-distance journeys made comfortable and reliable</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl">
              <CheckCircle className="w-8 h-8 text-black flex-shrink-0 mt-1" />
              <div>
                <div className="text-2xl font-bold text-gray-900 mb-2">200+ Professional Drivers</div>
                <p className="text-gray-600">Trained and verified partners committed to excellence</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl">
              <CheckCircle className="w-8 h-8 text-black flex-shrink-0 mt-1" />
              <div>
                <div className="text-2xl font-bold text-gray-900 mb-2">60 Minutes Response</div>
                <p className="text-gray-600">Quick and efficient service across all major cities</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-black to-gray-800 rounded-3xl shadow-xl p-8 sm:p-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Join Our Growing Team
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Become a part of India's fastest-growing driver platform and start earning today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://play.google.com/store/apps/details?id=com.hiredrive.app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="bg-white text-black font-bold px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors inline-flex items-center justify-center space-x-3 shadow-lg">
                <Car className="w-6 h-6" />
                <span>Become A Driver</span>
              </button>
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.hiredriveuser.app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="bg-transparent border-2 border-white text-white font-bold px-8 py-4 rounded-xl hover:bg-white hover:text-black transition-colors inline-flex items-center justify-center space-x-3">
                <Smartphone className="w-6 h-6" />
                <span>Download User App</span>
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;