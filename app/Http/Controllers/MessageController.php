<?php

namespace App\Http\Controllers;

use App\Events\MessageDeleted;
use App\Events\MessageSent;
use App\Events\MessageUpdated;
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
      ->paginate(20)
      ->appends($request->only('channel', 'conversation', 'parent'));

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

    $message->load([
      'user',
      'reactions',
      'replies',
      'replies.user',
      'replies.reactions',
    ]);

    if ($request->hasFile('image')) {
      $message->update(
        [
          'image' => $request->file('image')->store('messages', 'public'),
        ],
        ['timestamps' => false]
      );
    }

    if ($request->parent_id) {
      $parentMessage = Message::with([
        'user',
        'reactions',
        'replies',
        'replies.user',
        'replies.reactions',
      ])->findOrFail($message->parent_id);

      MessageUpdated::dispatch(
        "message.messages.{$parentMessage->workspace_id}",
        $parentMessage
      );
    } elseif ($request->channel) {
      MessageSent::dispatch(
        "channel.messages.{$message->channel_id}",
        $message
      );
    } elseif ($request->conversation) {
      MessageSent::dispatch(
        "conversation.messages.{$message->conversation_id}",
        $message
      );
    }
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

    if ($message->parent_id) {
      $message = Message::with([
        'user',
        'reactions',
        'replies',
        'replies.user',
        'replies.reactions',
      ])->findOrFail($message->parent_id);
    } else {
      $message->load([
        'user',
        'reactions',
        'replies',
        'replies.user',
        'replies.reactions',
      ]);
    }

    MessageUpdated::dispatch(
      "message.messages.{$message->workspace_id}",
      $message
    );
  }

  public function destroy(string $id, string $message)
  {
    $workspace = Workspace::findOrFail($id);

    $message = $workspace
      ->messages()
      ->where('user_id', Auth::id())
      ->findOrFail($message);

    $message->delete();

    broadcast(
      new MessageDeleted(
        "message.messages.{$message->workspace_id}",
        $message->id
      )
    )->toOthers();
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

    if ($message->parent_id) {
      $message = Message::with([
        'user',
        'reactions',
        'replies',
        'replies.user',
        'replies.reactions',
      ])->findOrFail($message->parent_id);
    } else {
      $message->load([
        'user',
        'reactions',
        'replies',
        'replies.user',
        'replies.reactions',
      ]);
    }

    MessageUpdated::dispatch(
      "message.messages.{$message->workspace_id}",
      $message
    );
  }
}
