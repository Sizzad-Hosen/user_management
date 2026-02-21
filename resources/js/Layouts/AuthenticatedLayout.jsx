import { Link } from "@inertiajs/react";

export default function AuthenticatedLayout({ children }) {
    return (
        <div className="flex min-h-screen bg-gray-100">

            {/* Sidebar 20% */}
            <aside className="w-1/6 bg-slate-900 text-slate-200 hidden md:flex flex-col">

                <div className="px-6 py-5 text-xl font-bold border-b border-slate-700">
                    User<span className="text-indigo-500">Manager</span>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-2">

                    <Link href="/dashboard" className="block px-3 py-2 rounded hover:bg-slate-800">
                        Overview
                    </Link>

                    <p className="text-xs uppercase text-slate-400 mt-4 mb-2">Mess Management</p>

                    <Link href="/rooms" className="block px-3 py-2 rounded hover:bg-slate-800">
                        Show All Rooms
                    </Link>

                    <Link href="/rooms/create" className="block px-3 py-2 rounded hover:bg-slate-800">
                        Create Room
                    </Link>

                    <Link href="/users" className="block px-3 py-2 rounded hover:bg-slate-800">
                        Show Users
                    </Link>

                    <Link href="/users/create" className="block px-3 py-2 rounded hover:bg-slate-800">
                        Add User
                    </Link>

                </nav>
            </aside>

            {/* Content 80% */}
            <main className="w-4/5 p-6">
                {children}
            </main>

        </div>
    );
}
