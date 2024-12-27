<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
  public function dashboard()
  {
    $user = Auth::user();

    if ($user->workspaces->count() === 0) {
      return to_route('workspaces.create');
    }

    return to_route('workspaces.show', $user->workspaces->first()->id);
  }
}
