<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AdminAuthController;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\VacancyController;
use App\Http\Controllers\Web\AdminPageController;

Route::get('/', [AdminPageController::class, 'home'])->name('home');
Route::get('/admin/login', [AdminPageController::class, 'login'])->name('login');

Route::middleware(['auth'])->group(function () {
    Route::get('/admin', [AdminPageController::class, 'panel'])->name('admin.panel');
    Route::post('/admin/logout', function () {
        auth()->logout();
        request()->session()->invalidate();
        request()->session()->regenerateToken();
        return redirect('/');
    })->name('admin.logout');

    Route::post('/api/services', [ServiceController::class, 'store']);
    Route::post('/api/vacancies', [VacancyController::class, 'store']);
});

Route::post('/api/admin/login', [AdminAuthController::class, 'login']);
