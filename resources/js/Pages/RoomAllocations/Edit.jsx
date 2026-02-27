import { useForm } from "@inertiajs/react";

export default function EditRoomAllocationModal({
  form,
  closeModal,
  handleUpdate,
  users,
  rooms,
}) {
  const { data, setData, put, processing, errors } = useForm({
    room_id: form.room_id || "",
    user_id: form.user_id || "",
    start_date: form.start_date || "",
    end_date: form.end_date || "",
    status: form.status || "active",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    put(route("roomAllocations.update", form.id), {
      onSuccess: () => closeModal(),
    });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow max-w-md mx-auto">
      <h1 className="text-xl font-semibold mb-4">Edit Room Allocation</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* User */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Select User
          </label>
          <select
            value={data.user_id}
            onChange={(e) => setData("user_id", e.target.value)}
            className="w-full border rounded-lg p-2"
          >
            <option value="">-- Select User --</option>
            {users?.map((user) => (
              <option key={user.id} value={user.id}>
                {user?.name} ({user?.phone_number})
              </option>
            ))}
          </select>
          {errors.user_id && (
            <div className="text-red-500 text-sm mt-1">{errors.user_id}</div>
          )}
        </div>

        {/* Room */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Select Room
          </label>
          <select
            value={data.room_id}
            onChange={(e) => setData("room_id", e.target.value)}
            className="w-full border rounded-lg p-2"
          >
            <option value="">-- Select Room --</option>
            {rooms?.map((room) => (
              <option key={room.id} value={room.id}>
                Room {room?.room_number} (Capacity: {room.capacity})
              </option>
            ))}
          </select>
          {errors.room_id && (
            <div className="text-red-500 text-sm mt-1">{errors.room_id}</div>
          )}
        </div>

        {/* Start Date */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Start Date
          </label>
          <input
            type="date"
            value={data.start_date}
            onChange={(e) => setData("start_date", e.target.value)}
            className="w-full border rounded-lg p-2"
          />
          {errors.start_date && (
            <div className="text-red-500 text-sm mt-1">{errors.start_date}</div>
          )}
        </div>

        {/* End Date */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            End Date
          </label>
          <input
            type="date"
            value={data.end_date || ""}
            onChange={(e) => setData("end_date", e.target.value)}
            className="w-full border rounded-lg p-2"
          />
          {errors.end_date && (
            <div className="text-red-500 text-sm mt-1">{errors.end_date}</div>
          )}
        </div>

        {/* Status */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            value={data.status}
            onChange={(e) => setData("status", e.target.value)}
            className="w-full border rounded-lg p-2"
          >
            <option value="">-- Select Status --</option>
            <option value="active">Active</option>
            <option value="end">End</option>
          </select>
          {errors.status && (
            <div className="text-red-500 text-sm mt-1">{errors.status}</div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            onClick={closeModal}
            className="px-4 py-2 rounded border text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={processing}
              onClick={handleUpdate}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {processing ? "Updating..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
}