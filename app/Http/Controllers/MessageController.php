<?php

namespace App\Http\Controllers;

use App\Models\Workspace;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MessageController extends Controller
{
  public function store(string $id, string $channel, Request $request)
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

    $channel = $workspace->channels()->findOrFail($channel);

    $message = $channel->messages()->create([
      'workspace_id' => $workspace->id,
      'user_id' => Auth::id(),
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

    return to_route('workspaces.channels.show', [
      $workspace->id,
      $channel->id,
    ])->with('success', 'Channel created successfully!');
  }
}
