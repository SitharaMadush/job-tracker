<?php

namespace App\Domain\JobApplications\Repositories;

use App\Models\JobApplication;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

interface JobApplicationRepositoryInterface
{
    public function paginateForUser(
        int $userId,
        ?string $status,
        ?string $search,
        int $perPage = 10
    ): LengthAwarePaginator;

    public function findForUserOrFail(int $userId, int $id): JobApplication;

    public function createForUser(int $userId, array $data): JobApplication;

    public function update(JobApplication $jobApplication, array $data): JobApplication;

    public function delete(JobApplication $jobApplication): void;
}
