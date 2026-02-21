import React from "react";

export const EditModel = ({ form, setForm, closeModal, handleUpdate }) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">

        {/* Title */}
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          Edit Room
        </h2>

        {/* Form */}
        <div className="space-y-3">
               <div className="space-y-1">
               <label className="text-sm font-medium text-gray-700">
                Room Number
              </label>
          <input
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
            value={form.room_number}
            onChange={(e) =>
              setForm({ ...form, room_number: e.target.value })
            }
            placeholder="Room Number"
          />
</div>
      <div className="space-y-1">
   <label className="text-sm font-medium text-gray-700">
                Capacity
              </label>
          <input
            type="number"
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
            value={form.capacity}
            onChange={(e) =>
              setForm({ ...form, capacity: e.target.value })
            }
            placeholder="Capacity"
          />
</div>
      <div className="space-y-1">
   <label className="text-sm font-medium text-gray-700">
                Floor
              </label>
          <input
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
            value={form.floor}
            onChange={(e) =>
              setForm({ ...form, floor: e.target.value })
            }
            placeholder="Floor"
          />
</div>
      <div className="space-y-1">
   <label className="text-sm font-medium text-gray-700">
                Status
              </label>
          <select
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
            value={form.status}
            onChange={(e) =>
              setForm({ ...form, status: e.target.value })
            }
          >
            <option value="available">Available</option>
            <option value="full">Full</option>
            <option value="maintenance">Maintenance</option>
          </select>
</div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 mt-5">

          <button
            onClick={closeModal}
            className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleUpdate}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Update
          </button>

        </div>

      </div>
    </div>
  );
};
