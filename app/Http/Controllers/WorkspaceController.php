<?php

namespace App\Http\Controllers;

use App\Models\Workspace;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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

    $workspace = $user->workspaces()->create([
      'name' => $request->name,
      'join_code' => '123456',
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
