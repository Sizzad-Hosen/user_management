import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm, Head } from "@inertiajs/react";

export default function Create() {
  const { data, setData, post } = useForm({
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

      <h1 className="text-xl font-bold mb-4">Create Room</h1>

      <form onSubmit={submit} className="bg-white p-6 rounded-xl shadow max-w-md space-y-4">
        <input className="border p-2 w-full" placeholder="Room Number"
          onChange={(e) => setData("room_number", e.target.value)} />

        <input className="border p-2 w-full" placeholder="Capacity"
          onChange={(e) => setData("capacity", e.target.value)} />

        <input className="border p-2 w-full" placeholder="Floor"
          onChange={(e) => setData("floor", e.target.value)} />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Save
        </button>
      </form>
    

    </AuthenticatedLayout>
  );
}
