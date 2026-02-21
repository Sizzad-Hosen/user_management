import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { usePage, router } from "@inertiajs/react";
import { useState } from "react";
// import { EditModel } from "./Edit";
import Swal from "sweetalert2";
import { EditModel } from "./Edit";
export default function Index() {
  const { rooms } = usePage().props;

  const [editingRoom, setEditingRoom] = useState(null);
  const [form, setForm] = useState({
    room_number: "",
    capacity: "",
    floor: "",
    status: "",
  });

  const openEdit = (room) => {
    setEditingRoom(room.id);
    setForm(room);
  };

  const closeModal = () => {
    setEditingRoom(null);
  };

  const handleUpdate = () => {
    router.put(`/rooms/${editingRoom}`, form, {
      onSuccess: () => setEditingRoom(null),
    });
  };
const deleteRoom = (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#2563eb",
    cancelButtonColor: "#6b7280",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
  }).then((result) => {
    if (result.isConfirmed) {
      router.delete(`/rooms/${id}`, {
        onSuccess: () => {
          Swal.fire({
            title: "Deleted!",
            text: "Room has been deleted successfully.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
        },
      });
    }
  });
};

  return (
    <AuthenticatedLayout>
      <div className="bg-white shadow-sm rounded-xl p-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-xl font-semibold text-gray-800">Rooms List</h1>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-50 text-gray-600 text-sm">
              <tr>
                <th className="p-3 text-left">#</th>
                <th className="p-3 text-left">Room Number</th>
                <th className="p-3 text-left">Capacity</th>
                <th className="p-3 text-left">Floor</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="text-gray-700 text-sm">
              {rooms.map((room, index) => (
                <tr key={room.id} className="border-t hover:bg-gray-50 transition">
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3 font-medium">{room.room_number}</td>
                  <td className="p-3">{room.capacity}</td>
                  <td className="p-3">{room.floor}</td>
                  <td className="p-3">{room.status}</td>

                  {/* Actions */}
                  <td className="p-3 text-center space-x-2">

                    {/* Edit */}
                    <button
                      onClick={() => openEdit(room)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      ✏️
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => deleteRoom(room.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      🗑️
                    </button>

                  </td>
                </tr>
              ))}

              {rooms.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-6 text-center text-gray-400">
                    No rooms found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {editingRoom && (
       <EditModel form={form} setForm={setForm} closeModal={closeModal} handleUpdate={handleUpdate}></EditModel>
      )}
    </AuthenticatedLayout>
  );
}
