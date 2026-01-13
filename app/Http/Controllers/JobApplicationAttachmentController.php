<?php

namespace App\Http\Controllers;

use App\Application\JobApplications\JobApplicationService;
use App\Models\JobApplication;
use Illuminate\Http\Request;

class JobApplicationAttachmentController extends Controller
{
    public function __construct(
        private readonly JobApplicationService $service
    ) {}

    public function destroy(Request $request, JobApplication $jobApplication, int $attachment)
    {
        $user = $request->user();

        $this->service->deleteAttachmentForUser($user, $jobApplication, $attachment);

        return redirect()->back()->with('success', 'Attachment deleted.');
    }
}
