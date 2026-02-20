<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('payments_rent', function (Blueprint $table) {
        $table->id();
        $table->foreignId('user_id')->constrained('mess_users')->cascadeOnDelete();
        $table->date('month');
        $table->decimal('rent_amount', 10, 2);
        $table->decimal('amount_paid', 10, 2)->default(0);
        $table->decimal('amount_due', 10, 2);
        $table->enum('status', ['paid','due'])->default('due');
        $table->timestamp('payment_date')->nullable();
        $table->timestamps();

        $table->unique(['user_id','month']); 
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('payments_rent');
    }
};
