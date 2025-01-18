<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\Workspace;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MessageController extends Controller
{
  public function index(Request $request)
  {
    $workspace = $request->id;
    $channel = $request->channel;
    $conversation = $request->conversation;
    $parent = $request->parent;

    if (!$workspace || (!$channel && !$conversation && $parent)) {
      abort(404);
    }

    $messages = Message::query()
      ->with([
        'user',
        'reactions',
        'replies',
        'replies.user',
        'replies.reactions',
      ])
      ->where('workspace_id', $workspace)
      ->when($channel, function ($query, $channel) {
        $query->where('channel_id', $channel);
      })
      ->when($parent, function ($query, $parent) {
        $query->where('parent_id', $parent);
      })
      ->when($conversation, function ($query, $conversation) {
        $query->where('conversation_id', $conversation);
      })
      ->when(!$parent, function ($query) {
        $query->whereNull('parent_id');
      })
      ->orderByDesc('created_at')
      ->paginate(20);

    return [
      'messages' => $messages,
    ];
  }

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

    // TODO: event broadcasting
  }

  public function update(string $id, string $message, Request $request)
  {
    $request->validate([
      'body' => 'required',
    ]);

    $workspace = Workspace::findOrFail($id);

    $message = $workspace
      ->messages()
      ->where('user_id', Auth::id())
      ->findOrFail($message);

    $message->update([
      'body' => $request->body,
    ]);

    // TODO: event broadcasting
  }

  public function destroy(string $id, string $message)
  {
    $workspace = Workspace::findOrFail($id);

    $message = $workspace
      ->messages()
      ->where('user_id', Auth::id())
      ->findOrFail($message);

    $message->delete();

    // TODO: event broadcasting
  }

  public function addReaction(string $id, string $message, Request $request)
  {
    $workspace = Workspace::findOrFail($id);

    $message = $workspace->messages()->findOrFail($message);

    $reaction = $message->reactions()->where('user_id', Auth::id())->first();

    if ($reaction && $reaction->value === $request->value) {
      $reaction->delete();
    } else {
      $message->reactions()->updateOrCreate(
        [
          'workspace_id' => $workspace->id,
          'user_id' => Auth::id(),
        ],
        [
          'value' => $request->value,
        ]
      );
    }

    // TODO: event broadcasting
  }
}
