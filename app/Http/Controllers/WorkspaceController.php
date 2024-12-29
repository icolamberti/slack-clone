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
      'name' => 'required|string|max:255|min:3',
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

    return to_route('workspaces.show', $workspace->id)->with(
      'success',
      'Workspace created successfully'
    );
  }

  public function show(string $id)
  {
    $workspace = Workspace::findOrFail($id);

    return inertia('Workspaces/Show', [
      'workspace' => $workspace,
    ]);
  }
}
