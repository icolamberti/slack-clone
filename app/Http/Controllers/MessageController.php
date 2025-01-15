<?php

namespace App\Http\Controllers;

use App\Models\Workspace;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MessageController extends Controller
{
  public function store(string $id, Request $request)
  {
    $request->validate([
      'body' => 'required',
      'image' => 'nullable|image',
    ]);

    if (
      !$request->hasFile('image') &&
      $request->body === '{"ops":[{"insert":"\n"}]}'
    ) {
      session()->flash('error', 'Please enter a message or upload an image.');
      return;
    }

    $workspace = Workspace::findOrFail($id);

    $message = $workspace->messages()->create([
      'user_id' => Auth::id(),
      'channel_id' => $request->channel,
      'conversation_id' => $request->conversation,
      'parent_id' => $request->parent_id,
      'body' => $request->body,
    ]);

    if ($request->hasFile('image')) {
      $message->update(
        [
          'image' => $request->file('image')->store('messages', 'public'),
        ],
        ['timestamps' => false]
      );
    }
  }
}
