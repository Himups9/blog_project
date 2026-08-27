import DashboardSection from "./DashboardSection";

export default function RecentUsers({
    users = [],
}) {
    return (
        <DashboardSection title="Recent Users">

            <div className="space-y-4">

                {users.map((user) => (

                    <div
                        key={user.id}
                        className="flex items-center justify-between rounded-lg border p-4 hover:bg-slate-50"
                    >

                        <div className="flex items-center gap-4">

                            <img
                                src={
                                    user.profileImage ||
                                    "https://ui-avatars.com/api/?name=" +
                                        user.firstName
                                }
                                alt=""
                                className="h-12 w-12 rounded-full object-cover"
                            />

                            <div>

                                <h4 className="font-semibold">
                                    {user.firstName} {user.lastName}
                                </h4>

                                <p className="text-sm text-slate-500">
                                    {user.email}
                                </p>

                            </div>

                        </div>

                        <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                            Active
                        </span>

                    </div>

                ))}

            </div>
            {!users.length && (
                <div className="py-10 text-center text-slate-500">

                    No users found.

                </div>
            )}

        </DashboardSection>
    );
}
