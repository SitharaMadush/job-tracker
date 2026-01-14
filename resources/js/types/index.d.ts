export type RoleName = 'admin' | 'candidate' | string;

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    // NEW: roles & permissions from Spatie (shared via HandleInertiaRequests)
    roles?: RoleName[];
    permissions?: string[];
}

// Generic shared props for all pages
export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};

// Domain types for Job Applications

export type JobStatus =
    | 'applied'
    | 'interview'
    | 'offer'
    | 'rejected'
    | 'on_hold';

export interface Attachment {
    id: number;
    url: string;
    original_name: string;
    mime_type: string;
    size: number;
}

export interface JobApplication {
    id: number;
    user_id: number;
    company_name: string;
    position: string;
    job_url?: string | null;
    location?: string | null;
    status: JobStatus;
    applied_at?: string | null;
    next_follow_up_at?: string | null;
    source?: string | null;
    notes?: string | null;
    attachments: Attachment[];
    created_at: string;
    updated_at: string;
}

// Simple pagination type matching Laravel paginator JSON
export interface Paginated<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    // If you return links, you can add:
    // links: { url: string | null; label: string; active: boolean }[];
}
