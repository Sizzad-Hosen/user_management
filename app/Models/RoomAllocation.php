<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\MessUser;
use App\Models\PaymentsRent;


class RoomAllocation extends Model
{
    use HasFactory;

    protected $fillable = [
        'room_id',
        'user_id',
        'start_date',
        'end_date',
        'status'
    ];
    public function paymentsRent()
    {
        return $this->hasMany(PaymentsRent::class, 'user_id', 'user_id');
    }
    // Allocation belongs to a user
    public function messUser()
    {
        return $this->belongsTo(MessUser::class, 'user_id');
    }

    // Allocation belongs to a room
    public function room()
    {
        return $this->belongsTo(Room::class, 'room_id');
    }
}
