<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreJobApplicationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // auth+permissions handled in service
    }

    public function rules(): array
    {
        return [
            'company_name' => ['required', 'string', 'max:255'],
            'position'     => ['required', 'string', 'max:255'],
            'job_url'      => ['nullable', 'url'],
            'location'     => ['nullable', 'string', 'max:255'],
            'status'       => ['required', 'in:applied,interview,offer,rejected,on_hold'],
            'applied_at'   => ['nullable', 'date'],
            'next_follow_up_at' => ['nullable', 'date', 'after_or_equal:applied_at'],
            'source'       => ['nullable', 'string', 'max:255'],
            'notes'        => ['nullable', 'string'],

            'attachments'   => ['nullable', 'array'],
            'attachments.*' => ['file', 'mimes:jpg,jpeg,png,webp,pdf', 'max:10240'],
        ];
    }
}
