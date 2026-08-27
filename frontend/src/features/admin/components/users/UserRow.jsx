import {
    Eye,
    Pencil,
    Trash2,
} from "lucide-react";

import StatusBadge from "./StatusBadge";
import { getImageUrl } from "../../../utils/imageUrl";

export default function UserRow({
    user,
    onView,
    onEdit,
    onDelete,
    onToggleStatus,
}) {
    /*
    |--------------------------------------------------------------------------
    | User Information
    |--------------------------------------------------------------------------
    */

    const firstName = user?.firstName || "";
    const lastName = user?.lastName || "";

    const fullName =
        `${firstName} ${lastName}`.trim() || "Unknown User";

    const email = user?.email || "No email";

    /*
    |--------------------------------------------------------------------------
    | Role
    |--------------------------------------------------------------------------
    */

    const role =
        typeof user?.role === "string"
            ? user.role
            : user?.role?.name || "USER";

    const formattedRole =
        role.charAt(0).toUpperCase() +
        role.slice(1).toLowerCase();

    /*
    |--------------------------------------------------------------------------
    | Status
    |--------------------------------------------------------------------------
    */

    const isActive = Boolean(user?.isActive);

    /*
    |--------------------------------------------------------------------------
    | Avatar
    |--------------------------------------------------------------------------
    */

    const initials =
        `${firstName?.[0] || ""}${lastName?.[0] || ""}`
            .toUpperCase() || "U";

    const imageUrl = getImageUrl(user?.profileImage);

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (
        <tr className="border-b border-slate-100 transition hover:bg-slate-50">

            {/* User */}

            <td className="px-4 py-4">

                <div className="flex items-center gap-3">

                    {/* Avatar */}

                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt={fullName}
                            className="h-10 w-10 shrink-0 rounded-full object-cover ring-2 ring-slate-100"
                        />
                    ) : (
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-indigo-500 to-purple-600 text-sm font-semibold text-white ring-2 ring-slate-100">
                            {initials}
                        </div>
                    )}

                    {/* User Details */}

                    <div className="min-w-0">

                        <h4 className="truncate font-medium text-slate-800">
                            {fullName}
                        </h4>

                        <p className="truncate text-sm text-slate-500">
                            {email}
                        </p>

                    </div>

                </div>

            </td>


            {/* Role */}

            <td className="px-4 py-4">

                <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                    {formattedRole}
                </span>

            </td>


            {/* Status */}

            <td className="px-4 py-4">

                <button
                    type="button"
                    onClick={() => onToggleStatus(user)}
                    className="transition hover:scale-105"
                    title={
                        isActive
                            ? "Deactivate user"
                            : "Activate user"
                    }
                >
                    <StatusBadge active={isActive} />
                </button>

            </td>


            {/* Actions */}

            <td className="px-4 py-4">

                <div className="flex items-center gap-1">

                    {/* View */}

                    <button
                        type="button"
                        onClick={() => onView(user)}
                        className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-teal-600"
                        title="View user"
                    >
                        <Eye size={19} />
                    </button>


                    {/* Edit */}

                    <button
                        type="button"
                        onClick={() => onEdit(user)}
                        className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-50"
                        title="Edit user"
                    >
                        <Pencil size={18} />
                    </button>


                    {/* Delete */}

                    <button
                        type="button"
                        onClick={() => onDelete(user)}
                        className="rounded-lg p-2 text-red-600 transition hover:bg-red-50"
                        title="Delete user"
                    >
                        <Trash2 size={18} />
                    </button>

                </div>

            </td>

        </tr>
    );
}