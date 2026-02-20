<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\RoomAllocation;



class Room extends Model
{
    use HasFactory;

    protected $fillable = [
        'room_number',
        'capacity',
        'floor',
        'status'
    ];

    // One room can have many allocations over time
    public function allocations()
    {
        return $this->hasMany(RoomAllocation::class, 'room_id');
    }

    // Current active allocation
    public function currentAllocation()
    {
        return $this->hasOne(RoomAllocation::class, 'room_id')->where('status', 'active');
    }
}
