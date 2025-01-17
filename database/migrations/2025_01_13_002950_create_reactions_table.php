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
    Schema::create('reactions', function (Blueprint $table) {
      $table->id();
      $table->foreignUuid('workspace_id')->constrained()->onDelete('cascade');
      $table->foreignUuid('user_id')->constrained()->onDelete('cascade');
      $table->foreignUuid('message_id')->constrained()->onDelete('cascade');
      $table->string('value');
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('reactions');
  }
};
