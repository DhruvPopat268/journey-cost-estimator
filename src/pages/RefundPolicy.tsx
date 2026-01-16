export default function RefundPolicy() {
  return (
    <div className="max-w-5xl mx-auto px-5 py-10 text-gray-800 leading-relaxed">
      <h1 className="text-3xl font-bold mb-6">Refund & Cancellation Policy – Hire4Drive</h1>

      <p className="mb-6">
        Effective refunds and clear cancellation rules help maintain trust between customers, 
        drivers, owners, and the platform. Hire4Drive follows the policy below. 
        The Admin may handle exceptions based on individual situations.
      </p>

      {/* CUSTOMER CANCELLATION */}
      <h2 className="text-2xl font-semibold mt-8 mb-3">1. Customer Cancellations</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>Before driver assignment:</strong>  
          If a customer cancels before a driver is assigned, a full refund is issued for 
          any prepaid amount or wallet hold.
        </li>
        <li>
          <strong>After driver assignment:</strong>  
          Cancellation charges may apply depending on driver travel time or distance.
        </li>
        <li>
          <strong>Late cancellations / No-shows:</strong>  
          If a customer cancels after the driver has arrived, or does not show up, 
          a no-show fee may be charged to compensate the driver.
        </li>
      </ul>

      {/* DRIVER CANCELLATION */}
      <h2 className="text-2xl font-semibold mt-8 mb-3">2. Driver Cancellations</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          If a driver cancels an accepted booking without valid reason, penalties, 
          temporary suspension, or deactivation may apply.
        </li>
        <li>
          Drivers cancelling due to emergencies, safety issues, or vehicle breakdown 
          must report the reason. Admin may waive penalties after review.
        </li>
      </ul>

      {/* REFUND PROCESS */}
      <h2 className="text-2xl font-semibold mt-8 mb-3">3. Refund Process & Timeline</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          Refunds are processed to the original payment method or wallet within 
          <strong> 3–14 business days</strong>, depending on the payment provider.
        </li>
        <li>
          Eligibility is reviewed based on trip logs, GPS tracking, driver notes, 
          and communication records.
        </li>
        <li>
          Users may raise disputes by providing booking ID, screenshots, or transaction details.
        </li>
      </ul>

      {/* PARTIAL REFUNDS */}
      <h2 className="text-2xl font-semibold mt-8 mb-3">4. Partial Refunds & Adjustments</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          Partial refunds may be issued in case of service failure, incorrect routes controlled 
          by the driver, or platform-initiated changes.
        </li>
        <li>
          Promotional credits used in a ride may be refunded as wallet credits only.
        </li>
      </ul>

      {/* EXCEPTIONAL CASES */}
      <h2 className="text-2xl font-semibold mt-8 mb-3">5. Exceptional Cases</h2>
      <p>
        The Admin reserves the right to review exceptional cases (e.g., accidents, 
        safety issues, force-majeure events) individually and decide appropriate compensation.
      </p>

      {/* CONTACT INFO */}
      <h2 className="text-2xl font-semibold mt-10 mb-3">Contact & Support</h2>
      <p className="mb-1"><strong>Email:</strong> support@hire4drive.com </p>
      <p className="mb-1">
        <strong>Website:</strong>{" "}
        <a href="https://www.hire4drive.com" className="text-blue-600 underline">
          www.hire4drive.com
        </a>
      </p>

      <p className="mt-6 text-sm text-gray-500">
        © Hire4Drive. All rights reserved.
      </p>
    </div>
  );
}
