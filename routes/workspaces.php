<?php

use App\Http\Controllers\ChannelController;
use App\Http\Controllers\JoinWorkspaceController;
use App\Http\Controllers\MessageController;
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

    // Channels
    Route::prefix('{id}/channels')
      ->middleware(['workspace.member'])
      ->name('channels.')
      ->group(function () {
        Route::post('', [ChannelController::class, 'store'])
          ->middleware(['workspace.admin'])
          ->name('store');

        Route::get('{channel}', [ChannelController::class, 'show'])->name(
          'show'
        );

        Route::patch('{channel}', [ChannelController::class, 'update'])
          ->middleware(['workspace.admin'])
          ->name('update');

        Route::delete('{channel}', [ChannelController::class, 'destroy'])
          ->middleware(['workspace.admin'])
          ->name('destroy');

        // Messages
        Route::prefix('{channel}/messages')
          ->name('messages.')
          ->group(function () {
            Route::post('', [MessageController::class, 'store'])->name('store');
          });
      });

    // Join workspace
    Route::get('{id}/join', [JoinWorkspaceController::class, 'create'])->name(
      'join.create'
    );

    Route::post('{id}/join/update', [JoinWorkspaceController::class, 'update'])
      ->middleware('workspace.admin')
      ->name('join.update');
  });
