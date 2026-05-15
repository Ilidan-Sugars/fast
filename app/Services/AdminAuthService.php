<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AdminAuthService
{
    public function login(string $login, string $password): bool
    {
        $query = User::query()
            ->where('email', $login)
            ->orWhere('name', $login)
            ->first();

        if (! $query) {
            return false;
        }

        if (! Hash::check($password, $query->password)) {
            return false;
        }

        Auth::login($query, true);

        return true;
    }
}
