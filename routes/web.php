<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;
use App\Http\Controllers\AdminController;

Route::inertia('/', 'Welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'Dashboard')->name('dashboard');

    Route::get('admin', [AdminController::class, 'index'])
        ->name('admin');

    Route::post('admin/users/{user}/toggle-role', [AdminController::class, 'toggleRole'])
        ->name('admin.users.toggle-role');
});

require __DIR__.'/settings.php';
