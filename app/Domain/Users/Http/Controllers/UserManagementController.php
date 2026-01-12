<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserManagementController extends Controller
{
    public function index(Request $request)
    {
        // We already protected with permission:users.manage in routes

        $users = User::with('roles')
            ->orderBy('id')
            ->paginate(10)
            ->withQueryString();

        $roles = Role::all()->pluck('name'); // ["admin", "candidate"]

        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
            'roles' => $roles,
        ]);
    }

    public function updateRole(Request $request, User $user)
    {
        $request->validate([
            'role' => ['required', 'string', 'exists:roles,name'],
        ]);

        // Do not let admin remove their own last admin role if you want safety
        $roleName = $request->input('role');

        // Clear all roles and set new one
        $user->syncRoles([$roleName]);

        return redirect()
            ->back()
            ->with('success', "Role updated to {$roleName}.");
    }

    public function destroy(Request $request, User $user)
    {
        // Optional: prevent deleting yourself
        if ($request->user()->id === $user->id) {
            return redirect()
                ->back()
                ->with('error', 'You cannot delete your own account.');
        }

        $user->delete();

        return redirect()
            ->back()
            ->with('success', 'User deleted.');
    }
}
