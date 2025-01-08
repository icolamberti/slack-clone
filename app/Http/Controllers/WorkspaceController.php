<?php

namespace App\Http\Controllers;

use App\Models\Workspace;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class WorkspaceController extends Controller
{
  public function create()
  {
    return inertia('Workspaces/Create');
  }

  public function store(Request $request)
  {
    $request->validate([
      'name' => 'required|string|max:80|min:3',
    ]);

    $user = Auth::user();

    $joinCode = Str::random(6);

    $workspace = Workspace::create([
      'user_id' => $user->id,
      'name' => $request->name,
      'join_code' => $joinCode,
    ]);

    $workspace->members()->create([
      'user_id' => $user->id,
      'role' => 'admin',
    ]);

    $workspace->channels()->create([
      'name' => 'general',
    ]);

    return to_route('workspaces.show', $workspace->id)->with(
      'success',
      'Workspace created successfully'
    );
  }

  public function update(Request $request)
  {
    $request->validate([
      'name' => 'required|string|max:80|min:3',
    ]);

    Workspace::findOrFail($request->id)->update([
      'name' => $request->name,
    ]);

    session()->flash('success', 'Workspace updated successfully');
  }

  public function show(string $id)
  {
    $workspace = Workspace::with([
      'members',
      'members.user:id,name,avatar',
      'channels',
    ])->findOrFail($id);

    return inertia('Workspaces/Show', [
      'workspace' => $workspace,
    ]);
  }

  public function destroy(string $id)
  {
    $workspace = Workspace::findOrFail($id);

    $workspace->delete();

    $user = Auth::user();

    if ($user->workspaces->count() === 0) {
      return to_route('workspaces.create');
    }

    return to_route('workspaces.show', $user->workspaces->first()->id)->with(
      'success',
      'Workspace deleted successfully'
    );
  }
}
