<?php

namespace App\Application\JobApplications;

use App\Domain\JobApplications\Repositories\JobApplicationRepositoryInterface;
use App\Models\JobApplication;
use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class JobApplicationService
{
    public function __construct(
        private readonly JobApplicationRepositoryInterface $jobApplications
    ) {}

    public function listForUser(User $user, ?string $status, ?string $search, int $perPage = 10): LengthAwarePaginator
    {
        // Business rule: must have applications.view_own
        abort_unless($user->can('applications.view_own'), 403);

        return $this->jobApplications->paginateForUser($user->id, $status, $search, $perPage);
    }

    public function createForUser(User $user, array $data, ?array $attachments): JobApplication
    {
        abort_unless($user->can('applications.manage_own'), 403);

        $jobApplication = $this->jobApplications->createForUser($user->id, $data);

        $this->handleAttachments($jobApplication, $attachments);

        return $jobApplication->fresh('attachments');
    }

    public function updateForUser(User $user, int $id, array $data, ?array $attachments): JobApplication
    {
        abort_unless($user->can('applications.manage_own'), 403);

        $jobApplication = $this->jobApplications->findForUserOrFail($user->id, $id);

        $jobApplication = $this->jobApplications->update($jobApplication, $data);

        $this->handleAttachments($jobApplication, $attachments);

        return $jobApplication->fresh('attachments');
    }

    public function deleteForUser(User $user, int $id): void
    {
        abort_unless($user->can('applications.manage_own'), 403);

        $jobApplication = $this->jobApplications->findForUserOrFail($user->id, $id);

        foreach ($jobApplication->attachments as $attachment) {
            Storage::disk('public')->delete($attachment->path);
        }

        $this->jobApplications->delete($jobApplication);
    }

    public function deleteAttachmentForUser(User $user, JobApplication $jobApplication, int $attachmentId): void
    {
        abort_unless($user->can('applications.manage_own'), 403);
        abort_unless($jobApplication->user_id === $user->id, 403);

        $attachment = $jobApplication->attachments()->findOrFail($attachmentId);

        Storage::disk('public')->delete($attachment->path);
        $attachment->delete();
    }

    /**
     * @param  UploadedFile[]|null  $attachments
     */
    private function handleAttachments(JobApplication $jobApplication, ?array $attachments): void
    {
        if (! $attachments) {
            return;
        }

        foreach ($attachments as $file) {
            if (! $file instanceof UploadedFile) {
                continue;
            }

            $path = $file->store('job-attachments', 'public');

            $jobApplication->attachments()->create([
                'path'          => $path,
                'original_name' => $file->getClientOriginalName(),
                'mime_type'     => $file->getClientMimeType(),
                'size'          => $file->getSize(),
            ]);
        }
    }
}
