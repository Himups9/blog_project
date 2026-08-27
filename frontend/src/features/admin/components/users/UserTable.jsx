import UserRow from "./UserRow";

export default function UserTable({
    users = [],
    onView,
    onEdit,
    onDelete,
    onToggleStatus,
}) {
    if (users.length === 0) {
        return (
            <div className="rounded-xl border border-slate-200 bg-white p-10 text-center">
                <p className="text-slate-500">
                    No users found.
                </p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">

            <table className="min-w-full">

                <thead className="border-b border-slate-200 bg-slate-50">

                    <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                            User
                        </th>

                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                            Role
                        </th>

                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                            Status
                        </th>

                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                            Actions
                        </th>
                    </tr>

                </thead>

                <tbody>

                    {users.map((user) => (
                        <UserRow
                            key={user.id}
                            user={user}
                            onView={onView}
                            onEdit={onEdit}
                            onDelete={onDelete}
                            onToggleStatus={onToggleStatus}
                        />
                    ))}

                </tbody>

            </table>

        </div>
    );
}