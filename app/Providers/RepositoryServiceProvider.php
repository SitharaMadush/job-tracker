<?php

namespace App\Providers;

use App\Domain\JobApplications\Repositories\JobApplicationRepositoryInterface;
use App\Domain\Users\Repositories\UserRepositoryInterface;
use App\Infrastructure\Repositories\EloquentJobApplicationRepository;
use App\Infrastructure\Repositories\EloquentUserRepository;
use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(JobApplicationRepositoryInterface::class, EloquentJobApplicationRepository::class);
        $this->app->bind(UserRepositoryInterface::class, EloquentUserRepository::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
