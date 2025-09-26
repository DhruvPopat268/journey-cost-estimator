import React, { useState, useEffect } from 'react';
import { ArrowLeft, Star, Loader2 } from 'lucide-react';
import axios from 'axios';
import { Navbar } from '@/components/Sidebar';

const AllBookedServices = ({ onBack }) => {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRides();
  }, []);

  const fetchRides = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("RiderToken");

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/rides/my-rides`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        // flatten rideInfo into root
        const formatted = response.data.rides.map((ride) => ({
          ...ride.rideInfo,   // spread nested rideInfo fields
          ...ride,            // keep root fields (overrides if duplicate keys)
        }));

        setRides(formatted);
      } else {
        throw new Error("API returned error");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatTime = (timeString, dateString) => {
    if (timeString) {
      // If time is in HH:MM format
      return timeString;
    }
    // Fallback to extracting time from date
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'booked':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'ongoing':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDestination = (fromLocation, toLocation) => {
    const from = fromLocation
      ? fromLocation.charAt(0).toUpperCase() + fromLocation.slice(1)
      : "Unknown";

    if (!toLocation || toLocation.trim() === "") {
      return from;
    }

    const to =
      toLocation.charAt(0).toUpperCase() + toLocation.slice(1);

    return `${from} to ${to}`;
  };


  if (loading) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-md mx-auto">


          <div className="flex items-center justify-center py-12">
            <Loader2 className="animate-spin mr-2" size={24} />
            <span>Loading your rides...</span>
          </div>
        </div>
      </div>
    );
  }



  return (
    <div className="px-[6px] pb-[6px] bg-gray-50 min-h-screen">
      <Navbar title="All Booked Services" />

      <div className="max-w-md mx-auto mt-4">


        {rides.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No rides found</h3>
            <p className="text-gray-500">You haven't booked any rides yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {rides.map(ride => (
              <div key={ride._id} className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-sm">
                    {formatDestination(ride.fromLocation?.address, ride.toLocation?.address)}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ride.status)}`}>
                    {ride.status}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                  <span>
                    {formatDate(ride.selectedDate || ride.createdAt)} • {formatTime(ride.selectedTime, ride.createdAt)}
                  </span>
                  <span className="font-semibold text-gray-800">₹{ride.totalPayable}</span>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="space-y-1">
                    <div>Category: {ride.selectedCategory}</div>
                    <div>Car Type: {ride.carType?.charAt(0).toUpperCase() + ride.carType?.slice(1)}</div>
                    {ride.subcategoryName && (
                      <div>Type: {ride.subcategoryName}</div>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="mb-1">Payment: {ride.paymentType?.toUpperCase()}</div>
                    {ride.selectedUsage && (
                      <div>Usage: {ride.selectedUsage} hrs</div>
                    )}
                  </div>
                </div>

                {ride.notes && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-xs text-gray-600">
                      <span className="font-medium">Notes:</span> {ride.notes}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {rides.length > 0 && (
          <div className="text-center mt-6">
            <button
              onClick={fetchRides}
              className="text-blue-600 font-medium text-sm hover:text-blue-800"
            >
              Refresh Rides
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBookedServices;