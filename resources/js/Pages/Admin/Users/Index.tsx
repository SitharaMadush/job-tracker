import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import type { AuthUser, Paginated } from "@/types";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface UserRow {
  id: number;
  name: string;
  email: string;
  roles: { name: string }[];
}

interface PageProps {
  auth: { user: AuthUser };
  users: Paginated<UserRow>;
  roles: string[];
  flash?: {
    success?: string;
    error?: string;
  };
}

export default function Index() {
  const { auth, users, roles, flash } = usePage<PageProps>().props;

  const { setData, put, delete: destroy, processing } = useForm<{
    role: string;
  }>({ role: "" });

  const handleRoleChange = (userId: number, role: string) => {
    console.log("-------------------------------------", userId, role);

    setData("role", role);
    put(route("admin.users.updateRole", userId), {
      preserveScroll: true,
    });
  };

  const handleDelete = (userId: number) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    destroy(route("admin.users.destroy", userId), {
      preserveScroll: true,
    });
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
          User Management
        </h2>
      }
    >
      <Head title="User Management" />

      <div className="py-8">
        <div className="mx-auto max-w-6xl space-y-4 px-4 sm:px-6 lg:px-8">
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

          <div className="overflow-hidden rounded-xl border bg-white">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.data.map((user) => {
                  const currentRole = user.roles[0]?.name ?? "candidate";
                  const isSelf = auth.user.id === user.id;

                  return (
                    <TableRow key={user.id}>
                      <TableCell>{user.id}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Select
                          defaultValue={currentRole}
                          onValueChange={(value) =>
                            handleRoleChange(user.id, value)
                          }
                          disabled={processing || isSelf}
                        >
                          <SelectTrigger className="w-[150px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {roles.map((r) => (
                              <SelectItem key={r} value={r}>
                                {r}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="destructive"
                          size="sm"
                          disabled={processing || isSelf}
                          onClick={() => handleDelete(user.id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}

                {users.data.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="py-6 text-center text-sm text-gray-500"
                    >
                      No users found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-600">
            <span>
              Page {users.current_page} of {users.last_page} • Total{" "}
              {users.total} users
            </span>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
