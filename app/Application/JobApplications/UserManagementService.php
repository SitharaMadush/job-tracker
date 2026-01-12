<?php

namespace App\Application\Users;

use App\Domain\Users\Repositories\UserRepositoryInterface;
use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Spatie\Permission\Models\Role;

class UserManagementService
{
    public function __construct(
        private readonly UserRepositoryInterface $users
    ) {}

    public function listUsers(User $actingUser, int $perPage = 10): LengthAwarePaginator
    {
        abort_unless($actingUser->can('users.manage'), 403);

        return $this->users->paginate($perPage);
    }

    public function updateRole(User $actingUser, int $targetUserId, string $roleName): User
    {
        abort_unless($actingUser->can('users.manage'), 403);

        $user = $this->users->find($targetUserId);

        $role = Role::where('name', $roleName)->firstOrFail();

        // Optional: prevent locking yourself out, etc.
        $user->syncRoles([$roleName]);

        return $user;
    }

    public function deleteUser(User $actingUser, int $targetUserId): void
    {
        abort_unless($actingUser->can('users.manage'), 403);

        if ($actingUser->id === $targetUserId) {
            abort(400, 'You cannot delete your own account.');
        }

        $user = $this->users->find($targetUserId);

        $this->users->delete($user);
    }
}
