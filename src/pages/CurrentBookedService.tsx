import React, { useEffect, useState } from "react";
import axios from "axios";
import { ArrowLeft, Phone, Clock, Eye, X, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Navbar } from '../components/Sidebar';


interface Driver {
  name: string;
  phone?: string;
  vehicle: string;
  estimatedArrival: string;
}

interface Booking {
  _id: string;
  riderId?: string;
  riderMobile?: string;
  subcategoryName?: string;
  carType?: string;
  status: string;
  fromLocation: string;
  toLocation?: string;
  totalPayable: number;
  paymentType?: string;
  driver?: Driver;
  selectedDate?: string;
  selectedTime?: string;
  selectedUsage?: string;
  createdAt?: string;
  updatedAt?: string;
  transmissionType?: string;
  includeInsurance?: boolean;
  notes?: string;
  selectedCategory?: string;
  categoryId?: string;
}


interface CurrentBookedServiceProps {
  onBack: () => void;
  onViewDetails?: (booking: Booking) => void;
}

const CurrentBookedService: React.FC<CurrentBookedServiceProps> = ({ onBack, onViewDetails }) => {
  const [currentBookings, setCurrentBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("RiderToken");
      if (!token) {
        console.error("No token found in localStorage");
        setLoading(false);
        return;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/rides/booked/my-rides`,
        {}, // no body required
        {
          headers: {
            Authorization: `Bearer ${token}`, // 👈 send token in header
          },
        }
      );

      if (response.data && response.data.rides) {
        const formatted = response.data.rides.map((ride: any) => ({
          _id: ride._id,
          riderId: ride.riderId,
          riderMobile: ride.riderMobile,
          status: ride.status,
          totalPayable: ride.totalPayable,
          paymentType: ride.paymentType,
          createdAt: ride.createdAt,
          updatedAt: ride.updatedAt,
          // flatten rideInfo
          ...ride.rideInfo,
          driver: ride.driver || undefined,
        }));
        setCurrentBookings(formatted);
      } else {
        setCurrentBookings([]);
      }

    } catch (error) {
      console.error("Error fetching rides:", error);
      setCurrentBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId: string) => {
    try {
      const confirmed = window.confirm("Are you sure you want to cancel this booking?");
      if (!confirmed) return;

      const token = localStorage.getItem("RiderToken");

      // ✅ Send bookingId in body instead of URL
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/rides/booking/cancel`,
        { bookingId }, // sending in body
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        fetchBookings(); // Refresh bookings
        alert("Booking cancelled successfully");
      }
    } catch (error) {
      console.error("Error cancelling booking:", error);
      alert("Error cancelling booking");
    }
  };


  const handleViewDetails = (booking: Booking) => {
    // Use navigate to go to the detail view
    navigate(`/detailView/${booking._id}`);

    // Call the parent callback if provided
    if (onViewDetails) {
      onViewDetails(booking);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar title="Current Booked Service" className="bg-black" />

      {/* Add padding-top to push content below fixed navbar */}
      <div className="pt-4 p-6">
        <div className="max-w-md mx-auto">
          {loading ? (
            <div className="text-center py-12">
              <Clock size={48} className="mx-auto text-gray-400 mb-4 animate-spin" />
              <p className="text-gray-500">Loading bookings...</p>
            </div>
          ) : currentBookings.length > 0 ? (
            <div className="space-y-4">
              {currentBookings.map((booking) => (
                <div
                  key={booking._id}
                  className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-lg">
                      {booking.categoryName} - {booking.subcategoryName || booking.carType}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${booking.status === "BOOKED"
                        ? "bg-blue-100 text-blue-800"
                        : booking.status === "CONFIRMED"
                          ? "bg-green-100 text-green-800"
                          : booking.status === "CANCELLED"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                    >
                      {booking.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {/* Pickup Location */}
                    <div className="flex items-start">
                      <div className="w-3 h-3 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                      <div>
                        <div className="font-medium text-sm">Pickup Location</div>
                        <div className="text-gray-600 text-sm">{booking.fromLocation?.address}</div>
                      </div>
                    </div>

                    {/* Drop Location */}
                    {booking.toLocation && (
                      <div className="flex items-start">
                        <div className="w-3 h-3 bg-red-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                        <div>
                          <div className="font-medium text-sm">Drop Location</div>
                          <div className="text-gray-600 text-sm">{booking.toLocation?.address}</div>
                        </div>
                      </div>
                    )}

                     {/* Driver Category */}
                    {booking.selectedCategory && (
                      <div className="flex items-start">
                        <div className="w-3 h-3 bg-orange-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                        <div>
                          <div className="font-medium text-sm">Driver Category</div>
                          <div className="text-gray-600 text-sm">{booking.selectedCategory}</div>
                        </div>
                      </div>
                    )}

                    {/* Usage */}
                    {booking.selectedUsage && (
                      <div className="flex items-start">
                        <div className="w-3 h-3 bg-purple-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                        <div>
                          <div className="font-medium text-sm">Usage</div>
                          <div className="text-gray-600 text-sm">
                            {booking.selectedUsage}{" "}
                            {booking.subcategoryName === "Hourly" ? "hr" : "km"}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Date */}
                    {booking.selectedDate && (
                      <div className="flex items-start">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                        <div>
                          <div className="font-medium text-sm">{booking.subcategoryName?.toLowerCase().includes('weekly') || booking.subcategoryName?.toLowerCase().includes('monthly') ? 'Start Date' : 'Date'}</div>
                          <div className="text-gray-600 text-sm">
                            {new Date(booking.selectedDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Time */}
                    {booking.selectedTime && (
                      <div className="flex items-start">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                        <div>
                          <div className="font-medium text-sm">{booking.subcategoryName?.toLowerCase().includes('weekly') || booking.subcategoryName?.toLowerCase().includes('monthly') ? 'Start Time' : 'Time'}</div>
                          <div className="text-gray-600 text-sm">{booking.selectedTime}</div>
                        </div>
                      </div>
                    )}
                  </div>



                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-2">
                      {/* 👇 conditionally show driver only if exists */}
                      {booking.driver ? (
                        <span className="text-sm text-gray-600">
                          Driver: {booking.driver.name}
                        </span>
                      ) : (
                        <span className="text-sm text-gray-500 italic">
                          Driver not assigned yet
                        </span>
                      )}

                      <div className="text-right">
                        <span className="font-semibold text-lg">₹{booking.totalPayable}</span>
                        {/* Payment Type Display */}
                        {booking.paymentType && (
                          <div className="text-xs text-gray-500 capitalize flex items-center justify-end mt-1">
                            <CreditCard size={12} className="mr-1" />
                            {booking.paymentType}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* 👇 Show vehicle & call button only if driver exists */}
                    {booking.driver && (
                      <>
                        <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
                          <span>Vehicle: {booking.driver.vehicle}</span>
                          <span>ETA: {booking.driver.estimatedArrival}</span>
                        </div>
                        <button className="w-full mb-3 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
                          <Phone size={16} className="inline mr-2" />
                          Call Driver
                        </button>
                      </>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-3 mt-4">
                      <button
                        onClick={() => handleViewDetails(booking)}
                        className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                      >
                        <Eye size={16} className="mr-2" />
                        View
                      </button>
                      <button
                        onClick={() => handleCancelBooking(booking._id)}
                        className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center"
                      >
                        <X size={16} className="mr-2" />
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Clock size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                No Active Bookings
              </h3>
              <p className="text-gray-500">You don't have any current bookings.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

};

export default CurrentBookedService;