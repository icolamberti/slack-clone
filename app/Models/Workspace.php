<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Workspace extends Model
{
  use HasUuids;

  protected $fillable = ['user_id', 'name', 'join_code'];

  protected $hidden = ['join_code'];

  public function members(): HasMany
  {
    return $this->hasMany(Member::class);
  }

  public function user(): BelongsTo
  {
    return $this->belongsTo(User::class);
  }
}
