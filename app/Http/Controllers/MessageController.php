<?php

namespace App\Http\Controllers;

use App\Models\Workspace;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MessageController extends Controller
{
  public function store(string $id, string $channel, Request $request)
  {
    session()->flash('workspace', $id);
    $request->validate([
      'body' => 'required',
      'image' => 'nullable|image',
    ]);

    $workspace = Workspace::findOrFail($id);

    $channel = $workspace->channels()->findOrFail($channel);

    $channel->messages()->create([
      'workspace_id' => $workspace->id,
      'user_id' => Auth::id(),
      'body' => $request->body,
    ]);

    return to_route('workspaces.channels.show', [
      $workspace->id,
      $channel->id,
    ])->with('success', 'Channel created successfully!');
  }
}
