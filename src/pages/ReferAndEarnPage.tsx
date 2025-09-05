import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Copy, Share2, CheckCircle, ArrowLeft, Calendar, TrendingUp, TrendingDown } from 'lucide-react';
import { Navbar } from '@/components/Sidebar';

const ReferAndEarnPage = () => {
    const [copied, setCopied] = useState(false);
    const [activeModal, setActiveModal] = useState(null);
    const [userData, setUserData] = useState(null); // dynamic user data
    const [earningsHistory, setEarningsHistory] = useState([]);
    const [allReferrals, setAllReferrals] = useState([]);

    // ✅ Fetch rider + referral data
    useEffect(() => {
        const token = localStorage.getItem("RiderToken");
        if (!token) return;

        const fetchData = async () => {
            try {
                const res = await axios.post(
                    `${import.meta.env.VITE_API_URL}/api/rider-auth/find-rider`,
                    {},
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                if (res.data?.success && res.data.rider) {
                    const rider = res.data.rider;

                    setUserData({
                        referralCode: rider.referralCode,
                        referralLink: `${window.location.origin}/ref/${rider.referralCode}`,
                        totalEarnings: rider.referralEarning?.totalEarnings || 0,
                        totalReferrals: rider.referrals?.length || 0,
                        thisMonthEarnings: rider.referralEarning?.currentBalance || 0,
                    });

                    // If backend sends these
                    setEarningsHistory(rider.earningsHistory || []);
                    setAllReferrals(rider.referrals || []);
                }
            } catch (err) {
                console.error("Error fetching referral data:", err);
            }
        };

        fetchData();
    }, []);

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const shareReferralLink = async () => {
        if (!userData) return;
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Join RideApp and get 20% off!',
                    text: 'Use my referral code to get amazing discounts on your rides!',
                    url: userData.referralLink,
                });
            } catch {
                copyToClipboard(userData.referralLink);
            }
        } else {
            copyToClipboard(userData.referralLink);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    if (!userData) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Loading...</p>
            </div>
        );
    }

    // --- Earnings History Modal ---
    const EarningsHistoryModal = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl w-full max-w-md max-h-[80vh] overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                        <button
                            onClick={() => setActiveModal(null)}
                            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5 text-gray-600" />
                        </button>
                        <h2 className="text-lg font-bold text-gray-800">Earnings History</h2>
                    </div>
                    <div className="text-lg font-bold text-green-600">{userData.totalEarnings}</div>
                </div>

                <div className="overflow-y-auto max-h-96 p-4">
                    <div className="space-y-3">
                        {earningsHistory.length === 0 ? (
                            <p className="text-gray-500 text-sm">No earnings yet</p>
                        ) : (
                            earningsHistory.map((transaction) => (
                                <div
                                    key={transaction._id}
                                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                                >
                                    <div className="flex items-center space-x-3">
                                        <div
                                            className={`p-2 rounded-full ${transaction.type === 'credit'
                                                ? 'bg-green-100 text-green-600'
                                                : 'bg-red-100 text-red-600'
                                                }`}
                                        >
                                            {transaction.type === 'credit' ? (
                                                <TrendingUp className="w-4 h-4" />
                                            ) : (
                                                <TrendingDown className="w-4 h-4" />
                                            )}
                                        </div>
                                        <div>
                                            <div className="font-semibold text-sm text-gray-800">
                                                {transaction.description}
                                            </div>
                                            <div className="text-xs text-gray-500 flex items-center space-x-1">
                                                <Calendar className="w-3 h-3" />
                                                <span>{formatDate(transaction.date)}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className={`font-bold text-sm ${transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                                            }`}
                                    >
                                        {transaction.type === 'credit' ? '+' : '-'}
                                        {Math.abs(transaction.amount)}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

    // --- Referrals List Modal ---
    const ReferralsListModal = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl w-full max-w-md max-h-[80vh] overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                        <button
                            onClick={() => setActiveModal(null)}
                            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5 text-gray-600" />
                        </button>
                        <h2 className="text-lg font-bold text-gray-800">All Referrals</h2>
                    </div>
                    <div className="text-lg font-bold text-blue-600">{userData.totalReferrals}</div>
                </div>

                <div className="overflow-y-auto max-h-96 p-4">
                    <div className="space-y-3">
                        {allReferrals.length === 0 ? (
                            <p className="text-gray-500 text-sm">No referrals yet</p>
                        ) : (
                            allReferrals.map((referral) => (
                                <div
                                    key={referral._id}
                                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                                >
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                            {referral.name?.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div>
                                            <div className="font-semibold text-sm text-gray-800">
                                                {referral.name}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                Joined {formatDate(referral.createdAt)} • {referral.rides || 0} rides
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-green-600 font-bold text-sm">
                                            {referral.totalEarnings || 0}
                                        </div>
                                        <div
                                            className={`text-xs px-2 py-1 rounded-full ${referral.status === 'active'
                                                ? 'bg-green-100 text-green-600'
                                                : 'bg-gray-100 text-gray-600'
                                                }`}
                                        >
                                            {referral.status || 'active'}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-white text-gray-800 p-4">
            <div className="w-full max-w-md mx-auto">
                <Navbar title="Refer & Earn" />

                {/* Stats Cards */}
                <div className="grid grid-cols-3 gap-3 mb-6 mt-4">
                    <button
                        onClick={() => setActiveModal('earnings')}
                        className="bg-gray-50 rounded-xl p-4 border border-gray-200 text-center shadow-sm hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                        <div className="text-lg font-bold text-green-600">{userData.totalEarnings}</div>
                        <div className="text-gray-500 text-xs">Total Earnings</div>
                    </button>
                    <button
                        onClick={() => setActiveModal('referrals')}
                        className="bg-gray-50 rounded-xl p-4 border border-gray-200 text-center shadow-sm hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                        <div className="text-lg font-bold text-blue-600">{userData.totalReferrals}</div>
                        <div className="text-gray-500 text-xs">Referrals</div>
                    </button>
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 text-center shadow-sm">
                        <div className="text-lg font-bold text-purple-600">{userData.thisMonthEarnings}</div>
                        <div className="text-gray-500 text-xs">Current Balance</div>
                    </div>
                </div>

                {/* Referral Code Section */}
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 mb-6 shadow-sm">
                    <h3 className="text-lg font-bold mb-4 text-center text-gray-800">Your Referral Code</h3>
                    <div className="mb-4">
                        <div className="flex items-center space-x-2">
                            <div className="flex-1 bg-gray-100 rounded-lg p-3 border border-gray-300">
                                <div className="font-mono text-lg font-bold text-center text-gray-800">
                                    {userData.referralCode}
                                </div>
                            </div>
                            <button
                                onClick={() => copyToClipboard(userData.referralCode)}
                                className="bg-gradient-to-r from-purple-500 to-blue-500 p-3 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-300 text-white"
                            >
                                <Copy className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                    <button
                        onClick={shareReferralLink}
                        className="w-full bg-gradient-to-r from-green-500 to-teal-500 py-3 rounded-lg hover:from-green-600 hover:to-teal-600 transition-all duration-300 font-semibold flex items-center justify-center space-x-2 text-white"
                    >
                        <Share2 className="w-5 h-5" />
                        <span>Share with Friends</span>
                    </button>
                    {copied && (
                        <div className="mt-3 text-green-600 flex items-center justify-center space-x-2 text-sm">
                            <CheckCircle className="w-4 h-4" />
                            <span>Copied!</span>
                        </div>
                    )}
                </div>

                {/* ✅ How it Works Section */}
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 mb-4 shadow-sm">
                    <h3 className="text-lg font-bold mb-4 text-center text-gray-800">How It Works</h3>
                    <div className="space-y-3">
                        <div className="flex items-center space-x-3 text-center">
                            <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
                            <span className="text-sm text-gray-700 ">Share your code with friends</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
                            <span className="text-sm text-gray-700">They sign up using your code</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
                            <span className="text-sm text-gray-700">Earn 20% on every ride they take</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals */}
            {activeModal === 'earnings' && <EarningsHistoryModal />}
            {activeModal === 'referrals' && <ReferralsListModal />}
        </div>
    );

};

export default ReferAndEarnPage;
