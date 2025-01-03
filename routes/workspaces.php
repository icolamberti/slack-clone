<?php

use App\Http\Controllers\WorkspaceController;
use Illuminate\Support\Facades\Route;

Route::prefix('workspaces')
  ->name('workspaces.')
  ->group(function () {
    Route::get('create', [WorkspaceController::class, 'create'])->name(
      'create'
    );

    Route::post('store', [WorkspaceController::class, 'store'])->name('store');

    Route::get('{id}', [WorkspaceController::class, 'show'])
      ->middleware(['workspace.member'])
      ->name('show');

    Route::patch('{id}', [WorkspaceController::class, 'update'])
      ->middleware(['workspace.admin'])
      ->name('update');

    Route::delete('{id}', [WorkspaceController::class, 'destroy'])
      ->middleware(['workspace.admin'])
      ->name('destroy');
  });
