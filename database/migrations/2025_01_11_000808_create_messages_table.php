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
    Schema::create('messages', function (Blueprint $table) {
      $table->id();
      $table->foreignUuid('user_id')->constrained()->cascadeOnDelete();
      $table->foreignUuid('workspace_id')->constrained()->cascadeOnDelete();
      $table
        ->foreignUuid('channel_id')
        ->nullable()
        ->constrained()
        ->cascadeOnDelete();
      $table
        ->foreignId('parent_id')
        ->nullable()
        ->constrained('messages')
        ->cascadeOnDelete();
      $table->text('body');
      $table->string('image')->nullable();
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('messages');
  }
};
