<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class PaymentsRent extends Model
{
    use HasFactory;

    protected $table = 'payments_rent'; // table name

    protected $fillable = [
        'user_id',
        'month',
        'rent_amount',
        'amount_paid',
        'amount_due',
        'status',
        'payment_date',
    ];

    // Relation to MessUser
    public function messUser()
    {
        return $this->belongsTo(MessUser::class, 'user_id', 'id');
    }
}