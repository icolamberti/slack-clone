<?php

use App\Models\User;
use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('channel.messages.{channelId}', function (
  User $user,
  string $channelId
) {
  return true;

  // Channel::findOrFail($channelId)
  //   ->workspace->members()
  //   ->where('user_id', $user->id)
  //   ->exists();
});
