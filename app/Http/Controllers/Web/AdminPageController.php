<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class AdminPageController extends Controller
{
    public function home()
    {
        return Inertia::render('HomePage');
    }

    public function login()
    {
        return Inertia::render('AdminLoginPage');
    }

    public function panel()
    {
        return Inertia::render('AdminPanelPage');
    }
}
