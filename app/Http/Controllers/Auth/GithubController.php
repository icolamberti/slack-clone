<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;

class GithubController extends Controller
{
  public function store(Request $request): RedirectResponse
  {
    $state = $request->get('state');
    $request->session()->put('state', $state);

    $githubUser = Socialite::driver('github')->user();

    $user = User::where('email', $githubUser->email)->first();

    if (!$user) {
      $user = User::create([
        'name' => $githubUser->name,
        'email' => $githubUser->email,
        'password' => Str::random(10),
        'email_verified_at' => now(),
        'github_token' => $githubUser->token,
      ]);
    }
    if ($user->avatar !== $githubUser->avatar) {
      $user->update([
        'avatar' => $githubUser->avatar,
      ]);
    }

    if ($user->github_token !== $githubUser->token) {
      $user->update([
        'github_token' => $githubUser->token,
      ]);
    }

    if ($user->email_verified_at === null) {
      $user->update([
        'email_verified_at' => now(),
      ]);
    }

    Auth::login($user);

    return to_route('dashboard');
  }
}
