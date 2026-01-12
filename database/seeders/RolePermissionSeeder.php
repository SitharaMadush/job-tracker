<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolePermissionSeeder extends Seeder
{
    public function run(): void
    {
        $viewOwn   = Permission::firstOrCreate(['name' => 'applications.view_own']);
        $manageOwn = Permission::firstOrCreate(['name' => 'applications.manage_own']);
        $manageUsers = Permission::firstOrCreate(['name' => 'users.manage']);

        $candidate = Role::firstOrCreate(['name' => 'candidate']);
        $admin     = Role::firstOrCreate(['name' => 'admin']);

        $candidate->syncPermissions([
            $viewOwn,
            $manageOwn,
        ]);

        $admin->syncPermissions([
            $viewOwn,
            $manageOwn,
            $manageUsers,
        ]);
    }
}
