<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Channel extends Model
{
  use HasUuids;

  protected $fillable = ['name'];

  public function channel(): BelongsTo
  {
    return $this->belongsTo(Workspace::class);
  }

  public function messages(): HasMany
  {
    return $this->hasMany(Message::class);
  }
}
