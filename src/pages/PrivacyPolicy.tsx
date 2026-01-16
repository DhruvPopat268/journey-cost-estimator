import React, { useEffect, useState } from "react";

const PrivacyPolicy = () => {
  const [year, setYear] = useState("");

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <>
    <style>{`
        body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;margin:0;padding:0;background:#f5f5f5;color:#333;line-height:1.6}
        .container{max-width:1300px;margin:0 auto;padding:40px 60px;background:#fff;border-left:1px solid #ddd;border-right:1px solid #ddd;min-height:100vh;box-shadow:0 0 30px rgba(0,0,0,0.1)}
        h1{color:#0066cc;margin-top:0;margin-bottom:12px;font-size:50px;font-weight:600;text-align:center;padding-bottom:20px;border-bottom:2px solid #eee}
        h2{color:#0066cc;margin-top:40px;margin-bottom:16px;font-size:35px;font-weight:600}
        h3{color:#0066cc;margin-top:24px;margin-bottom:12px;font-size:25px;font-weight:600}
        p{margin:12px 0;color:#333;font-size:20px}
        ul{margin:12px 0;padding-left:28px;color:#333}
        li{margin:6px 0;font-size:20px}
        strong{font-weight:600;color:#000}
        .section{margin-bottom:24px}
        .footer-text{margin-top:40px;color:#666;font-size:20px;text-align:center;padding-top:20px;border-top:2px solid #eee}
        .note{background:#fff3cd;border-left:4px solid #ffc107;padding:14px 16px;margin-top:24px;border-radius:4px;color:#856404;font-size:18px}
      `}</style>

      <div className="container">

        <h1>Privacy Policy – Hire4Drive</h1>
        <p><strong>Last Updated:</strong> 16/01/2026</p>

        <div className="section">
          <p>
            Welcome to <strong>Hire4Drive</strong> ("Company", "we", "us", or "our").
            We value your trust and are committed to handling your personal information
            with transparency and care. This Privacy Policy explains how we collect,
            use, disclose, and protect your information when you use our mobile
            application ("App") and related services.
          </p>
          <p>By downloading, accessing, or using the App, you agree to the practices described in this policy.</p>
        </div>

        <h2>1. Information We Collect</h2>
        <p>We collect different types of information to provide and improve the Hire4Drive service:</p>

        <h3>A. Personal Identification Information</h3>
        <ul>
          <li>Name</li>
          <li>Email address</li>
          <li>Phone number</li>
          <li>Profile photo</li>
          <li>Date of birth</li>
          <li>Gender </li>
          <li>KYC documents (Aadhaar, Driving license, ID proofs)</li>
        </ul>

        <h3>B. Driver & Owner Registration Information</h3>
        <ul>
          <li>Driver license details</li>
          <li>Driver verification photos</li>
          <li>Owner vehicle documents</li>
          <li>RC book, insurance, permit details</li>
          <li>Owner with Driver team details</li>
        </ul>

        <h3>C. Location Information</h3>
        <p>We collect real-time location data to:</p>
        <ul>
          <li>Show available drivers</li>
          <li>Track rides</li>
          <li>Assign bookings efficiently</li>
          <li>Ensure user safety</li>
          <li>Enable navigation & route calculation</li>
        </ul>
        <p>Drivers may be required to keep background location enabled while active.</p>

        <h3>D. Ride & Booking Information</h3>
        <ul>
          <li>Pickup & drop addresses</li>
          <li>Trip distance, duration, and route</li>
          <li>Ride schedule & booking activity</li>
          <li>Ride status (confirmed, on-going, completed, cancelled)</li>
        </ul>

        <h3>E. Payment & Wallet Information</h3>
        <ul>
          <li>Online payment details (via third-party providers)</li>
          <li>Wallet balance & earnings</li>
          <li>Withdrawal requests</li>
          <li>Subscription payments</li>
          <li>Coupons & discounts</li>
        </ul>

        <h3>F. Device & Usage Data</h3>
        <ul>
          <li>Device model & OS version</li>
          <li>IP address</li>
          <li>Crash reports</li>
          <li>App usage statistics</         li>
          <li>Notification interaction data</li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <p>We use the collected data to:</p>
        <ul>
          <li>Register users as Driver, Owner, or Owner with Driver</li>
          <li>Provide ride booking and rental services</li>
          <li>Assign and manage rides</li>
          <li>Calculate fares and trip estimates</li>
          <li>Manage driver wallet and subscriptions</li>
          <li>Process withdrawals & earnings</li>
          <li>Improve app experience</li>
          <li>Prevent fraud and enhance security</li>
          <li>Send notifications & alerts</li>
          <li>Comply with legal requirements</li>
        </ul>

        <h2>3. How We Share Your Information</h2>
        <p>Your data is never sold. We share information only when necessary:</p>

        <h3>A. Between Users (Driver ↔ Customer)</h3>
        <p>To complete a ride, certain information is visible:</p>
        <ul>
          <li>Driver: name, photo, vehicle details, rating, phone (masked), live location</li>
          <li>Customer: name, phone (masked), pickup & drop details</li>
        </ul>

        <h3>B. With Service Providers</h3>
        <ul>
          <li>Payment gateways</li>
          <li>SMS/Email providers</li>
          <li>Analytics & crash reporting tools</li>
          <li>Cloud storage providers</li>
        </ul>

        <h3>C. For Legal & Compliance</h3>
        <ul>
          <li>To comply with law enforcement</li>
          <li>To protect user safety</li>
          <li>To prevent fraud or misuse</li>
        </ul>

        <h2>4. Driver Wallet, Earnings & Subscription</h2>
        <ul>
          <li>Earnings auto-added to wallet</li>
          <li>Admin reviews withdrawal requests</li>
          <li>Admin marks payout as complete</li>
          <li>Subscription plan required to accept rides</li>
        </ul>

        <h2>5. Data Retention</h2>
        <p>We retain data only as long as necessary for:</p>
        <ul>
          <li>Legal compliance</li>
          <li>Fraud prevention</li>
          <li>Financial & tax records</li>
          <li>Ride history & disputes</li>
        </ul>

        <h2>6. Security Measures</h2>
        <ul>
          <li>Encrypted communication</li>
          <li>Secure cloud storage</li>
          <li>Access controls</li>
          <li>Routine testing</li>
        </ul>

        <h2>7. Cookies & Tracking</h2>
        <p>Used for analytics, crash diagnostics, and UX improvements.</p>

        <h2>8. User Rights & Controls</h2>
        <ul>
          <li>Update profile & documents</li>
          <li>Change privacy settings</li>
          <li>Control GPS/location access</li>
          <li>Request account deletion</li>
          <li>Access ride history & earnings</li>
        </ul>

        <h2>9. Account Deletion Process</h2>
        <ul>
          <li>Request via email or in-app</li>
          <li>Identity verification required</li>
          <li>Completion within 7–30 days</li>
          <li>Some records retained for compliance</li>
        </ul>

        <h2>10. Children’s Privacy</h2>
        <p>Not intended for individuals under 18.</p>

        <h2>11. International Data Transfers</h2>
        <p>Data may be stored on servers in different regions.</p>

        <h2>12. Changes to This Policy</h2>
        <p>Updates will be posted with a new “Last Updated” date.</p>

        {/* ----------------------------
            REFUND & CANCELLATION POLICY
        ----------------------------- */}

        <h2>13. Refund & Cancellation Policy</h2>
        <p>Hire4Drive follows the guidelines below:</p>

        <h3>A. Customer Cancellations</h3>
        <ul>
          <li><strong>Before driver assignment:</strong> Full refund.</li>
          <li><strong>After driver assignment:</strong> Cancellation charges may apply.</li>
          <li><strong>No-shows:</strong> No-show fee may apply.</li>
        </ul>

        <h3>B. Driver Cancellations</h3>
        <ul>
          <li>Unnecessary cancellations may lead to penalties.</li>
          <li>Emergencies or breakdowns must be reported.</li>
        </ul>

        <h3>C. Refund Process</h3>
        <ul>
          <li>Refunds processed within <strong>3–14 business days</strong>.</li>
          <li>Admin review required.</li>
          <li>Users may submit disputes with booking ID.</li>
        </ul>

        <h3>D. Partial Refunds</h3>
        <ul>
          <li>Granted for service failures or route changes.</li>
          <li>Promo credits refunded to wallet.</li>
        </ul>

        <h3>E. Exceptional Cases</h3>
        <p>Admin may review special situations individually.</p>

        {/* ----------------------------
            DRIVER GUIDELINES & SAFETY
        ----------------------------- */}

        <h2>14. Driver Guidelines & Safety Policy</h2>

        <h3>A. Driver Eligibility</h3>
        <ul>
          <li>Minimum age 21 or per local law</li>
          <li>Valid ID, license, RC, insurance</li>
          <li>Background checks may apply</li>
        </ul>

        <h3>B. Vehicle Standards</h3>
        <ul>
          <li>Clean and roadworthy</li>
          <li>Valid insurance & registration</li>
          <li>Routine maintenance required</li>
        </ul>

        <h3>C. Driver Conduct</h3>
        <ul>
          <li>Professional behavior required</li>
          <li>No distracting mobile use</li>
          <li>No abusive or illegal behavior</li>
        </ul>

        <h3>D. Safety During Rides</h3>
        <ul>
          <li>Follow all traffic laws</li>
          <li>Seat belts required</li>
          <li>Verify passengers if needed</li>
          <li>Report emergencies immediately</li>
        </ul>

        <h3>E. Handling Complaints</h3>
        <ul>
          <li>Report incidents in app</li>
          <li>Admin may suspend pending investigation</li>
        </ul>

        <h3>F. Prohibited Activities</h3>
        <ul>
          <li>No illegal goods</li>
          <li>No harassment or exploitation</li>
        </ul>

        <h3>G. Ratings & Performance</h3>
        <ul>
          <li>Low ratings may result in penalties</li>
          <li>High performers may get benefits</li>
        </ul>

        <h3>H. App Safety Features</h3>
        <ul>
          <li>Live GPS tracking</li>
          <li>SOS/emergency options</li>
          <li>Trip sharing</li>
          <li>In-app reporting</li>
        </ul>

        <h3>I. Training</h3>
        <ul>
          <li>Onboarding training may be required</li>
          <li>Support available for issues</li>
        </ul>

        <h3>J. Legal Compliance</h3>
        <p>Drivers must comply with all local laws and regulations.</p>

        <h2>15. International Data Transfers</h2>
        <p>Data may be stored on global servers.</p>

        <h2>16. Changes to This Policy</h2>
        <p>
          Updates may be made periodically. Continued use of the app means acceptance
          of updates.
        </p>

        <h2>17. Contact Us</h2>
        <p>
          <strong>Email:</strong> support@hire4drive.com<br />
          <strong>Address:</strong> 1747, 1st Floor, 3rd Cross 3rd Block,Doctor Vishnuvardhan Road, Begur Rd, Vishwapriya Nagar, Bengaluru, Karnataka , 560068. <br />
          <strong>Website:</strong> https://www.hire4drive.com
        </p>

        <div className="note">
          Replace placeholders (email, website, address, date) before publishing.
        </div>

        <p className="footer-text">© {year} Hire4Drive. All rights reserved.</p>

      </div>
    </>
  );
};

export default PrivacyPolicy;
