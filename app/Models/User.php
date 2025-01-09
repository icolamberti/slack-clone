<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable implements MustVerifyEmail
{
  use HasFactory, Notifiable, HasUuids;

  protected $fillable = [
    'name',
    'email',
    'password',
    'email_verified_at',
    'avatar',
    'github_token',
    'google_token',
  ];

  protected $hidden = [
    'password',
    'remember_token',
    'github_token',
    'google_token',
  ];

  protected function casts(): array
  {
    return [
      'email_verified_at' => 'datetime',
      'password' => 'hashed',
    ];
  }

  protected static function boot()
  {
    parent::boot();

    static::addGlobalScope('withRelations', function ($builder) {
      $builder->with(['workspaces']);
    });
  }

  public function workspaces(): BelongsToMany
  {
    return $this->belongsToMany(Workspace::class)
      ->using(Member::class)
      ->orderBy('name');
  }
}
