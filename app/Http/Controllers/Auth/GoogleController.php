<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;

class GoogleController extends Controller
{
  public function store(): RedirectResponse
  {
    $googleUser = Socialite::driver('google')->user();

    $user = User::where('email', $googleUser->email)->first();

    if (!$user) {
      $user = User::create([
        'name' => $googleUser->name,
        'email' => $googleUser->email,
        'password' => Str::random(10),
        'email_verified_at' => now(),
        'google_token' => $googleUser->token,
      ]);
    }

    $user->update([
      'avatar' => $googleUser->avatar,
    ]);

    if ($user->email_verified_at === null) {
      $user->update([
        'email_verified_at' => now(),
      ]);
    }

    Auth::login($user);

    return to_route('dashboard');
  }
}
