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
 
    Schema::create('mess_users', function (Blueprint $table) {
        $table->id();
        $table->string('name');
        $table->string('email')->unique()->nullable();
        $table->string('phone_number')->nullable();
        $table->string('guardian_number')->nullable();
        $table->decimal('jamanot_vara_deposit', 10, 2)->nullable();
        $table->text('complain')->nullable();
        $table->enum('status', ['active', 'left'])->default('active');
        $table->string('address')->nullable();
        $table->date('join_date')->nullable();
        $table->date('leave_date')->nullable();
        $table->timestamps();
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('mess_users');
    }
};
