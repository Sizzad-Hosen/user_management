import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";

export default function Index() {
    const { payments, filters } = usePage().props;

    const { data, setData, get, processing } = useForm({
        search: filters.search || "",
        status: filters.status || "",
    });

    const handleFilter = (e) => {
        e.preventDefault();
        get(route("payments-rent.index"), { preserveState: true });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Payments" />

            <div className="max-w-7xl mx-auto mt-10">
                <h2 className="text-2xl font-bold mb-4">Payments List</h2>

                {/* Search & Filter */}
                <form onSubmit={handleFilter} className="flex gap-4 mb-6">
                    <input
                        type="text"
                        placeholder="Search by user name or ID"
                        value={data.search}
                        onChange={(e) => setData("search", e.target.value)}
                        className="border rounded p-2 w-64"
                    />

                    <select
                        value={data.status}
                        onChange={(e) => setData("status", e.target.value)}
                        className="border rounded p-2"
                    >
                        <option value="">All Status</option>
                        <option value="paid">Paid</option>
                        <option value="due">Due</option>
                    </select>

                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700"
                    >
                        Filter
                    </button>
                </form>

                {/* Table */}
                <div className="overflow-x-auto bg-white shadow rounded-xl">
                    <table className="min-w-full table-auto">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2">#ID</th>
                                <th className="px-4 py-2">User ID</th>
                                <th className="px-4 py-2">User Name</th>
                                <th className="px-4 py-2">Month</th>
                                <th className="px-4 py-2">Rent Amount</th>
                                <th className="px-4 py-2">Amount Paid</th>
                                <th className="px-4 py-2">Amount Due</th>
                                <th className="px-4 py-2">Status</th>
                                <th className="px-4 py-2">Payment Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.data.length > 0 ? (
                                payments.data.map((payment) => (
                                    <tr key={payment.id} className="border-b">
                                        <td className="px-4 py-2">{payment.id}</td>
                                        <td className="px-4 py-2">{payment.mess_user?.id || payment.user_id}</td>
                                        <td className="px-4 py-2">{payment.mess_user?.name || "N/A"}</td>
                                        <td className="px-4 py-2">{payment.month}</td>
                                        <td className="px-4 py-2">{payment.rent_amount}</td>
                                        <td className="px-4 py-2">{payment.amount_paid}</td>
                                        <td className="px-4 py-2">{payment.amount_due}</td>
                                        <td className={`px-4 py-2 font-semibold ${payment.status === "paid" ? "text-green-600" : "text-red-600"}`}>
                                            {payment.status}
                                        </td>
                                        <td className="px-4 py-2">{payment.payment_date || "-"}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={9} className="text-center py-4">
                                        No payments found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

            </div>
        </AuthenticatedLayout>
    );
}