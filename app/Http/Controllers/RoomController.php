<?php

namespace App\Http\Controllers;

use App\Models\Room;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RoomController extends Controller
{
 public function index(Request $request)
{
    $query = Room::query();

    if ($request->search) {
        $query->where(function ($q) use ($request) {
            $q->where('room_number', 'LIKE', "%{$request->search}%")
              ->orWhere('floor', 'LIKE', "%{$request->search}%");
        });
    }

    if ($request->status) {
        $query->where('status', $request->status);
    }

    return Inertia::render('Rooms/Index', [
        'rooms' => $query->latest()->get(),
        'filters' => $request->only('search', 'status')
    ]);
}

    // Show create form
    public function create()
    {
        return Inertia::render('Rooms/Create');
    }

    // Store room
    public function store(Request $request)
    {
        $request->validate([
            'room_number' => 'required|unique:rooms',
            'capacity' => 'required',
            'floor' => 'required',
            'status' => 'required'
        ]);

        Room::create($request->all());

        return redirect()->route('rooms.index')->with('success', 'Room created');
    }

    // Edit form
    public function edit(Room $room)
    {
        return Inertia::render('Rooms/Edit', [
            'room' => $room
        ]);
    }

    // Update
    public function update(Request $request, Room $room)
    {
        $room->update($request->all());

        return redirect()->route('rooms.index');
    }

    // Delete
    public function destroy(Room $room)
    {
        $room->delete();

        return redirect()->route('rooms.index');
    }
}
