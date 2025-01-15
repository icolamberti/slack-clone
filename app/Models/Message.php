<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Message extends Model
{
  protected $fillable = [
    'user_id',
    'workspace_id',
    'channel_id',
    'parent_id',
    'conversation_id',
    'body',
    'image',
  ];

  public function user(): BelongsTo
  {
    return $this->belongsTo(User::class);
  }

  public function reactions(): HasMany
  {
    return $this->hasMany(Reaction::class);
  }

  public function replies(): HasMany
  {
    return $this->hasMany(Message::class, 'parent_id');
  }
}
