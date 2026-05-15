<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\AdminLoginRequest;
use App\Services\AdminAuthService;
use Illuminate\Http\JsonResponse;

class AdminAuthController extends Controller
{
    public function login(AdminLoginRequest $request, AdminAuthService $authService): JsonResponse
    {
        $validated = $request->validated();
        $login = $validated['login'];
        $password = $validated['password'];

        if (! $authService->login($login, $password)) {
            return response()->json(['message' => 'Неверный логин или пароль'], 401);
        }

        $request->session()->regenerate();

        return response()->json(['message' => 'Успешный вход']);
    }
}
