<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Traits\CommonTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    use CommonTrait;
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            $data = Auth::user();
            return $this->sendResponse(['data'=> $data, 'message' => 'Logged In successfully']);
        }
        return $this->sendError(['message' => 'Authentication Error']);
    }

    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required',
            'password' => 'required',
        ]);

        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->save();
        return $this->sendResponse(['data' => $user, 'message' => 'User created successfully']);
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();

        return $this->sendResponse(['message' => 'Logged Out successfully']);
    }
}
