<?php

namespace App\Http\Controllers;

use App\Models\Workspace;
use Illuminate\Http\Request;
use Str;

class ChannelController extends Controller
{
  public function messages(string $id, string $channel)
  {
    $workspace = Workspace::findOrFail($id);

    $channel = $workspace->channels()->findOrFail($channel);

    $messages = $channel
      ->messages()
      ->with([
        'user',
        'reactions',
        'replies',
        'replies.user',
        'replies.reactions',
      ])
      ->whereNull('parent_id')
      ->orderByDesc('created_at')
      ->paginate(20);

    return [
      'messages' => $messages,
    ];
  }

  public function show(string $id, string $channel)
  {
    $workspace = Workspace::with([
      'members',
      'members.user:id,name,avatar',
      'channels',
    ])->findOrFail($id);

    $channel = $workspace->channels()->findOrFail($channel);

    $messages = $channel
      ->messages()
      ->with(['user', 'reactions', 'replies'])
      ->whereNull('parent_id')
      ->orderByDesc('created_at')
      ->get();

    return inertia('Channels/Show', [
      'workspace' => $workspace,
      'channel' => $channel,
      'messages' => $messages,
    ]);
  }

  public function store(Request $request)
  {
    $request->validate([
      'name' => 'required|string|max:80|min:3',
    ]);

    if ($request->name === 'general') {
      return back()->with(
        'error',
        'You cannot add a channel with name "general"'
      );
    }

    $workspace = Workspace::findOrFail($request->id);

    $channel = $workspace->channels()->create([
      'name' => Str::slug($request->name),
    ]);

    return to_route('workspaces.channels.show', [
      $workspace->id,
      $channel->id,
    ])->with('success', 'Channel created successfully!');
  }

  public function update(Request $request)
  {
    $request->validate([
      'name' => 'required|string|max:80|min:3',
    ]);

    $channel = Workspace::findOrFail($request->id)
      ->channels()
      ->findOrFail($request->channel);

    if ($channel->name === 'general') {
      return back()->with('error', 'You cannot update the general channel');
    }

    $channel->update([
      'name' => $request->name,
    ]);

    session()->flash('success', 'Channel updated successfully');
  }

  public function destroy(string $id, string $channel)
  {
    $workspace = Workspace::with([
      'members',
      'members.user:id,name,avatar',
      'channels',
    ])->findOrFail($id);

    $channel = $workspace->channels()->findOrFail($channel);

    if ($channel->name === 'general') {
      return back()->with('error', 'You cannot delete the general channel');
    }

    $channel->delete();

    $workspace->refresh();

    session()->flash('success', 'Channel deleted successfully');

    if ($workspace->channels->count() > 0) {
      $channel =
        $workspace->channels->firstWhere('name', 'general') ??
        $workspace->channels->first();

      return to_route('workspaces.channels.show', [
        $workspace->id,
        $channel->id,
      ]);
    }

    return to_route('workspaces.show', $workspace->id);
  }
}
