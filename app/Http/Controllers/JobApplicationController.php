<?php

namespace App\Http\Controllers;

use App\Application\JobApplications\JobApplicationService;
use App\Http\Requests\StoreJobApplicationRequest;
use App\Http\Requests\UpdateJobApplicationRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JobApplicationController extends Controller
{
    public function __construct(
        private readonly JobApplicationService $service
    ) {}

    public function index(Request $request)
    {
        $user = $request->user();

        $status = $request->query('status');
        $search = $request->query('search');

        $applications = $this->service->listForUser($user, $status, $search);

        return Inertia::render('JobApplications/Index', [
            'applications' => $applications,
            'filters' => [
                'status' => $status,
                'search' => $search,
            ],
        ]);
    }

    public function store(StoreJobApplicationRequest $request)
    {
        $user = $request->user();

        $data = $request->validated();
        $attachments = $request->file('attachments');

        $this->service->createForUser($user, $data, $attachments);

        return redirect()->route('job-applications.index')->with('success', 'Application created.');
    }

    public function update(UpdateJobApplicationRequest $request, int $jobApplication)
    {
        $user = $request->user();

        $data = $request->validated();
        $attachments = $request->file('attachments');

        $this->service->updateForUser($user, $jobApplication, $data, $attachments);

        return redirect()->route('job-applications.index')->with('success', 'Application updated.');
    }

    public function destroy(Request $request, int $jobApplication)
    {
        $user = $request->user();

        $this->service->deleteForUser($user, $jobApplication);

        return redirect()->back()->with('success', 'Application deleted.');
    }
}
