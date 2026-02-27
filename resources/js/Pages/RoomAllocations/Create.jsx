import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm, usePage } from "@inertiajs/react";

export default function Create() {
  const { rooms, users } = usePage().props;

  const { data, setData, post, processing, errors } = useForm({
    room_id: "",
    user_id: "",
    start_date: "",
    end_date: "",
   status: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("roomAllocations.store"));
  };

  return (
    <AuthenticatedLayout>
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800">
          Create Room Allocation
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* User Select */}
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
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name} ({user.phone_number})
                </option>
              ))}
            </select>
            {errors.user_id && (
              <div className="text-red-500 text-sm mt-1">
                {errors.user_id}
              </div>
            )}
          </div>

          {/* Room Select */}
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
              {rooms.map((room) => (
                <option key={room.id} value={room.id}>
                  Room {room.room_number} (Capacity: {room.capacity})
                </option>
              ))}
            </select>
            {errors.room_id && (
              <div className="text-red-500 text-sm mt-1">
                {errors.room_id}
              </div>
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
              <div className="text-red-500 text-sm mt-1">
                {errors.start_date}
              </div>
            )}
          </div>

          {/* End Date */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              End Date (Optional)
            </label>
            <input
              type="date"
              value={data.end_date}
              onChange={(e) => setData("end_date", e.target.value)}
              className="w-full border rounded-lg p-2"
            />
            {errors.end_date && (
              <div className="text-red-500 text-sm mt-1">
                {errors.end_date}
              </div>
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
              <div className="text-red-500 text-sm mt-1">
                {errors.status}
              </div>
            )}
  </div>
          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={processing}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              {processing ? "Allocating..." : "Allocate Room"}
            </button>
          </div>
        </form>
      </div>
    </AuthenticatedLayout>
  );
}