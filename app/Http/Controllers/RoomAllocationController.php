<?php

namespace App\Http\Controllers;

use App\Models\RoomAllocation;
use App\Models\Room;
use App\Models\MessUser;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class RoomAllocationController extends Controller
{
    /**
     * Display a listing of room allocations.
     */
public function index(Request $request)
{
    $query = RoomAllocation::with(['messUser', 'room']);

    // 🔍 Search by room number or user name
    if ($request->search) {
        $query->where(function ($q) use ($request) {
            $q->whereHas('room', function ($room) use ($request) {
                $room->where('room_number', 'like', '%' . $request->search . '%');
            })
            ->orWhereHas('messUser', function ($user) use ($request) {
                $user->where('name', 'like', '%' . $request->search . '%');
            });
        });
    }

    // 🎯 Filter by status
    if ($request->status) {
        $query->where('status', $request->status);
    }

    $allocations = $query->latest()->get();

    return Inertia::render('RoomAllocations/Index', [
        'allocations' => $allocations,
        'filters' => $request->only('search', 'status'),
    ]);
}
    /**
     * Show form for creating new allocation.
     */
    public function create()
    {
        return Inertia::render('RoomAllocations/Create', [
            'rooms' => Room::where('status', 'available')->get(),
            'users' => MessUser::where('status', 'active')->get(),
        ]);
    }

    /**
     * Store new room allocation.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'room_id'     => 'required|exists:rooms,id',
            'user_id'     => 'required|exists:mess_users,id',
            'start_date'  => 'required|date',
            'end_date'    => 'nullable|date|after_or_equal:start_date',
            'status'        => 'nullable|string|max:500',
        ]);

        DB::transaction(function () use ($validated) {

            $allocation = RoomAllocation::create($validated);

            // Optional: update room status
            Room::where('id', $validated['room_id'])
                ->update(['status' => 'full']);
        });

        return redirect()
            ->route('roomAllocations.index')
            ->with('success', 'Room allocated successfully.');
    }

    /**
     * Display single allocation.
     */
    public function show(RoomAllocation $roomAllocation)
    {
        $roomAllocation->load(['messUser', 'room']);

        return Inertia::render('RoomAllocations/Show', [
            'messUserDetails' => $roomAllocation,
        ]);
    }

    /**
     * Show edit form.
     */
    public function edit(RoomAllocation $roomAllocation)
    {
        return Inertia::render('RoomAllocations/Edit', [
            'allocation' => $roomAllocation->load(['user', 'room']),
            'rooms'      => Room::all(),
            'users'      => MessUser::all(),
        ]);
    }

    /**
     * Update allocation.
     */
    public function update(Request $request, RoomAllocation $roomAllocation)
    {
        $validated = $request->validate([
            'room_id'     => 'required|exists:rooms,id',
            'user_id'     => 'required|exists:mess_users,id',
            'start_date'  => 'required|date',
            'end_date'    => 'nullable|date|after_or_equal:start_date',
            'note'        => 'nullable|string|max:500',
        ]);

        DB::transaction(function () use ($validated, $roomAllocation) {

            // If room changed, update old room status
            if ($roomAllocation->room_id !== $validated['room_id']) {
                Room::where('id', $roomAllocation->room_id)
                    ->update(['status' => 'available']);

                Room::where('id', $validated['room_id'])
                    ->update(['status' => 'occupied']);
            }

            $roomAllocation->update($validated);
        });

        return redirect()
            ->route('roomAllocations.index')
            ->with('success', 'Room allocation updated successfully.');
    }

 
    public function destroy(RoomAllocation $roomAllocation)
    {
        DB::transaction(function () use ($roomAllocation) {

            // Free the room
            Room::where('id', $roomAllocation->room_id)
                ->update(['status' => 'available']);

            $roomAllocation->delete();
        });

        return redirect()
            ->back()
            ->with('success', 'Room allocation deleted successfully.');
    }
}