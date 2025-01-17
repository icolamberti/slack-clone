<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Conversation extends Model
{
  use HasUuids;

  public $timestamps = false;

  protected $fillable = ['workspace_id', 'user_one_id', 'user_two_id'];

  public function messages(): HasMany
  {
    return $this->hasMany(Message::class);
  }
}
