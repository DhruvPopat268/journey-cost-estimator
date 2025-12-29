import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { User, Car, Package, ChevronRight, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { Navbar } from '../components/Sidebar';

const Category = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedFaq, setExpandedFaq] = useState(0);

  // Icon mappings
  const categoryIconMap = {
    Driver: User,
    Cab: Car,
    Parcel: Package,
  };

  // FAQ data
  const faqs = [
    {
      question: "How do I book a ride on Drivego?",
      answer: "Open the Drivego app or website, enter your pickup & drop-off locations, choose your ride type (e.g., on-demand, scheduled), confirm, and submit your booking. You'll immediately see driver details and real-time tracking."
    },
    {
      question: "What types of rides are available?",
      answer: "Drivego offers various ride types including on-demand rides, scheduled bookings, hourly rentals, outstation trips, and more to suit your travel needs."
    },
    {
      question: "How much will my ride cost?",
      answer: "The ride cost depends on factors like distance, time, ride type, and demand. You'll see an estimated fare before confirming your booking."
    },
    {
      question: "Is Drivego safe and reliable?",
      answer: "Yes, Drivego prioritizes safety with verified drivers, real-time tracking, 24/7 support, and secure payment options to ensure a safe and reliable experience."
    },
    {
      question: "Can I cancel or modify my booking?",
      answer: "Yes, you can cancel or modify your booking through the app. Cancellation charges may apply based on the timing and booking type."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept various payment methods including credit/debit cards, digital wallets, UPI, and cash payments for your convenience."
    }
  ];

  // Sample review data
  const sampleReview = {
    rating: 4.5,
    name: "Ravi Mehta",
    location: "Delhi",
    date: "06 Apr, 2025",
    review: "The driver arrived on time and the car was clean and well-maintained. Booking through Drivego was super easy and the entire ride was smooth. Highly recommended for city travel!"
  };

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/categories`);
        if (res.status === 200) {
          setCategories(res.data || []);
        } else {
          setError('Failed to load categories');
        }
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Something went wrong while loading categories');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Handle category selection
  const handleCategorySelect = async (categoryId) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/subcategories`);
      const subcategories = res.data || [];
      const filteredSubcategories = subcategories.filter(sub => sub.categoryId === categoryId);
      
      if (filteredSubcategories.length > 0) {
        navigate(`/subcategories/${categoryId}`);
      } else {
        navigate(`/booking/${categoryId}`);
      }
    } catch (error) {
      console.error('Error checking subcategories:', error);
      navigate(`/booking/${categoryId}`);
    }
  };

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? -1 : index);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Navbar title="Select Category" />
        <div className="flex justify-center items-center min-h-[200px] px-4">
          <div className="w-8 h-8 sm:w-10 sm:h-10 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Navbar title="Select Category" />
        <div className="max-w-4xl mx-auto px-4 pt-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600 text-center text-sm sm:text-base">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar title="Select Category" />

      <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 pt-4 sm:pt-6 pb-6">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
            Book Your Service
          </h1>
          <p className="text-sm sm:text-base text-gray-600 px-4">
            Choose your service category to get started
          </p>
        </div>

        {/* Categories Grid - Desktop & Tablet */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-12">
          {categories.map((category) => {
            const IconComponent = categoryIconMap[category.name] || Car;
            
            return (
              <Card
                key={category._id}
                className="bg-white shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1 border-0 hover:border-black"
                onClick={() => handleCategorySelect(category._id)}
              >
                <CardContent className="p-4 sm:p-6">
                  <div className="text-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                      {category.image?.url ? (
                        <img
                          src={category.image.url}
                          alt={category.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 text-black" />
                      )}
                    </div>
                    
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                      {category.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4 line-clamp-2">
                      {category.description}
                    </p>
                    
                    <div className="bg-black text-white px-3 py-2 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium inline-flex items-center">
                      Select {category.name}
                      <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Categories List - Mobile */}
        <div className="sm:hidden space-y-3 mb-12">
          {categories.map((category) => {
            const IconComponent = categoryIconMap[category.name] || Car;
            
            return (
              <Card
                key={category._id}
                className="bg-white shadow-md transition-all duration-300 cursor-pointer active:scale-[0.98] border-0"
                onClick={() => handleCategorySelect(category._id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center flex-shrink-0">
                      {category.image?.url ? (
                        <img
                          src={category.image.url}
                          alt={category.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <IconComponent className="w-6 h-6 text-black" />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-bold text-gray-900 mb-1 truncate">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-500 line-clamp-1">
                        {category.description}
                      </p>
                    </div>

                    <div className="flex items-center flex-shrink-0">
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Google Play Buttons */}
        <div className="text-center mb-12">
          <a 
            href="https://play.google.com/store/apps/details?id=com.hiredriveuser.app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <img 
              src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" 
              alt="Get it on Google Play" 
              className="h-14 sm:h-16 hover:opacity-80 transition-opacity"
            />
          </a>
        </div>

        {/* Customer Ratings & Reviews Section */}
        <div className="mb-12">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-black mb-2">
              Customer Ratings & Reviews
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Hear what our riders say about Drivego's professional drivers and smooth rides.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Card className="bg-white shadow-md border-0">
              <CardContent className="p-6 sm:p-8">
                <div className="flex items-center mb-4">
                  {[1, 2, 3, 4].map((star) => (
                    <Star key={star} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className="ml-2 text-lg font-semibold text-gray-700">
                    {sampleReview.rating} / 5.0
                  </span>
                </div>

                <p className="text-gray-700 text-sm sm:text-base mb-4 leading-relaxed">
                  {sampleReview.review}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span className="font-medium">
                    {sampleReview.name} - {sampleReview.location}
                  </span>
                  <span>{sampleReview.date}</span>
                </div>
              </CardContent>
            </Card>

            <div className="text-center mt-6">
              <button className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                View All Reviews
              </button>
            </div>
          </div>
        </div>

        {/* Become Driver Section */}
        <div className="bg-black rounded-xl shadow-lg p-8 sm:p-12 mb-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Interested in Become Drivego Driver?
          </h2>
          <p className="text-gray-300 mb-6 text-sm sm:text-base">
            Don't hesitate and just click below button.
          </p>
          <a
            href="https://play.google.com/store/apps/details?id=com.hiredrive.app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Become Driver
            </button>
          </a>
          <div className="mt-6">
            <a 
              href="https://play.google.com/store/apps/details?id=com.hiredrive.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <img 
                src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" 
                alt="Get it on Google Play - Driver App" 
                className="h-12 sm:h-14 hover:opacity-80 transition-opacity"
              />
            </a>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-12">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-black">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-3">
            {faqs.map((faq, index) => (
              <Card key={index} className="bg-white shadow-sm border border-gray-200">
                <CardContent className="p-0">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-medium text-gray-900 text-sm sm:text-base pr-4">
                      {faq.question}
                    </span>
                    {expandedFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-gray-600 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-600 flex-shrink-0" />
                    )}
                  </button>
                  
                  {expandedFaq === index && (
                    <div className="px-4 sm:px-5 pb-4 sm:pb-5">
                      <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Footer Section */}
        <div className="bg-black w-screen -ml-[50vw] left-1/2 relative p-6 sm:p-8 lg:p-12">
          <div className="max-w-7xl mx-auto px-8 lg:px-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 text-white">
            {/* Drivego Column - Takes 2 columns */}
            <div className="lg:col-span-2">
              <h3 className="font-bold text-lg mb-4">Hire4Drive</h3>
              <div className="space-y-2 text-lg text-gray-300">
                <p>www.hire4drive.com</p>
                <p>1747, 1st Floor, 3rd Cross 3rd Block,Doctor Vishnuvardhan Road, Begur Rd, Vishwapriya Nagar, Bengaluru, Karnataka 560068</p>
                <p>support@hire4drive.com</p>
                <p>+91 88848 48098</p>
                
                {/* Social Media Links */}
                <div className="flex space-x-4 mt-4">
                  <a href="https://wa.me/918884848098" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors">
                    <i className="fab fa-whatsapp text-white"></i>
                  </a>
                  <a href="https://www.facebook.com/drivego2017/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                    <i className="fab fa-facebook-f text-white"></i>
                  </a>
                  <a href="https://www.instagram.com/DriveGo8884848098/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors">
                    <i className="fab fa-instagram text-white"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* Company Column */}
            <div>
              <h3 className="font-bold text-lg mb-4">Company</h3>
              <ul className="space-y-2 text-lg text-gray-300">
                <li><a href="/about-us" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="/contact-us" className="hover:text-white transition-colors">Contact us</a></li>
              
                <li><a href="/terms-and-conditions" className="hover:text-white transition-colors">Terms & Conditions</a></li>
                <li><a href="https://play.google.com/store/apps/details?id=com.hiredrive.app" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Partner Login</a></li>
                <li><a href="https://sites.google.com/view/hire4drive/home" target="_blank" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>

            {/* Our Services Column */}
            <div>
              <h3 className="font-bold text-lg mb-4">Our Services</h3>
              <ul className="space-y-2 text-lg text-gray-300">
                <li><a href="/hire-a-driver" className="hover:text-white transition-colors">Hire a Driver</a></li>
                <li><a href="/hourly-driver-service" className="hover:text-white transition-colors">Hourly driver service</a></li>
                <li><a href="/outstation-driver" className="hover:text-white transition-colors">Outstation driver</a></li>
                <li><a href="/private-car-drivers" className="hover:text-white transition-colors">Private car drivers</a></li>
                <li><a href="/driver-for-hire" className="hover:text-white transition-colors">Driver for hire</a></li>
                <li><a href="/chauffeur-service" className="hover:text-white transition-colors">Chauffeur service</a></li>
              </ul>
            </div>

            {/* Get In Touch Column */}
            <div>
              <h3 className="font-bold text-lg mb-4">Get In Touch</h3>
              <ul className="space-y-2 text-lg text-gray-300">
                <li><a href="/monthly-driver-service" className="hover:text-white transition-colors">Monthly driver service</a></li>
                <li><a href="/weekly-driver-service" className="hover:text-white transition-colors">Weekly driver service</a></li>
                <li><a href="/on-call-driver" className="hover:text-white transition-colors">On-call driver</a></li>
                <li><a href="/local-driver-hire" className="hover:text-white transition-colors">Local driver hire</a></li>
                <li><a href="/airport-transfer-driver" className="hover:text-white transition-colors">Airport transfer driver</a></li>
                <li><a href="/professional-drivers" className="hover:text-white transition-colors">Professional drivers</a></li>
              </ul>
            </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400 text-sm">
            © 2025 hire4drive.com All Rights Reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;