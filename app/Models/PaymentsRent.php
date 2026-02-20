<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\MessUser;

class PaymentsRent extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'month',
        'rent_amount',
        'amount_paid',
        'amount_due',
        'status',
        'payment_date'
    ];

    // Payment belongs to a user
    public function messUser()
    {
        return $this->belongsTo(MessUser::class, 'user_id');
    }
}
