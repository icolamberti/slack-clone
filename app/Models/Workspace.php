<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Workspace extends Model
{
  use HasUuids;

  protected $fillable = ['name', 'join_code'];

  protected $hidden = ['join_code'];

  public function user(): BelongsTo
  {
    return $this->belongsTo(User::class);
  }
}
