import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { usePage, router } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { EditModelMessUser } from "./Edit";
import Swal from "sweetalert2";

export default function Index() {
  const { messUsers: initialUsers } = usePage().props;

  // Local state for users
  const [messUsers, setMessUsers] = useState(initialUsers);
  const [editingUser, setEditingUser] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone_number: "",
    guardian_number: "",
    complain: "",
    jamanot_vara_deposit: "",
    address: "",
    status: "",
    join_date: "",
    leave_date: "",
  });

  // Sync props if updated
  useEffect(() => {
    setMessUsers(initialUsers);
  }, [initialUsers]);

  // Open modal
  const openEdit = (user) => {
    setEditingUser(user.id);
    setForm(user);
  };

  const closeModal = () => {
    setEditingUser(null);
  };

  // Update user
  const handleUpdate = () => {
    router.put(`/messUsers/${editingUser}`, form, {
      onSuccess: (page) => {
        // Update local state for UI
        setMessUsers((prev) =>
          prev.map((u) => (u.id === editingUser ? { ...u, ...form } : u))
        );
        setEditingUser(null);

        Swal.fire({
          title: "Updated!",
          text: "User updated successfully.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      },
      onError: (errors) => {
        console.log(errors);
      },
    });
  };

  // Delete user
  const deleteMessUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        router.delete(`/messUsers/${id}`, {
          onSuccess: () => {
            // Remove from UI
            setMessUsers((prev) => prev.filter((u) => u.id !== id));

            Swal.fire({
              title: "Deleted!",
              text: "User deleted successfully.",
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
          <h1 className="text-xl font-semibold text-gray-800">Mess Users List</h1>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-50 text-gray-600 text-sm">
              <tr>
                <th className="p-3 text-left">#</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Deposit</th>
                <th className="p-3 text-left">Address</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="text-gray-700 text-sm">
              {messUsers.length > 0 ? (
                messUsers.map((user, index) => (
                  <tr key={user.id} className="border-t hover:bg-gray-50 transition">
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3 font-medium">{user.name}</td>
                    <td className="p-3">{user.phone_number}</td>
                    <td className="p-3">{user.jamanot_vara_deposit}</td>
                    <td className="p-3">{user.address}</td>
                    <td className="p-3 text-center space-x-2">
                      <button
                        onClick={() => openEdit(user)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        ✏️
                      </button>

                      <button
                        onClick={() => deleteMessUser(user.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-6 text-center text-gray-400">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Edit Modal */}
        {editingUser && (
          <EditModelMessUser
            form={form}
            setForm={setForm}
            closeModal={closeModal}
            handleUpdate={handleUpdate}
          />
        )}
      </div>
    </AuthenticatedLayout>
  );
}