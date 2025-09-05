import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useNavigate, useLocation } from 'react-router-dom';

export default function OtpLoginFlow() {
  const [step, setStep] = useState("login");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const location = useLocation();
  const bookingData = location.state;

  const loginForm = useForm({
    defaultValues: {
      mobile: "",
      otp: ""
    }
  });
  const profileForm = useForm({
    defaultValues: {
      name: "",
      gender: "",
      email: "",
      referralCodeUsed: ""
    }
  });

  const navigate = useNavigate();

  // extract referral code from URL if present
  useEffect(() => {
    const url = window.location.href;
    const match = url.match(/\/ref\/([^/]+)/);
    if (match && match[1]) {
      profileForm.setValue("referralCodeUsed", match[1]); // ✅ set value in form
    }
  }, [profileForm]);


  // Countdown timer for resend OTP
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  // Send OTP
  const handleSendOtp = async (mobile) => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/rider-auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile }),
      });
      const result = await res.json();
      if (result.success) {
        setMobileNumber(mobile);
        setOtpSent(true);
        setCountdown(30); // 30 second countdown
        return true;
      } else {
        alert(result.message || "Failed to send OTP");
        return false;
      }
    } catch (err) {
      console.error("Error sending OTP:", err);
      alert("Server error while sending OTP");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Handle login form submission
  const handleLogin = async (data) => {
    if (!otpSent) {
      const otpSent = await handleSendOtp(data.mobile);
      if (!otpSent) return;
      return;
    }

    if (!data.otp) {
      alert("Please enter the OTP");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/rider-auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile: data.mobile, otp: data.otp }),
      });

      const result = await res.json();
      if (result.success) {
        // ✅ Save JWT token in localStorage
        localStorage.setItem("RiderToken", result.token);
        localStorage.setItem("RiderMobile", result.rider.mobile || "");

        if (result.isNew) {
          setStep("profile");
        } else {
          setShowSuccess(true);
        }
      } else {
        alert(result.message || "Invalid OTP");
      }
    } catch (err) {
      console.error("Error verifying OTP:", err);
      alert("Server error while verifying OTP");
    }
    setLoading(false);
  };

  // Resend OTP
  const handleResendOtp = async () => {
    if (countdown > 0) return;
    await handleSendOtp(mobileNumber);
  };

  // Save profile
  const handleSaveProfile = async (data) => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/rider-auth/save-profile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, mobile: mobileNumber }),
      });
      const result = await res.json();
      if (result.success) {
        setShowSuccess(true);
      } else {
        alert(result.message || "Failed to save profile");
      }
    } catch (err) {
      console.error("Error saving profile:", err);
      alert("Server error while saving profile");
    }
    setLoading(false);
  };

  const handleStartOver = () => {
    setStep("login");
    setMobileNumber("");
    setOtpSent(false);
    setShowSuccess(false);
    setCountdown(0);
    loginForm.reset();
    profileForm.reset();
  };

  const handleChangeNumber = () => {
    setOtpSent(false);
    setCountdown(0);
    loginForm.setValue("otp", "");
    loginForm.clearErrors("otp");
  };


  useEffect(() => {
    if (showSuccess) {
      // Check if booking data exists in localStorage (Redux Persist)
      try {
        const persistedState = localStorage.getItem('persist:root');
        if (persistedState) {
          const parsedState = JSON.parse(persistedState);
          if (parsedState.booking) {
            const bookingData = JSON.parse(parsedState.booking);
            // Check if booking object has meaningful data and valid subcategoryId
            if (bookingData && Object.keys(bookingData).length > 0 && bookingData.subcategoryId !== "") {
              navigate("/booking-step2", { state: bookingData });
              return;
            }
          }
        }
      } catch (error) {
        console.error("Error parsing localStorage booking data:", error);
      }

      // If no booking data found or subcategoryId is null, navigate to home
      navigate("/");
    }
  }, [showSuccess, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-800">
            {step === "login" && "Login"}
            {step === "profile" && "Complete Your Profile"}
          </CardTitle>
          <p className="text-gray-600 mt-2">
            {step === "login" && !otpSent && "Enter your mobile number to get started"}
            {step === "login" && otpSent && "Enter the 6-digit code sent to your phone"}
            {step === "profile" && "Tell us a bit about yourself"}
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          {step === "login" && (
            <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
              {/* Mobile Number Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile Number
                </label>
                <Input
                  type="tel"

                  className="text-lg"
                  disabled={otpSent}
                  {...loginForm.register("mobile", {
                    required: "Mobile number is required",
                    minLength: {
                      value: 10,
                      message: "Mobile number must be at least 10 digits"
                    }
                  })}
                />
                {loginForm.formState.errors.mobile && (
                  <p className="text-red-500 text-sm mt-1">
                    {loginForm.formState.errors.mobile.message}
                  </p>
                )}
                {otpSent && (
                  <Button
                    type="button"
                    variant="link"
                    onClick={handleChangeNumber}
                    className="p-0 h-auto text-sm text-blue-600 mt-1"
                  >
                    Change number?
                  </Button>
                )}
              </div>

              {/* OTP Input - Shows after OTP is sent */}
              {otpSent && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter OTP
                  </label>
                  <Input
                    type="text"
                    placeholder="123456"
                    className="text-lg text-center tracking-wider"
                    maxLength={6}
                    {...loginForm.register("otp", {
                      required: "OTP is required",
                      pattern: {
                        value: /^\d{6}$/,
                        message: "OTP must be exactly 6 digits"
                      }
                    })}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "").slice(0, 6);
                      e.target.value = value;
                      loginForm.setValue("otp", value);
                    }}
                  />
                  {loginForm.formState.errors.otp && (
                    <p className="text-red-500 text-sm mt-1">
                      {loginForm.formState.errors.otp.message}
                    </p>
                  )}

                  {/* Resend OTP */}
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-sm text-gray-600">
                      Didn't receive code?
                    </p>
                    <Button
                      type="button"
                      variant="link"
                      onClick={handleResendOtp}
                      disabled={countdown > 0}
                      className="p-0 h-auto text-sm"
                    >
                      {countdown > 0 ? `Resend in ${countdown}s` : "Resend OTP"}
                    </Button>
                  </div>
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className={`w-full ${otpSent
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-blue-600 hover:bg-blue-700"
                  }`}
              >
                {loading
                  ? (otpSent ? "Verifying..." : "Sending...")
                  : (otpSent ? "Verify & Login" : "Send OTP")
                }
              </Button>
            </form>
          )}

          {step === "profile" && (
            <form onSubmit={profileForm.handleSubmit(handleSaveProfile)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <Input
                  type="text"
                  placeholder="John Doe"
                  {...profileForm.register("name", {
                    required: "Name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters"
                    }
                  })}
                />
                {profileForm.formState.errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {profileForm.formState.errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender *
                </label>
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  {...profileForm.register("gender", {
                    required: "Gender is required"
                  })}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {profileForm.formState.errors.gender && (
                  <p className="text-red-500 text-sm mt-1">
                    {profileForm.formState.errors.gender.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email (Optional)
                </label>
                <Input
                  type="email"
                  placeholder="john@example.com"
                  {...profileForm.register("email", {
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                />
                {profileForm.formState.errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {profileForm.formState.errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Referral Code (Optional)
                </label>
                <Input
                  type="text"
                  placeholder="Enter referral code"
                  {...profileForm.register("referralCodeUsed")}
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                {loading ? "Saving..." : "Save Profile"}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}