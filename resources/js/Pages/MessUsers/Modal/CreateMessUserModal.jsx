import { useForm } from "@inertiajs/react";

export default function CreateMessUserModal({ closeModal }) {
  const { data, setData, post, processing, errors, reset } = useForm({
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

    post("/messUsers", {
      onSuccess: () => {
        reset();
        closeModal();
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 overflow-y-auto p-4">

      {/* Modal Card */}
      <div className="bg-white w-full max-w-5xl rounded-2xl shadow-xl p-8 relative">

        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-lg"
        >
          ✕
        </button>

        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">
            Add New Mess User
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Fill in the details to register a new boarder
          </p>
        </div>

        {/* Form */}
        <form onSubmit={submit} className="space-y-6">

          {/* ===== BASIC INFO ===== */}
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4">
              Basic Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

              {/* Name */}
              <div>
                <label className="label">Full Name *</label>
                <input
                  type="text"
                  value={data.name}
                  onChange={(e) => setData("name", e.target.value)}
                  className="input"
                  placeholder="Enter full name"
                />
                {errors.name && <p className="error">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="label">Email</label>
                <input
                  type="email"
                  value={data.email}
                  onChange={(e) => setData("email", e.target.value)}
                  className="input"
                  placeholder="Enter email"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="label">Phone Number *</label>
                <input
                  type="tel"
                  value={data.phone_number}
                  onChange={(e) => setData("phone_number", e.target.value)}
                  className="input"
                  placeholder="Enter phone number"
                />
                {errors.phone_number && (
                  <p className="error">{errors.phone_number}</p>
                )}
              </div>

              {/* Guardian */}
              <div>
                <label className="label">Guardian Number</label>
                <input
                  type="tel"
                  value={data.guardian_number}
                  onChange={(e) => setData("guardian_number", e.target.value)}
                  className="input"
                  placeholder="Enter guardian number"
                />
              </div>

              {/* Deposit */}
              <div>
                <label className="label">Deposit Amount</label>
                <input
                  type="number"
                  value={data.jamanot_vara_deposit}
                  onChange={(e) =>
                    setData("jamanot_vara_deposit", e.target.value)
                  }
                  className="input"
                  placeholder="Enter deposit"
                />
              </div>

              {/* Status */}
              <div>
                <label className="label">Status</label>
                <select
                  value={data.status}
                  onChange={(e) => setData("status", e.target.value)}
                  className="input"
                >
                  <option value="active">Active</option>
                  <option value="left">Left</option>
                </select>
              </div>

            </div>
          </div>

          {/* ===== DATES ===== */}
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4">
              Stay Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="label">Join Date</label>
                <input
                  type="date"
                  value={data.join_date}
                  onChange={(e) => setData("join_date", e.target.value)}
                  className="input"
                />
              </div>

              <div>
                <label className="label">Leave Date</label>
                <input
                  type="date"
                  value={data.leave_date}
                  onChange={(e) => setData("leave_date", e.target.value)}
                  className="input"
                />
              </div>
            </div>
          </div>

          {/* ===== ADDRESS & NOTE ===== */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* Address */}
            <div>
              <label className="label">Address</label>
              <textarea
                value={data.address}
                onChange={(e) => setData("address", e.target.value)}
                className="input h-24"
                placeholder="Enter address"
              />
            </div>

            {/* Complain */}
            <div>
              <label className="label">Complain / Note</label>
              <textarea
                value={data.complain}
                onChange={(e) => setData("complain", e.target.value)}
                className="input h-24"
                placeholder="Write note..."
              />
            </div>

          </div>

          {/* ===== ACTION BUTTONS ===== */}
          <div className="flex justify-end space-x-4 pt-6 border-t">

            <button
              type="button"
              onClick={closeModal}
              className="px-5 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={processing}
              className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50"
            >
              {processing ? "Saving..." : "Save User"}
            </button>

          </div>

        </form>
      </div>

      {/* Tailwind Utility Classes */}
      <style>{`
        .label {
          display: block;
          font-size: 0.875rem;
          font-weight: 500;
          color: #374151;
          margin-bottom: 0.25rem;
        }
        .input {
          width: 100%;
          border-radius: 0.5rem;
          border: 1px solid #d1d5db;
          padding: 0.5rem 0.75rem;
          outline: none;
          transition: 0.2s;
        }
        .input:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 2px rgba(59,130,246,0.2);
        }
        .error {
          color: #ef4444;
          font-size: 0.875rem;
          margin-top: 2px;
        }
      `}</style>
    </div>
  );
}