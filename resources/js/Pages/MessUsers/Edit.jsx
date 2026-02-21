import React from "react";

export const EditModelMessUser = ({ form, setForm, closeModal, handleUpdate }) => {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6">

        {/* Header */}
        <h2 className="text-xl font-semibold text-gray-800 mb-5">
          Edit Mess User
        </h2>

        {/* Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Name */}
          <div>
            <label className="text-sm font-medium text-gray-700">Name</label>
            <input
              className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
              value={form.name || ""}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Enter name"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm font-medium text-gray-700">Phone Number</label>
            <input
              className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
              value={form.phone_number || ""}
              onChange={(e) => setForm({ ...form, phone_number: e.target.value })}
              placeholder="Enter phone"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
              value={form.email || ""}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Enter email"
            />
          </div>

          {/* Guardian */}
          <div>
            <label className="text-sm font-medium text-gray-700">Guardian Number</label>
            <input
              className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
              value={form.guardian_number || ""}
              onChange={(e) => setForm({ ...form, guardian_number: e.target.value })}
              placeholder="Guardian phone"
            />
          </div>

          {/* Deposit */}
          <div>
            <label className="text-sm font-medium text-gray-700">Deposit</label>
            <input
              type="number"
              className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
              value={form.jamanot_vara_deposit || ""}
              onChange={(e) => setForm({ ...form, jamanot_vara_deposit: e.target.value })}
              placeholder="Deposit amount"
            />
          </div>

          {/* Status */}
          <div>
            <label className="text-sm font-medium text-gray-700">Status</label>
            <select
              className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
              value={form.status || ""}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              <option value="active">Active</option>
              <option value="left">Left</option>
            </select>
          </div>

          {/* Join Date */}
          <div>
            <label className="text-sm font-medium text-gray-700">Join Date</label>
            <input
              type="date"
              className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
              value={form.join_date || ""}
              onChange={(e) => setForm({ ...form, join_date: e.target.value })}
            />
          </div>

          {/* Leave Date */}
          <div>
            <label className="text-sm font-medium text-gray-700">Leave Date</label>
            <input
              type="date"
              className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
              value={form.leave_date || ""}
              onChange={(e) => setForm({ ...form, leave_date: e.target.value })}
            />
          </div>

          {/* Address full width */}
          <div className="md:col-span-2">
            <label className="text-sm font-medium text-gray-700">Address</label>
            <textarea
              className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
              value={form.address || ""}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              placeholder="Enter address"
            />
          </div>

          {/* Complain */}
          <div className="md:col-span-2">
            <label className="text-sm font-medium text-gray-700">Complain</label>
            <textarea
              className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
              value={form.complain || ""}
              onChange={(e) => setForm({ ...form, complain: e.target.value })}
              placeholder="Any complain"
            />
          </div>

        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={closeModal}
            className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleUpdate}
            className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
          >
            Update User
          </button>

        </div>

      </div>
    </div>
  );
};