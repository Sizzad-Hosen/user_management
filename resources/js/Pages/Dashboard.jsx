import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { SidebarGroup, SidebarLink, StatCard } from "@/utlis/sidebar";

import { Head, Link, usePage } from "@inertiajs/react";


export default function Dashboard() {
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="flex min-h-screen bg-gray-100">

                {/* Sidebar */}
                <aside className="w-64 bg-slate-900 text-slate-200 hidden md:flex flex-col">
                    <div className="px-6 py-5 text-xl font-bold border-b border-slate-700">
                        User<span className="text-indigo-500">Manager</span>
                    </div>

                    <nav className="flex-1 px-4 py-6 space-y-2">

                        <SidebarLink title="Overview" href="/dashboard" />

                        <SidebarGroup title="Mess Management">
                            <SidebarLink title="Show Users" href="/mess/users" />
                            <SidebarLink title="Add User" href="/mess/add-user" />
                        </SidebarGroup>

                        <SidebarLink title="Coaching / Admission" href="/coaching" />

                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-6">

                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-gray-800">
                            Dashboard Overview
                        </h1>
                        <p className="text-sm text-gray-500">
                            Statistics & system summary
                        </p>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                        <StatCard title="Total Users" value="120" />
                        <StatCard title="Active Users" value="98" />
                        <StatCard title="Inactive Users" value="22" />
                        <StatCard title="Total Rooms" value="35" />
                    </div>

                    {/* Welcome Box */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-2">
                            Welcome back 👋
                        </h2>
                        <p className="text-gray-600">
                            Manage mess users, admissions and financial records from one place.
                        </p>
                    </div>

                </main>
            </div>
        </AuthenticatedLayout>
    );
}
