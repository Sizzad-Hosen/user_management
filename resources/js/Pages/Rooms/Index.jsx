import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { usePage, Link } from "@inertiajs/react";

export default function Index() {
  const { rooms } = usePage().props;

  return (
    <AuthenticatedLayout>

      <h1 className="text-xl font-bold mb-4">Rooms</h1>

      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Room</th>
            <th className="p-2">Capacity</th>
            <th className="p-2">Floor</th>
          </tr>
        </thead>

        <tbody>
          {rooms.map(room => (
            <tr key={room.id} className="border-t">
              <td className="p-2">{room.room_number}</td>
              <td className="p-2">{room.capacity}</td>
              <td className="p-2">{room.floor}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </AuthenticatedLayout>
  );
}
