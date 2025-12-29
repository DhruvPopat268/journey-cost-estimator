import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Star, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Navbar } from '../components/Sidebar';
import axios from 'axios';

const Reviews = () => {
  const navigate = useNavigate();
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    const fetchRatings = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/user-rating/high-ratings?page=${currentPage}&limit=10`,
          { withCredentials: true }
        );
        if (res.data.success) {
          setRatings(res.data.data || []);
          setPagination(res.data.pagination);
        } else {
          setError('Failed to load reviews');
        }
      } catch (err) {
        console.error('Error fetching ratings:', err);
        setError('Something went wrong while loading reviews');
      } finally {
        setLoading(false);
      }
    };

    fetchRatings();
  }, [currentPage]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star 
        key={index} 
        className={`w-5 h-5 ${
          index < rating 
            ? 'text-yellow-400 fill-yellow-400' 
            : 'text-gray-300'
        }`} 
      />
    ));
  };

  const handleBack = () => {
    navigate('/');
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPagination = () => {
    if (!pagination || pagination.totalPages <= 1) return null;

    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(pagination.totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return (
      <div className="flex items-center justify-center space-x-2 mt-8">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {startPage > 1 && (
          <>
            <button
              onClick={() => handlePageChange(1)}
              className="px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
            >
              1
            </button>
            {startPage > 2 && <span className="px-2 text-gray-500">...</span>}
          </>
        )}

        {pages.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-3 py-2 rounded-lg border ${
              currentPage === page
                ? 'bg-black text-white border-black'
                : 'border-gray-300 hover:bg-gray-50'
            }`}
          >
            {page}
          </button>
        ))}

        {endPage < pagination.totalPages && (
          <>
            {endPage < pagination.totalPages - 1 && <span className="px-2 text-gray-500">...</span>}
            <button
              onClick={() => handlePageChange(pagination.totalPages)}
              className="px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
            >
              {pagination.totalPages}
            </button>
          </>
        )}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === pagination.totalPages}
          className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Navbar title="Customer Reviews" />
        <div className="flex justify-center items-center min-h-[200px] px-4">
          <div className="w-8 h-8 sm:w-10 sm:h-10 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Navbar title="Customer Reviews" />
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
      <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-6 pt-4 sm:pt-6 pb-6">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button
            onClick={handleBack}
            className="mr-4 p-2 hover:bg-white/50 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
              Customer Reviews
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              {pagination ? `${pagination.totalCount} reviews from our satisfied customers` : 'Loading reviews...'}
            </p>
          </div>
        </div>

        {/* Reviews List */}
        {ratings.length > 0 ? (
          <div className="space-y-4">
            {ratings.map((rating) => (
              <Card key={rating._id} className="bg-white shadow-md border-0">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex items-center mb-4">
                    {renderStars(rating.rating)}
                    <span className="ml-2 text-lg font-semibold text-gray-700">
                      {rating.rating} / 5.0
                    </span>
                  </div>

                  <p className="text-gray-700 text-sm sm:text-base mb-4 leading-relaxed">
                    {rating.comment}
                  </p>

                  {/* Feedback Tags */}
                  {(rating.driverFeedback?.length > 0 || rating.cabFeedback?.length > 0) && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {rating.driverFeedback?.map((feedback, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                          >
                            {feedback}
                          </span>
                        ))}
                        {rating.cabFeedback?.map((feedback, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                          >
                            {feedback}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div>
                      <span className="font-medium">
                        {rating.userId?.name}
                      </span>
                      {rating.driverId?.personalInformation?.fullName && (
                        <span className="text-gray-500">
                          {' '} • Driver: {rating.driverId.personalInformation.fullName}
                        </span>
                      )}
                    </div>
                    <span>{formatDate(rating.createdAt)}</span>
                  </div>

                  {rating.wouldChooseAgain && (
                    <div className="mt-3 flex items-center text-sm text-green-600">
                      <span className="font-medium">✓ Would choose Hire4Drive again</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
            
            {/* Pagination Controls */}
            {renderPagination()}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">
              <Star className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium mb-2">No reviews yet</h3>
              <p className="text-sm">Be the first to leave a review!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviews;