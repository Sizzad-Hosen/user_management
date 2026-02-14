import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";

export function SidebarLink({ title, href = "#" }) {
    const { url } = usePage();
    const active = url.startsWith(href);

    return (
        <Link
            href={href}
            className={`block rounded-md px-3 py-2 text-sm font-medium transition ${
                active
                    ? "bg-slate-700 text-white"
                    : "hover:bg-slate-800 text-slate-200"
            }`}
        >
            {title}
        </Link>
    );
}


export function SidebarGroup({ title, children }) {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between px-3 py-2 text-xs uppercase tracking-wide text-slate-400 hover:text-white"
            >
                {title}
                <span>{open ? "▾" : "▸"}</span>
            </button>

            {open && (
                <div className="space-y-1 mt-2 ml-2">
                    {children}
                </div>
            )}
        </div>
    );
}

export function StatCard({ title, value }) {
    return (
        <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-sm text-gray-500">{title}</p>
            <p className="mt-2 text-3xl font-bold text-gray-800">{value}</p>
        </div>
    );
}
