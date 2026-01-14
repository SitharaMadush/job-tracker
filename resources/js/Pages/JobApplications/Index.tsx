import { Head, router, useForm, usePage } from "@inertiajs/react";
import React, { FormEvent, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import type { User, JobApplication, JobStatus, Paginated } from "@/types";

// shadcn/ui components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { log } from "console";

type Filters = {
    status?: string | null;
    search?: string | null;
};

type Flash = {
    success?: string;
    error?: string;
};

type PageProps = {
    auth: { user: User };
    applications: Paginated<JobApplication>;
    filters: Filters;
    flash?: Flash;
};

type FormData = {
    _method?: string;
    company_name: string;
    position: string;
    job_url: string;
    location: string;
    status: JobStatus;
    applied_at: string;
    next_follow_up_at: string;
    source: string;
    notes: string;
    attachments: File[] | null;
};

const STATUSES: JobStatus[] = [
    "applied",
    "interview",
    "offer",
    "rejected",
    "on_hold",
];

export default function Index() {
    const { auth, applications, filters, flash } = usePage<PageProps>().props;

    const [statusFilter, setStatusFilter] = useState<string>(
        filters.status ?? "all" // "all" = no filter
    );
    const [search, setSearch] = useState(filters.search ?? ""); // search should default to empty

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editing, setEditing] = useState<JobApplication | null>(null);
    const [selectedImage, setSelectedImage] = useState<{
        url: string;
        name: string;
    } | null>(null);

    const { data, setData, post, put, processing, errors, reset } =
        useForm<FormData>({
            _method: "POST",
            company_name: "",
            position: "",
            job_url: "",
            location: "",
            status: "applied",
            applied_at: "",
            next_follow_up_at: "",
            source: "",
            notes: "",
            attachments: null,
        });

    const openCreate = () => {
        reset();
        setData("_method", "POST");
        setEditing(null);
        setIsDialogOpen(true);
    };

    const openEdit = (app: JobApplication) => {
        setEditing(app);
        setData({
            _method: "PUT",
            company_name: app.company_name,
            position: app.position,
            job_url: app.job_url ?? "",
            location: app.location ?? "",
            status: app.status,
            applied_at: app.applied_at ?? "",
            next_follow_up_at: app.next_follow_up_at ?? "",
            source: app.source ?? "",
            notes: app.notes ?? "",
            attachments: null,
        });
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
        reset("attachments");
    };

    const submitForm = (e: FormEvent) => {
        e.preventDefault();

        const options = {
            forceFormData: true,
            preserveScroll: true as const,
            onSuccess: () => {
                reset("attachments");
                setIsDialogOpen(false);
            },
        };

        if (editing) {
            post(route("job-applications.update", editing.id), options);
        } else {
            post(route("job-applications.store"), options);
        }
    };

    const deleteApplication = (id: number) => {
        if (!confirm("Delete this application?")) return;

        router.delete(route("job-applications.destroy", id), {
            preserveScroll: true,
        });
    };

    const deleteAttachment = (
        jobApplicationId: number,
        attachmentId: number
    ) => {
        if (!confirm("Delete this attachment?")) return;

        router.delete(
            route("job-application-attachments.destroy", {
                jobApplication: jobApplicationId,
                attachment: attachmentId,
            }),
            { preserveScroll: true }
        );
    };

    const applyFilters = () => {
        router.get(
            route("job-applications.index"),
            {
                status: statusFilter === "all" ? undefined : statusFilter,
                search: search || undefined,
            },
            {
                preserveScroll: true,
                replace: true,
            }
        );
    };

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
            setData("attachments", null);
            return;
        }
        setData("attachments", Array.from(e.target.files));
    };

    const anyErrors = errors as Record<string, string>;


    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Job Application Tracker
                </h2>
            }
        >
            <Head title="Job Applications" />

            <div className="py-8">
                <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 sm:px-6 lg:px-8">
                    {/* Flash messages */}
                    {flash?.success && (
                        <Alert className="border-green-200 bg-green-50 text-green-900">
                            <AlertDescription>{flash.success}</AlertDescription>
                        </Alert>
                    )}
                    {flash?.error && (
                        <Alert variant="destructive">
                            <AlertDescription>{flash.error}</AlertDescription>
                        </Alert>
                    )}

                    {/* Toolbar */}
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <Button onClick={openCreate}>+ Add Application</Button>

                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                            <div className="flex items-center gap-2">
                                <Select
                                    value={statusFilter}
                                    onValueChange={(value) =>
                                        setStatusFilter(value)
                                    }
                                >
                                    <SelectTrigger className="w-[150px]">
                                        <SelectValue placeholder="All statuses" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">
                                            All statuses
                                        </SelectItem>{" "}
                                        {/* ✅ non-empty */}
                                        {STATUSES.map((status) => (
                                            <SelectItem
                                                key={status}
                                                value={status}
                                            >
                                                {status}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <Input
                                    placeholder="Search company / position..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full sm:w-64"
                                />
                            </div>
                            <Button
                                variant="outline"
                                type="button"
                                onClick={applyFilters}
                            >
                                Apply
                            </Button>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-hidden rounded-xl border bg-white">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Company</TableHead>
                                    <TableHead>Position</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Applied</TableHead>
                                    <TableHead>Attachments</TableHead>
                                    <TableHead className="text-right">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {applications.data.map((app) => (
                                    <TableRow key={app.id}>
                                        <TableCell>
                                            {app.company_name}
                                        </TableCell>
                                        <TableCell>{app.position}</TableCell>
                                        <TableCell>
                                            <Badge variant="secondary">
                                                {app.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            {app.applied_at
                                                ? new Date(
                                                      app.applied_at
                                                  ).toLocaleDateString()
                                                : "-"}
                                        </TableCell>
                                        <TableCell>
                                            {app.attachments.length}
                                        </TableCell>
                                        <TableCell className="text-right space-x-2">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => openEdit(app)}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="text-red-600"
                                                onClick={() =>
                                                    deleteApplication(app.id)
                                                }
                                            >
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}

                                {applications.data.length === 0 && (
                                    <TableRow>
                                        <TableCell
                                            colSpan={6}
                                            className="py-6 text-center text-sm text-gray-500"
                                        >
                                            No applications found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Pagination summary */}
                    <div className="flex items-center justify-between text-xs text-gray-600">
                        <span>
                            Page {applications.current_page} of{" "}
                            {applications.last_page} • Total{" "}
                            {applications.total}
                        </span>
                    </div>
                </div>
            </div>

            {/* Dialog with shadcn form */}
            <Dialog
                open={isDialogOpen}
                onOpenChange={(open) => !open && closeDialog()}
            >
                <DialogContent className="max-w-xl">
                    <DialogHeader>
                        <DialogTitle>
                            {editing ? "Edit Application" : "Add Application"}
                        </DialogTitle>
                    </DialogHeader>

                    <form onSubmit={submitForm} className="space-y-4">
                        <div>
                            <Label htmlFor="company_name">Company</Label>
                            <Input
                                id="company_name"
                                value={data.company_name}
                                onChange={(e) =>
                                    setData("company_name", e.target.value)
                                }
                            />
                            {errors.company_name && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.company_name}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="position">Position</Label>
                            <Input
                                id="position"
                                value={data.position}
                                onChange={(e) =>
                                    setData("position", e.target.value)
                                }
                            />
                            {errors.position && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.position}
                                </p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <Label>Status</Label>
                                <Select
                                    value={data.status}
                                    onValueChange={(value) =>
                                        setData("status", value as JobStatus)
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {STATUSES.map((s) => (
                                            <SelectItem key={s} value={s}>
                                                {s}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.status && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.status}
                                    </p>
                                )}
                            </div>
                            <div>
                                <Label htmlFor="applied_at">Applied date</Label>
                                <Input
                                    id="applied_at"
                                    type="date"
                                    value={data.applied_at}
                                    onChange={(e) =>
                                        setData("applied_at", e.target.value)
                                    }
                                />
                                {errors.applied_at && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.applied_at}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <Label htmlFor="next_follow_up_at">
                                    Next follow-up
                                </Label>
                                <Input
                                    id="next_follow_up_at"
                                    type="date"
                                    value={data.next_follow_up_at}
                                    onChange={(e) =>
                                        setData(
                                            "next_follow_up_at",
                                            e.target.value
                                        )
                                    }
                                />
                                {errors.next_follow_up_at && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.next_follow_up_at}
                                    </p>
                                )}
                            </div>
                            <div>
                                <Label htmlFor="location">Location</Label>
                                <Input
                                    id="location"
                                    value={data.location}
                                    onChange={(e) =>
                                        setData("location", e.target.value)
                                    }
                                />
                                {errors.location && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.location}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="job_url">Job URL</Label>
                            <Input
                                id="job_url"
                                value={data.job_url}
                                onChange={(e) =>
                                    setData("job_url", e.target.value)
                                }
                            />
                            {errors.job_url && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.job_url}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="source">Source</Label>
                            <Input
                                id="source"
                                value={data.source}
                                onChange={(e) =>
                                    setData("source", e.target.value)
                                }
                            />
                            {errors.source && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.source}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="notes">Notes</Label>
                            <Textarea
                                id="notes"
                                rows={3}
                                value={data.notes}
                                onChange={(e) =>
                                    setData("notes", e.target.value)
                                }
                            />
                            {errors.notes && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.notes}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="attachments">
                                JD images / files
                            </Label>
                            <Input
                                id="attachments"
                                type="file"
                                multiple
                                accept="image/*,.pdf"
                                onChange={onFileChange}
                            />
                            {anyErrors["attachments.0"] && (
                                <p className="mt-1 text-xs text-red-500">
                                    {anyErrors["attachments.0"]}
                                </p>
                            )}
                        </div>

                        {editing && editing.attachments.length > 0 && (
                            <div className="space-y-1">
                                <p className="text-sm font-medium">
                                    Existing attachments
                                </p>
                                <ul className="space-y-1 text-xs">
                                    {editing.attachments.map((att) => (
                                        <li
                                            key={att.id}
                                            className="flex items-center gap-2"
                                        >
                                            {att.mime_type.startsWith(
                                                "image/"
                                            ) && (
                                                <img
                                                    src={att.url}
                                                    alt={att.original_name}
                                                    className="h-20 w-20 rounded object-cover border border-gray-200 cursor-pointer"
                                                    onClick={() =>
                                                        setSelectedImage({
                                                            url: att.url,
                                                            name: att.original_name,
                                                        })
                                                    }
                                                />
                                            )}
                                            <a
                                                href={att.url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-indigo-600 underline"
                                            >
                                                {att.original_name}
                                            </a>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                className="text-red-600"
                                                onClick={() =>
                                                    deleteAttachment(
                                                        editing.id,
                                                        att.id
                                                    )
                                                }
                                            >
                                                Remove
                                            </Button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <DialogFooter className="pt-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={closeDialog}
                                disabled={processing}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {editing ? "Save changes" : "Create"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Image Modal  */}
            <Dialog
                open={!!selectedImage}
                onOpenChange={() => setSelectedImage(null)}
            >
                <DialogContent className="max-w-3xl">
                    <DialogHeader>
                        <DialogTitle>Preview</DialogTitle>
                    </DialogHeader>

                    {selectedImage && (
                        <div className="flex items-center justify-center p-2">
                            <img
                                src={selectedImage.url}
                                alt="preview"
                                className="max-h-[80vh] w-auto rounded shadow-md"
                            />
                        </div>
                    )}

                    <DialogFooter className="flex justify-between">
                        {selectedImage && (
                            <a
                                href={selectedImage.url}
                                download={selectedImage.name ?? "download"}
                                className="mr-auto"
                            >
                                <Button variant="secondary">Download</Button>
                            </a>
                        )}
                        <Button
                            variant="outline"
                            onClick={() => setSelectedImage(null)}
                        >
                            Close
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AuthenticatedLayout>
    );
}
