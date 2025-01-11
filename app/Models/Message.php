<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
  protected $fillable = [
    'body',
    'image',
    'user_id',
    'workspace_id',
    'parent_id',
  ];
}
