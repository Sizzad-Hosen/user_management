import { useForm, usePage } from "@inertiajs/react";

export default function CreateRoomAllocationModal({ closeModal }) {
  const { rooms, users } = usePage().props;
 console.log("Rooms in Create Modal:", users, rooms)
  const { data, setData, post, processing, errors } = useForm({
    room_id: "",
    user_id: "",
    start_date: "",
    end_date: "",
    status: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    post(route("roomAllocations.store"), {
      onSuccess: () => {
        closeModal();
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-lg rounded-xl p-6 shadow-lg">

        <h2 className="text-xl font-semibold mb-6">
          Create Room Allocation
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* User */}
          <div>
            <label className="block mb-1 text-sm font-medium">
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
                  {user.name} ({user.phone_number})
                </option>
              ))}
            </select>
            {errors.user_id && (
              <div className="text-red-500 text-sm">{errors.user_id}</div>
            )}
          </div>

          {/* Room */}
          <div>
            <label className="block mb-1 text-sm font-medium">
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
                  Room {room.room_number} (Capacity: {room.capacity})
                </option>
              ))}
            </select>
            {errors.room_id && (
              <div className="text-red-500 text-sm">{errors.room_id}</div>
            )}
          </div>

          {/* Start Date */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              Start Date
            </label>
            <input
              type="date"
              value={data.start_date}
              onChange={(e) => setData("start_date", e.target.value)}
              className="w-full border rounded-lg p-2"
            />
            {errors.start_date && (
              <div className="text-red-500 text-sm">{errors.start_date}</div>
            )}
          </div>

          {/* End Date */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              End Date
            </label>
            <input
              type="date"
              value={data.end_date}
              onChange={(e) => setData("end_date", e.target.value)}
              className="w-full border rounded-lg p-2"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block mb-1 text-sm font-medium">
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
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 bg-gray-400 text-white rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={processing}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              {processing ? "Saving..." : "Allocate"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}