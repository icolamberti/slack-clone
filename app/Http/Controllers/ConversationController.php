<?php

namespace App\Http\Controllers;

use App\Models\Workspace;
use Auth;
use Illuminate\Http\Request;

class ConversationController extends Controller
{
  public function show(string $id, string $memberId)
  {
    $workspace = Workspace::with([
      'members',
      'members.user:id,name,avatar',
      'channels',
    ])->findOrFail($id);

    $member = $workspace
      ->members()
      ->with(['user'])
      ->where('user_id', $memberId)
      ->firstOrFail();

    $conversation = $workspace
      ->conversations()
      ->where(function ($query) use ($memberId) {
        $query
          ->where('user_one_id', Auth::id())
          ->where('user_two_id', $memberId);
      })
      ->orWhere(function ($query) use ($memberId) {
        $query
          ->where('user_one_id', $memberId)
          ->where('user_two_id', Auth::id());
      })
      ->first();

    if (!$conversation) {
      $conversation = $workspace->conversations()->create([
        'user_one_id' => Auth::id(),
        'user_two_id' => $memberId,
      ]);
    }

    $conversation->user = $member->user->only(['id', 'name', 'avatar']);

    return inertia('Conversations/Show', [
      'workspace' => $workspace,
      'conversation' => $conversation,
    ]);
  }
}
