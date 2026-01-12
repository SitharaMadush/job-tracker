<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JobApplicationAttachment extends Model
{
    protected $fillable = [
        'job_application_id',
        'path',
        'original_name',
        'mime_type',
        'size',
    ];
}
