<?php

namespace App\Http\Controllers;

use App\Models\PaymentsRent;
use App\Models\MessUser;
use Illuminate\Http\Request;
use Inertia\Inertia;


class PaymentsRentController extends Controller
{
    public function index(Request $request)
{
    $query = PaymentsRent::with('messUser');

    if ($request->search) {
        $query->whereHas('messUser', function ($q) use ($request) {
            $q->where('name', 'LIKE', "%{$request->search}%")
              ->orWhere('id', $request->search);
        });
    }

    if ($request->status) {
        $query->where('status', $request->status);
    }

    $payments = $query->latest()->paginate(10)->withQueryString();

    return Inertia::render('Payments/Index', [
        'payments' => $payments,
        'filters' => $request->only('search', 'status')
    ]);
}

    public function create()
    {
        return Inertia::render('Payments/Create', [
            'users' => MessUser::where('status', 'active')->get(),
        ]);
    }

  public function store(Request $request)
{
    // Validate inputs
    $request->validate([
        'user_id' => 'required|exists:mess_users,id',
        'month' => 'required',
        'rent_amount' => 'required|numeric|min:0',
        'amount_paid' => 'required|numeric|min:0',
    ]);

    // Calculate amount due
    $amountDue = $request->rent_amount - $request->amount_paid;

    // Convert month to PostgreSQL date format YYYY-MM-01
    $month = $request->month . "-01"; // 2026-03 -> 2026-03-01

    // Create payment record
    PaymentsRent::create([
        'user_id'      => $request->user_id,
        'month'        => $month,
        'rent_amount'  => $request->rent_amount,
        'amount_paid'  => $request->amount_paid,
        'amount_due'   => $amountDue,
        'status'       => $amountDue <= 0 ? 'paid' : 'due',
        'payment_date' => $amountDue <= 0 ? now() : null,
    ]);

    return redirect()->route('payments.index')
                     ->with('success', 'Payment Created Successfully');
}

    public function show(PaymentsRent $paymentsRent)
    {
        return Inertia::render('Payments/Show', [
            'payment' => $paymentsRent->load('messUser')
        ]);
    }

    public function edit(PaymentsRent $paymentsRent)
    {
        return Inertia::render('Payments/Edit', [
            'payment' => $paymentsRent,
            'users' => MessUser::select('id', 'name')->get()
        ]);
    }

    public function update(Request $request, PaymentsRent $paymentsRent)
    {
        $request->validate([
            'rent_amount' => 'required|numeric|min:0',
            'amount_paid' => 'required|numeric|min:0'
        ]);

        $amountDue = $request->rent_amount - $request->amount_paid;

        $paymentsRent->update([
            'rent_amount' => $request->rent_amount,
            'amount_paid' => $request->amount_paid,
            'amount_due' => $amountDue,
            'status' => $amountDue <= 0 ? 'paid' : 'due',
            'payment_date' => $amountDue <= 0 ? now() : null,
        ]);

        return redirect()->route('payments.index')
            ->with('success', 'Payment Updated Successfully');
    }

    public function destroy(PaymentsRent $paymentsRent)
    {
        $paymentsRent->delete();

        return back()->with('success', 'Payment Deleted Successfully');
    }
}