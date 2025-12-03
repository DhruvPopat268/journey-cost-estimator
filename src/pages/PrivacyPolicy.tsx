import React, { useEffect, useState } from "react";

const PrivacyPolicy = () => {
  const [year, setYear] = useState("");

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <>
      <style>{`
        :root{ --bg:#f7f9fc; --card:#ffffff; --accent:#0a66c2; --text:#111827; --muted:#6b7280 }
        body{font-family:Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; background:var(--bg); color:var(--text); margin:0; padding:32px}
        .container{max-width:900px;margin:24px auto;padding:28px;background:var(--card);box-shadow:0 6px 24px rgba(16,24,40,0.06);border-radius:12px}
        h1{margin-top:0;color:var(--accent)}
        h2{color:#0b3a66}
        p{line-height:1.6;color:var(--text)}
        .meta{font-size:0.95rem;color:var(--muted)}
        ul{margin:8px 0 16px 20px}
        code{background:#eef2ff;padding:2px 6px;border-radius:6px}
        .footer{font-size:0.9rem;color:var(--muted);margin-top:28px}
        .note{background:#fff7ed;border-left:4px solid #f59e0b;padding:12px;border-radius:6px}
      `}</style>

      <div className="container">
        <h1>Privacy Policy</h1>
        <p className="meta">
          Last updated: <strong>[Insert date]</strong>
        </p>

        <p>
          Welcome to <strong>Hire 4 Drive</strong> ("we", "us", "our"). This
          Privacy Policy explains how we collect, use, disclose, and protect your
          information when you use the Hire 4 Drive mobile application (the
          "App") and related services.
        </p>

        <h2>1. Information We Collect</h2>
        <p>We collect information to provide, improve, and secure our services.</p>

        <h3>A. Personal Information</h3>
        <ul>
          <li>Full name, email address, mobile number</li>
          <li>Profile photo (optional)</li>
          <li>Identity documents for driver verification</li>
          <li>Gender and date of birth (optional)</li>
        </ul>

        <h3>B. Vehicle Information</h3>
        <ul>
          <li>Vehicle make, model, type, registration number</li>
          <li>RC documents and insurance details</li>
        </ul>

        <h3>C. Location Information</h3>
        <p>
          We collect real-time GPS location data during rides for booking,
          navigation, route tracking, and safety.
        </p>

        <h3>D. Transaction & Payment Information</h3>
        <ul>
          <li>Payment method and transaction history</li>
          <li>Wallet balances, subscription status, withdrawals</li>
        </ul>

        <p>
          <em>Note:</em> We do not store complete card numbers. Payments handled by
          secure third-party providers.
        </p>

        <h3>E. Usage & Device Information</h3>
        <ul>
          <li>Device model, OS, app version</li>
          <li>IP address, analytics, crash reports</li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <ul>
          <li>Providing and managing bookings</li>
          <li>Assigning drivers, fare calculation</li>
          <li>Processing payments</li>
          <li>Security, identity verification</li>
          <li>App improvements</li>
          <li>Notifications and support</li>
        </ul>

        <h2>3. Sharing of Information</h2>
        <ul>
          <li>
            <strong>Drivers & Customers:</strong> Ride details shared for service.
          </li>
          <li>
            <strong>Service Providers:</strong> Payments, analytics, SMS/email.
          </li>
          <li>
            <strong>Legal Compliance:</strong> When required by law.
          </li>
        </ul>

        <h2>4. Driver & Customer Visibility</h2>
        <ul>
          <li>
            <strong>Customers:</strong> Driver name, photo, vehicle, rating, live
            location.
          </li>
          <li>
            <strong>Drivers:</strong> Customer name, masked number, locations.
          </li>
        </ul>

        <h2>5. Wallets, Subscriptions & Withdrawals</h2>
        <ul>
          <li>Ride earnings added to wallet</li>
          <li>Withdrawal requests reviewed by admin</li>
          <li>Subscriptions allow drivers to receive ride requests</li>
        </ul>

        <h2>6. Data Retention</h2>
        <p>
          Data retained as long as needed for service, legal, financial, and
          security purposes.
        </p>

        <h2>7. Security</h2>
        <p>
          We use encrypted communications, secure servers, access controls, but
          no system is fully secure.
        </p>

        <h2>8. Cookies & Tracking</h2>
        <p>Used for analytics, authentication, and experience improvement.</p>

        <h2>9. Your Rights</h2>
        <ul>
          <li>Access or correct your data</li>
          <li>Request account deletion</li>
          <li>Update notification settings</li>
          <li>Control location access</li>
        </ul>

        <h2>10. Account Deletion</h2>
        <p>Users may request deletion via app or support email.</p>

        <h2>11. Children's Privacy</h2>
        <p>Not intended for children under 18.</p>

        <h2>12. Changes to This Policy</h2>
        <p>We may update this policy. Check the "Last updated" date.</p>

        <h2>13. Contact Us</h2>
        <p>
          <strong>Email:</strong>{" "}
          <a href="mailto:support@yourcompany.com">
            support@yourcompany.com
          </a>
          <br />
          <strong>Website:</strong>{" "}
          <a href="https://www.yourcompany.com" target="_blank" rel="noopener">
            https://www.yourcompany.com
          </a>
          <br />
          <strong>Address:</strong> [Your Company Address]
        </p>

        <div className="note">
          <strong>Tip:</strong> Replace placeholders like{" "}
          <code>[Insert date]</code> and emails before publishing.
        </div>

        <p className="footer">© {year} Hire 4 Drive. All rights reserved.</p>
      </div>
    </>
  );
};

export default PrivacyPolicy;