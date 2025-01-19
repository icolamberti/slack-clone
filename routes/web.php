<?php

use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;

require __DIR__ . '/auth.php';

Route::middleware(['auth', 'verified'])->group(function () {
  Route::get('/', [DashboardController::class, 'dashboard'])->name('dashboard');

  require __DIR__ . '/workspaces.php';
});
