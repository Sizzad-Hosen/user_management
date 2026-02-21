<?php

namespace App\Http\Controllers;

use App\Models\MessUser;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MessUserController extends Controller
{
    public function index(Request $request)
    {
        $query = MessUser::query();

        if ($request->search) {
            $query->where('name', 'LIKE', "%{$request->search}%")
                  ->orWhere('phone_number', 'LIKE', "%{$request->search}%")
                  ->orWhere('address', 'LIKE', "%{$request->search}%");
        }

        if ($request->status) {
            $query->where('status', $request->status);
        }

        return Inertia::render('MessUsers/Index', [
            'messUsers' => $query->latest()->get(),
            'filters' => $request->only('search', 'status')
        ]);
    }

    public function create()
    {
        return Inertia::render('MessUsers/Create');
    }

    public function store(Request $request)
    {
   $request->validate([
    'name' => 'required|string|max:255',
    'email' => 'nullable|email|max:255',

    'phone_number' => 'required|string|max:20',
    'guardian_number' => 'nullable|string|max:20',

    'jamanot_vara_deposit' => 'nullable|numeric|min:0',

    'complain' => 'nullable|string',

    'status' => 'required|in:active,left',

    'address' => 'nullable|string',

    'join_date' => 'nullable|date',
    'leave_date' => 'nullable|date|after_or_equal:join_date',
]);

        MessUser::create($request->all());

        return redirect()->route('messUsers.index')->with('success', 'MessUser created');
    }

    public function edit(MessUser $user)
    {
        return Inertia::render('MessUsers/Edit', [
            'user' => $user
        ]);
    }// MessUserController.php



public function update(Request $request, MessUser $user)
{
    $user->update($request->all());

    // Return JSON for Inertia SPA
    return response()->json([
        'success' => true,
        'user' => $user,
        'message' => 'MessUser updated successfully'
    ]);
}

public function destroy(MessUser $user)
{
    $user->delete();

    return response()->json([
        'success' => true,
        'message' => 'MessUser deleted successfully'
    ]);
}
}