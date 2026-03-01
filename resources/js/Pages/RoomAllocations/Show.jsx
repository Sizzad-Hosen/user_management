import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { usePage } from "@inertiajs/react";

export default function Show() {
  const { messUserDetails } = usePage().props;

  const userDetails = messUserDetails.mess_user || null;
  const roomDetails = messUserDetails.room || null;
  const paymentDetails = messUserDetails.payments_rent || [];

  const handlePrint = () => {
    window.print();
  };

  return (
    <AuthenticatedLayout>
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            User Full Details
          </h1>

          <button
            onClick={handlePrint}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            🖨 Print
          </button>
        </div>

        {/* Personal Information */}
        {userDetails && (
          <div className="bg-gray-50 p-6 rounded-xl shadow-sm mb-8">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">
              👤 Personal Information
            </h2>

            <div className="grid grid-cols-3 gap-6 text-sm">
              <div>
                <p className="text-gray-500">Name</p>
                <p className="font-medium">{userDetails.name}</p>
              </div>

              <div>
                <p className="text-gray-500">Phone</p>
                <p className="font-medium">{userDetails.phone_number}</p>
              </div>

              <div>
                <p className="text-gray-500">Email</p>
                <p className="font-medium">{userDetails.email || "N/A"}</p>
              </div>

              <div>
                <p className="text-gray-500">Address</p>
                <p className="font-medium">{userDetails.address || "N/A"}</p>
              </div>

              <div>
                <p className="text-gray-500">Guardian Number</p>
                <p className="font-medium">{userDetails.guardian_number}</p>
              </div>

              <div>
                <p className="text-gray-500">Join Date</p>
                <p className="font-medium">{userDetails.join_date}</p>
              </div>

              <div>
                <p className="text-gray-500">Leave Date</p>
                <p className="font-medium">{userDetails.leave_date || "Still Staying"}</p>
              </div>

              <div>
                <p className="text-gray-500">Deposit</p>
                <p className="font-medium">{userDetails.jamanot_vara_deposit}</p>
              </div>

              <div>
                <p className="text-gray-500">Status</p>
                <p className={`font-medium ${userDetails.status === "active" ? "text-green-600" : "text-red-600"}`}>
                  {userDetails.status}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Room Allocation History */}
        {roomDetails && (
          <div className="bg-gray-50 p-6 rounded-xl shadow-sm mb-8">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">
              🏠 Room Allocation History
            </h2>

            <table className="w-full border text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">Room Number</th>
                  <th className="p-3 text-left">Floor</th>
                  <th className="p-3 text-left">Start Date</th>
                  <th className="p-3 text-left">End Date</th>
                  <th className="p-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr key={roomDetails.id} className="border-t">
                  <td className="p-3">{roomDetails.room_number}</td>
                  <td className="p-3">{roomDetails.floor}</td>
                  <td className="p-3">{messUserDetails.start_date}</td>
                  <td className="p-3">{roomDetails.end_date || "Still Staying"}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded text-xs ${messUserDetails.status === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {messUserDetails.status}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Payments History */}
        <div className="bg-gray-50 p-6 rounded-xl shadow-sm mb-8">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            💰 Payment History
          </h2>

          <table className="w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">#ID</th>
                <th className="p-3 text-left">Month</th>
                <th className="p-3 text-left">Rent Amount</th>
                <th className="p-3 text-left">Amount Paid</th>
                <th className="p-3 text-left">Amount Due</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Payment Date</th>
              </tr>
            </thead>
            <tbody>
              {paymentDetails.length > 0 ? (
                paymentDetails.map((payment) => (
                  <tr key={payment.id} className="border-t">
                    <td className="p-3">{payment.id}</td>
                    <td className="p-3">{payment.month}</td>
                    <td className="p-3">{payment.rent_amount}</td>
                    <td className="p-3">{payment.amount_paid}</td>
                    <td className="p-3">{payment.amount_due}</td>
                    <td className={`p-3 font-semibold ${payment.status === "paid" ? "text-green-600" : "text-red-600"}`}>
                      {payment.status}
                    </td>
                    <td className="p-3">{payment.payment_date}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="p-4 text-center text-gray-400">
                    No payment history found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>

      {/* Print Style */}
      <style>
        {`
          @media print {
            button {
              display: none;
            }
          }
        `}
      </style>
    </AuthenticatedLayout>
  );
}