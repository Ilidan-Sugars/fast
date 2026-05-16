<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        abort_unless($user && $user->role === User::ROLE_ADMIN, 403);

        return Inertia::render('Admin', [
            'users' => User::orderBy('created_at', 'desc')
                ->get(['id', 'name', 'email', 'role', 'created_at']),
        ]);
    }

    public function toggleRole(Request $request, User $user)
    {
        $actor = $request->user();

        abort_unless($actor && $actor->role === User::ROLE_ADMIN, 403);
        abort_if($actor->is($user), 403);

        $user->role = $user->role === User::ROLE_ADMIN ? User::ROLE_USER : User::ROLE_ADMIN;
        $user->save();

        return redirect()->route('admin')->with('success', 'User role updated.');
    }
}
