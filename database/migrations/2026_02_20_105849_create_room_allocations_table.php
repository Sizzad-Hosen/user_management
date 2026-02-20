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
        Schema::create('room_allocations', function (Blueprint $table) {
        $table->id();
        $table->foreignId('room_id')->constrained('rooms')->cascadeOnDelete();
        $table->foreignId('user_id')->constrained('mess_users')->cascadeOnDelete();
        $table->date('start_date');
        $table->date('end_date')->nullable();
        $table->enum('status', ['active','ended'])->default('active');
        $table->timestamps();

        $table->unique(['room_id','start_date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('room_allocations');
    }
};
