import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { useEffect } from "react";

export default function Create({ users }) {
    const { data, setData, post, processing, errors } = useForm({
        user_id: "",
        month: "",
        rent_amount: "",
        amount_paid: "",
        amount_due: 0,
        status: "due",
        payment_date: "",
    });

    // Auto calculate amount_due, status, payment_date whenever rent_amount or amount_paid changes
    useEffect(() => {
        const rent = parseFloat(data.rent_amount) || 0;
        const paid = parseFloat(data.amount_paid) || 0;
        const due = rent - paid;
        setData({
            ...data,
            amount_due: due,
            status: due <= 0 ? "paid" : "due",
            payment_date: due <= 0 ? new Date().toISOString().split("T")[0] : "",
        });
    }, [data.rent_amount, data.amount_paid]);

    const submit = (e) => {
        e.preventDefault();
        // Convert month to YYYY-MM-01 for PostgreSQL date column
        const monthValue = data.month ? data.month + "-01" : null;

        post(route("payments.store"), {
            ...data,
            month: monthValue,
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Create Payment" />
            <div className="max-w-4xl mx-auto mt-10 bg-white shadow rounded-xl p-8">
                <h2 className="text-2xl font-bold mb-6">Create Payment</h2>

                <form onSubmit={submit} className="space-y-6">

                    {/* User */}
                    <div>
                        <label className="block font-medium mb-1">Select User</label>
                        <select
                            value={data.user_id}
                            onChange={(e) => setData("user_id", e.target.value)}
                            className="w-full border rounded p-2"
                        >
                            <option value="">Select User</option>
                            {users.map((user) => (
                                <option key={user.id} value={user.id}>{user.name}</option>
                            ))}
                        </select>
                        {errors.user_id && <p className="text-red-500 text-sm">{errors.user_id}</p>}
                    </div>

                    {/* Month */}
                    <div>
                        <label className="block font-medium mb-1">Month</label>
                        <input
                            type="month"
                            value={data.month}
                            onChange={(e) => setData("month", e.target.value)}
                            className="w-full border rounded p-2"
                        />
                        {errors.month && <p className="text-red-500 text-sm">{errors.month}</p>}
                    </div>

                    {/* Rent Amount */}
                    <div>
                        <label className="block font-medium mb-1">Rent Amount</label>
                        <input
                            type="number"
                            value={data.rent_amount}
                            onChange={(e) => setData("rent_amount", e.target.value)}
                            className="w-full border rounded p-2"
                        />
                        {errors.rent_amount && <p className="text-red-500 text-sm">{errors.rent_amount}</p>}
                    </div>

                    {/* Amount Paid */}
                    <div>
                        <label className="block font-medium mb-1">Amount Paid</label>
                        <input
                            type="number"
                            value={data.amount_paid}
                            onChange={(e) => setData("amount_paid", e.target.value)}
                            className="w-full border rounded p-2"
                        />
                        {errors.amount_paid && <p className="text-red-500 text-sm">{errors.amount_paid}</p>}
                    </div>

                    {/* Amount Due (readonly) */}
                    <div>
                        <label className="block font-medium mb-1">Amount Due</label>
                        <input
                            type="number"
                            value={data.amount_due}
                            readOnly
                            className="w-full border rounded p-2 bg-gray-100"
                        />
                    </div>

                    {/* Status (readonly) */}
                    <div>
                        <label className="block font-medium mb-1">Status</label>
                        <input
                            type="text"
                            value={data.status}
                            readOnly
                            className="w-full border rounded p-2 bg-gray-100"
                        />
                    </div>

                    {/* Payment Date (readonly if paid) */}
                    <div>
                        <label className="block font-medium mb-1">Payment Date</label>
                        <input
                            type="date"
                            value={data.payment_date}
                            readOnly
                            className="w-full border rounded p-2 bg-gray-100"
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                    >
                        {processing ? "Saving..." : "Create Payment"}
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}