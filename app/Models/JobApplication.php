<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobApplication extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_name',
        'position',
        'job_url',
        'location',
        'status',
        'applied_at',
        'next_follow_up_at',
        'source',
        'notes',
    ];

    protected $casts = [
        'applied_at' => 'date',
        'next_follow_up_at' => 'date'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function attachments()
    {
        return $this->hasMany(JobApplicationAttachment::class);
    }


}
