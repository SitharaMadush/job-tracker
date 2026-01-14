<?php

namespace App\Http\Controllers;

use App\Application\Users\UserManagementService;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserManagementController extends Controller
{
    public function __construct(
        private readonly UserManagementService $service
    ) {}

    public function index(Request $request)
    {
        $users = $this->service->listUsers($request->user());
        $roles = Role::all()->pluck('name');

        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
            'roles' => $roles,
        ]);
    }

    public function updateRole(Request $request, User $user)
    {
        dd($request->all());
        $request->validate([
            'role' => ['required', 'string', 'exists:roles,name'],
        ]);

        $this->service->updateRole($request->user(), $user->id, $request->string('role'));

        return redirect()->back()->with('success', 'Role updated.');
    }

    public function destroy(Request $request, User $user)
    {
        $this->service->deleteUser($request->user(), $user->id);

        return redirect()->back()->with('success', 'User deleted.');
    }
}
