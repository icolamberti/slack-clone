<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  /**
   * Run the migrations.
   */
  public function up(): void
  {
    Schema::create('conversations', function (Blueprint $table) {
      $table->uuid('id')->primary();
      $table->foreignUuid('workspace_id')->constrained()->cascadeOnDelete();
      $table
        ->foreignUuid('user_one_id')
        ->constrained('users')
        ->cascadeOnDelete();
      $table
        ->foreignUuid('user_two_id')
        ->constrained('users')
        ->cascadeOnDelete();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('conversations');
  }
};
