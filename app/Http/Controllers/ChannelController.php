<?php

namespace App\Http\Controllers;

use App\Models\Workspace;
use Illuminate\Http\Request;
use Str;

class ChannelController extends Controller
{
  public function show(string $id, string $channel)
  {
    $workspace = Workspace::with([
      'members',
      'members.user:id,name,avatar',
      'channels',
    ])->findOrFail($id);

    $channel = $workspace->channels()->findOrFail($channel);

    return inertia('Channels/Show', [
      'workspace' => $workspace,
      'channel' => $channel,
    ]);
  }

  public function store(Request $request)
  {
    $request->validate([
      'name' => 'required|string|max:80|min:3',
    ]);

    $workspace = Workspace::findOrFail($request->id);

    $channel = $workspace->channels()->create([
      'name' => Str::slug($request->name),
    ]);

    return to_route('workspaces.channels.show', [
      $workspace->id,
      $channel->id,
    ])->with('success', 'Channel created successfully!');
  }
}
