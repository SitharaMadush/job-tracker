<?php

use App\Http\Controllers\JobApplicationController;
use App\Http\Controllers\JobApplicationAttachmentController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserManagementController;
use Illuminate\Foundation\Application as FoundationApplication;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Symfony\Component\Console\Application;

Route::get('/', function () {
    return redirect()->route('job-applications.index');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/job-applications', [JobApplicationController::class, 'index'])->name('job-applications.index');
    Route::post('/job-applications', [JobApplicationController::class, 'store'])->name('job-applications.store');
    Route::put('/job-applications/{jobApplication}', [JobApplicationController::class, 'update'])->name('job-applications.update');
    Route::delete('/job-applications/{jobApplication}', [JobApplicationController::class, 'destroy'])->name('job-applications.destroy');

    Route::delete('/job-applications/{jobApplication}/attachments/{attachment}', [JobApplicationAttachmentController::class, 'destroy'])
        ->name('job-application-attachments.destroy');
});

// Admin-only user management
Route::middleware(['auth', 'verified', 'permission:users.manage'])->group(function () {
    Route::get('/admin/users', [UserManagementController::class, 'index'])->name('admin.users.index');
    Route::put('/admin/users/{user}/role', [UserManagementController::class, 'updateRole'])->name('admin.users.updateRole');
    Route::delete('/admin/users/{user}', [UserManagementController::class, 'destroy'])->name('admin.users.destroy');
});
// ----------

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        // 'laravelVersion' => Applicatio::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

