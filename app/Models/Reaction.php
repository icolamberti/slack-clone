<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Reaction extends Model
{
  protected $fillable = ['workspace_id', 'user_id', 'message_id', 'value'];

  public function message(): BelongsTo
  {
    return $this->belongsTo(Message::class);
  }

  public function user(): BelongsTo
  {
    return $this->belongsTo(User::class);
  }
}
