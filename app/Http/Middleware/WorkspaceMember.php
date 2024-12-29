<?php

namespace App\Http\Middleware;

use App\Models\Workspace;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class WorkspaceMember
{
  /**
   * Handle an incoming request.
   *
   * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
   */
  public function handle(Request $request, Closure $next): Response
  {
    $user = $request->user();
    $workspace = Workspace::with([
      'members' => function ($query) use ($user) {
        $query->where('user_id', $user->id);
      },
    ])->findOrFail($request->route('id'));

    if ($workspace->members->isEmpty()) {
      return abort(401);
    }

    return $next($request);
  }
}
