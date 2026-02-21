import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm, Head } from "@inertiajs/react";

export default function Create() {
  const { data, setData, post, processing } = useForm({
    room_number: "",
    capacity: "",
    floor: "",
    status: "available",
  });

  const submit = (e) => {
    e.preventDefault();
    post("/rooms");
  };

  return (
    <AuthenticatedLayout>
      <Head title="Create Room" />

      {/* Page Wrapper */}
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        
        {/* Card */}
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg border p-8">
          
          {/* Header */}
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-semibold text-gray-800">
              Create New Room
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Fill in the details below to add a room
            </p>
          </div>

          {/* Form */}
          <form onSubmit={submit} className="space-y-5">
            
            {/* Room Number */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Room Number
              </label>
              <input
                value={data.room_number}
                onChange={(e) => setData("room_number", e.target.value)}
                placeholder="Enter room number"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            {/* Capacity */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Capacity
              </label>
              <input
                value={data.capacity}
                onChange={(e) => setData("capacity", e.target.value)}
                placeholder="Enter capacity"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            {/* Floor */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Floor
              </label>
              <input
                value={data.floor}
                onChange={(e) => setData("floor", e.target.value)}
                placeholder="Enter floor"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            {/* Status */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                value={data.status}
                onChange={(e) => setData("status", e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              >
                <option value="available">Available</option>
                <option value="occupied">Occupied</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>

            {/* Button */}
            <button
              disabled={processing}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition shadow-sm disabled:opacity-50"
            >
              {processing ? "Saving..." : "Save Room"}
            </button>

          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}