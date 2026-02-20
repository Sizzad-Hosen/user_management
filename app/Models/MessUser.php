<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\RoomAllocation;
use App\Models\PaymentsRent;   


class MessUser extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'phone_number',
        'guardian_number',
        'jamanot_vara_deposit',
        'complain',
        'status',
        'address',
        'join_date',
        'leave_date'
    ];

    // One user can have multiple room allocations
    public function roomAllocations()
    {
        return $this->hasMany(RoomAllocation::class, 'user_id');
    }

    // One user can have multiple payments
    public function payments()
    {
        return $this->hasMany(PaymentsRent::class, 'user_id');
    }

    // Current active room
    public function activeRoom()
    {
        return $this->hasOne(RoomAllocation::class, 'user_id')->where('status', 'active');
    }
}
