import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, usePage } from "@inertiajs/react";
import Swal from "sweetalert2";
import EditRoomAllocationModal from "./Edit";
import { useState } from "react";
import { router } from "@inertiajs/react";
import CreateRoomAllocationModal from "./Modal/CreateRoomAllocationModal";


  export default function Index() {
  const { allocations, users, rooms, flash } = usePage().props;


  const [editingRoom, setEditingRoom] = useState(null);
 
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    user_id: "",
    room_id: "",
    start_date: "",
    end_date: "",
    status: "active",
  });

  const openEdit = (allocation) => {
    setEditingRoom(allocation.id);
    setForm(allocation);
  };

  const closeModal = () => {
    setEditingRoom(null);
  };

const [search, setSearch] = useState("");
const [statusFilter, setStatusFilter] = useState("");

const handleSearch = () => {
  router.get(
    route("roomAllocations.index"),
    {
      search: search,
      status: statusFilter,
    },
    { preserveState: true, replace: true }
  );
};


  const handleUpdate = (updatedData) => {
    // PUT request to Room Allocation endpoint
    axios
      .put(`/roomAllocations/${editingRoom}`, updatedData)
      .then(() => {
        closeModal();
        Swal.fire({
          title: "Updated!",
          text: "Room allocation updated successfully.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      });
  };

  const deleteAllocation = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This allocation will be removed.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        router.delete(route("roomAllocations.destroy", id), {
          preserveScroll: true,
          onSuccess: () => {
            Swal.fire({
              title: "Deleted!",
              text: "Room allocation deleted successfully.",
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
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold text-gray-800">
            Room Allocations
          </h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            + Allocate Room
          </button>
        </div>


                {flash?.success && (
                <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
                    {flash.success}
                </div>
                )}

                {/* Search & Filter */}
        <div className="flex gap-3 mb-6">

        <input
            type="text"
            placeholder="Search by room number or user name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg p-2 w-64"
        />

        <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded-lg p-2"
        >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="end">Left</option>
        </select>

        <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
            Search
        </button>


        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-50 text-gray-600 text-sm">
              <tr>
                <th className="p-3 text-left">#</th>
                <th className="p-3 text-left">User</th>
                <th className="p-3 text-left">Room</th>
                <th className="p-3 text-left">Start Date</th>
                <th className="p-3 text-left">End Date</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="text-gray-700 text-sm">
              {allocations.length > 0 ? (
                allocations?.map((allocation, index) => (
                  <tr
                    key={allocation.id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="p-3">{index + 1}</td>
                <td className="p-3 font-medium">
                    <Link
                        href={route("roomAllocations.show", allocation?.id)}
                        className="text-blue-600 hover:underline"
                    >
                        {allocation.mess_user?.name}
                    </Link>
                    </td>
                                        <td className="p-3">
                      Room {allocation.room?.room_number}
                    </td>
                    <td className="p-3">{allocation.start_date}</td>
                    <td className="p-3">{allocation.end_date || "—"}</td>
                    <td className="p-3">{allocation.status || "—"}</td>
                    <td className="p-3 text-center space-x-2">
                      <button
                        onClick={() => openEdit(allocation)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => deleteAllocation(allocation.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="p-6 text-center text-gray-400"
                  >
                    No room allocations found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {editingRoom && (
        <EditRoomAllocationModal
          form={form}
          setForm={setForm}
          closeModal={closeModal}
          handleUpdate={handleUpdate}
          users={users}
          rooms={rooms}
        />
      )}
    {/* CREATE MODAL */}
      {showModal && (
        <CreateRoomAllocationModal
          closeModal={() => setShowModal(false)}
        />
      )}
    </AuthenticatedLayout>
  );
}