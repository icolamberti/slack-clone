<?php

namespace App\Http\Controllers;

use App\Models\Workspace;
use Illuminate\Http\Request;
use Str;

class JoinWorkspaceController extends Controller
{
  public function update(Request $request)
  {
    $workspace = Workspace::findOrFail($request->id);

    $joinCode = Str::random(6);

    $workspace->update(['join_code' => $joinCode]);

    session()->flash('success', 'Invite code regenerated');
  }
}
