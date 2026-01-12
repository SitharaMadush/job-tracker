<?php

namespace App\Infrastructure\Repositories;

use App\Domain\JobApplications\Repositories\JobApplicationRepositoryInterface;
use App\Models\JobApplication;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class EloquentJobApplicationRepository implements JobApplicationRepositoryInterface
{
    public function paginateForUser(
        int $userId,
        ?string $status,
        ?string $search,
        int $perPage = 10
    ): LengthAwarePaginator {
        $query = JobApplication::with('attachments')
            ->where('user_id', $userId);

        if ($status) {
            $query->where('status', $status);
        }

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('company_name', 'like', "%{$search}%")
                  ->orWhere('position', 'like', "%{$search}%");
            });
        }

        return $query->latest()->paginate($perPage)->withQueryString();
    }

    public function findForUserOrFail(int $userId, int $id): JobApplication
    {
        return JobApplication::with('attachments')
            ->where('user_id', $userId)
            ->findOrFail($id);
    }

    public function createForUser(int $userId, array $data): JobApplication
    {
        $jobApplication = new JobApplication($data);
        $jobApplication->user_id = $userId;
        $jobApplication->save();

        return $jobApplication->fresh('attachments');
    }

    public function update(JobApplication $jobApplication, array $data): JobApplication
    {
        $jobApplication->fill($data);
        $jobApplication->save();

        return $jobApplication->fresh('attachments');
    }

    public function delete(JobApplication $jobApplication): void
    {
        $jobApplication->delete();
    }
}
