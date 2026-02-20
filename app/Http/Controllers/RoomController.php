<?php

namespace App\Http\Controllers;

use App\Models\Room;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RoomController extends Controller
{
    // Show all rooms
    public function index()
    {
        return Inertia::render('Rooms/Index', [
            'rooms' => Room::latest()->get()
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
