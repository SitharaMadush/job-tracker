<?php

namespace App\Infrastructure\Repositories;

use App\Domain\Users\Repositories\UserRepositoryInterface;
use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class EloquentUserRepository implements UserRepositoryInterface
{
    public function paginate(int $perPage = 10): LengthAwarePaginator
    {
        return User::with('roles')
            ->orderBy('id')
            ->paginate($perPage)
            ->withQueryString();
    }

    public function find(int $id): User
    {
        return User::findOrFail($id);
    }

    public function delete(User $user): void
    {
        $user->delete();
    }
}
