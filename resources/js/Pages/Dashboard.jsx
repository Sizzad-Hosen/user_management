import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard() {
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-5 rounded-xl shadow">Total Users: 120</div>
                <div className="bg-white p-5 rounded-xl shadow">Active Users: 98</div>
                <div className="bg-white p-5 rounded-xl shadow">Inactive Users: 22</div>
                <div className="bg-white p-5 rounded-xl shadow">Total Rooms: 35</div>
            </div>

        </AuthenticatedLayout>
    );
}
