import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm, Head } from "@inertiajs/react";

export default function Create() {
  const { data, setData, post, processing, errors } = useForm({
    name: "",
    email: "",
    phone_number: "",
    guardian_number: "",
    jamanot_vara_deposit: "",
    complain: "",
    status: "active",
    address: "",
    join_date: "",
    leave_date: "",
  });

  const submit = (e) => {
    e.preventDefault();
    post("/messUsers");
  };

  return (
    <AuthenticatedLayout>
      <Head title="Create Mess User" />

      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg border p-8">

          {/* Header */}
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-semibold text-gray-800">
              Add New Mess User
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Fill in user details to register a new boarder
            </p>
          </div>

          {/* Form */}
          <form onSubmit={submit} className="space-y-5">

            {/* Name */}
            <div>
              <label className="text-sm font-medium text-gray-700">Full Name</label>
              <input
                value={data.name}
                onChange={(e) => setData("name", e.target.value)}
                className="input"
                placeholder="Enter full name"
              />
              {errors.name && <p className="error">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                value={data.email}
                onChange={(e) => setData("email", e.target.value)}
                className="input"
                placeholder="Enter email"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="text-sm font-medium text-gray-700">Phone Number</label>
              <input
                value={data.phone_number}
                onChange={(e) => setData("phone_number", e.target.value)}
                className="input"
                placeholder="Enter phone number"
              />
              {errors.phone_number && <p className="error">{errors.phone_number}</p>}
            </div>

            {/* Guardian */}
            <div>
              <label className="text-sm font-medium text-gray-700">Guardian Number</label>
              <input
                value={data.guardian_number}
                onChange={(e) => setData("guardian_number", e.target.value)}
                className="input"
                placeholder="Enter guardian number"
              />
            </div>

            {/* Deposit */}
            <div>
              <label className="text-sm font-medium text-gray-700">Deposit</label>
              <input
                value={data.jamanot_vara_deposit}
                onChange={(e) => setData("jamanot_vara_deposit", e.target.value)}
                className="input"
                placeholder="Enter deposit amount"
              />
            </div>

            {/* Address */}
            <div>
              <label className="text-sm font-medium text-gray-700">Address</label>
              <input
                value={data.address}
                onChange={(e) => setData("address", e.target.value)}
                className="input"
                placeholder="Enter address"
              />
            </div>

            {/* Status */}
            <div>
              <label className="text-sm font-medium text-gray-700">Status</label>
              <select
                value={data.status}
                onChange={(e) => setData("status", e.target.value)}
                className="input"
              >
                <option value="active">Active</option>
                <option value="left">Left</option>
              </select>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Join Date</label>
                <input
                  type="date"
                  value={data.join_date}
                  onChange={(e) => setData("join_date", e.target.value)}
                  className="input"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Leave Date</label>
                <input
                  type="date"
                  value={data.leave_date}
                  onChange={(e) => setData("leave_date", e.target.value)}
                  className="input"
                />
              </div>
            </div>

            {/* Complain */}
            <div>
              <label className="text-sm font-medium text-gray-700">Complain / Note</label>
              <textarea
                value={data.complain}
                onChange={(e) => setData("complain", e.target.value)}
                className="input h-24"
                placeholder="Write note..."
              />
            </div>

            {/* Button */}
            <button
              disabled={processing}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition shadow-sm disabled:opacity-50"
            >
              {processing ? "Saving..." : "Save User"}
            </button>

          </form>
        </div>
      </div>

      {/* Reusable styles */}
      <style jsx>{`
        .input {
          width: 100%;
          border-radius: 0.5rem;
          border: 1px solid #d1d5db;
          padding: 0.5rem 0.75rem;
          margin-top: 0.25rem;
          outline: none;
        }
        .input:focus {
          ring: 2px;
          border-color: #3b82f6;
        }
        .error {
          color: #ef4444;
          font-size: 0.875rem;
          margin-top: 2px;
        }
      `}</style>

    </AuthenticatedLayout>
  );
}