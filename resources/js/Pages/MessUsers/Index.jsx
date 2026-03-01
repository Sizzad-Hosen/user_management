import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { usePage, router } from "@inertiajs/react";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import CreateMessUserModal from "./Modal/CreateMessUserModal";
import { EditModelMessUser } from "./Edit";
import Swal from "sweetalert2";

export default function Index() {
  const { messUsers: initialUsers, flash } = usePage().props;

  const [messUsers, setMessUsers] = useState(initialUsers);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form, setForm] = useState({});
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => setMessUsers(initialUsers), [initialUsers]);

  const openEdit = (user) => {
    setEditingUser(user.id);
    setForm(user);
  };
  const closeEditModal = () => setEditingUser(null);

  const handleSearch = () => {
    router.get(
      route("messUsers.index"),
      { search, status: statusFilter },
      { preserveState: true, replace: true }
    );
  };

  // Update
  const handleUpdate = () => {
    router.put(`/messUsers/${editingUser}`, form, {
      onSuccess: () => {
        closeEditModal();
        toast.success("User updated successfully!");
      },
      onError: () => toast.error("Failed to update user"),
    });
  };

  const deleteUser = (id) => {
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
      <Toaster position="top-right" reverseOrder={false} />

      <div className="bg-white shadow-md rounded-2xl p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Mess Users</h1>
            <p className="text-sm text-gray-500">Manage boarders and their info</p>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition shadow-sm"
          >
            + Add New User
          </button>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-wrap gap-3 mb-6">
          <input
            type="text"
            placeholder="Search by name, phone or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-xl px-4 py-2 w-64 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="left">Left</option>
          </select>
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition"
          >
            Search
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="p-4 text-left">#</th>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Phone</th>
                <th className="p-4 text-left">Deposit</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {messUsers.length > 0 ? (
                messUsers.map((user, idx) => (
                  <tr key={user.id} className="border-t hover:bg-gray-50 transition">
                    <td className="p-4">{idx + 1}</td>
                    <td className="p-4 font-medium">{user.name}</td>
                    <td className="p-4">{user.email || "—"}</td>
                    <td className="p-4">{user.phone_number || "—"}</td>
                    <td className="p-4">{user.jamanot_vara_deposit || "—"}</td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 text-xs rounded-full font-medium ${
                          user.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="p-4 text-center space-x-3">
                      <button
                        onClick={() => openEdit(user)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => deleteUser(user.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-gray-400">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {editingUser && (
        <EditModelMessUser
          form={form}
          setForm={setForm}
          closeModal={closeEditModal}
          handleUpdate={handleUpdate}
        />
      )}

      {/* Create Modal */}
      {showCreateModal && (
        <CreateMessUserModal
          closeModal={() => setShowCreateModal(false)}
        />
      )}
    </AuthenticatedLayout>
  );
}