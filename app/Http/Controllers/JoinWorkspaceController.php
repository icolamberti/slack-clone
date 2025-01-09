<?php

namespace App\Http\Controllers;

use App\Models\Workspace;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Str;

class JoinWorkspaceController extends Controller
{
  public function create(Request $request)
  {
    $workspace = Workspace::findOrFail($request->id);

    if ($workspace->join_code !== $request->code) {
      return back()->with('error', 'Invalid join code');
    }

    [$member, $created] = $workspace->members()->firstOrCreate([
      'user_id' => Auth::user()->id,
    ]);

    if ($created) {
      $message = 'You have joined the workspace';
    } else {
      $message = 'Already a member of this workspace';
    }

    return to_route('workspaces.show', $workspace->id)->with(
      'success',
      $message
    );
  }

  public function update(Request $request)
  {
    $workspace = Workspace::findOrFail($request->id);

    $joinCode = Str::random(6);

    $workspace->update(['join_code' => $joinCode]);

    session()->flash('success', 'Invite code regenerated');
  }
}
