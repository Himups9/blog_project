import { useState } from "react";
import {
    User,
    Mail,
    Phone,
    Calendar,
    Briefcase,
    ShieldCheck,
    Shield,
    AtSign,
    Clock,
    Pencil,
    LockKeyhole,
    CheckCircle,
    XCircle,
    Camera,
    MapPin,
} from "lucide-react";
import { useAuth } from "../../auth/context/AuthContext";
import { getImageUrl } from "../../utils/imageUrl";

export default function UserProfile() {
    const { user } = useAuth();

    const [editProfileOpen, setEditProfileOpen] = useState(false);
    const [changePasswordOpen, setChangePasswordOpen] = useState(false);

    const firstName = user?.firstName || "";
    const lastName = user?.lastName || "";

    const fullName =
        `${firstName} ${lastName}`.trim() || "User";

    const initials =
        `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase() || "U";
    
    const imageUrl = getImageUrl(user?.profileImage);

    const role =
        typeof user?.role === "string"
            ? user.role
            : user?.role?.name || "USER";

    const formatDate = (date) => {
        if (!date) return "Not available";

        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const formatDateTime = (date) => {
        if (!date) return "Never";

        return new Date(date).toLocaleString("en-US", {
            dateStyle: "medium",
            timeStyle: "short",
        });
    };

    return (
        <div className="space-y-6">

            {/* ========================================================= */}
            {/* Profile Header */}
            {/* ========================================================= */}

            <section className="relative overflow-hidden rounded-2xl bg-linear-to-r from-teal-600 via-cyan-600 to-blue-600 p-6 text-white shadow-lg">

                {/* Decorative background */}
                <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10" />

                <div className="absolute -bottom-20 left-1/3 h-56 w-56 rounded-full bg-white/5" />

                <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

                    <div className="flex flex-col items-center gap-5 sm:flex-row">

                        {/* Avatar */}

                        <div className="relative">

                            {imageUrl ? (
                                <img
                                    src={imageUrl}
                                    alt={fullName}
                                    className="h-28 w-28 rounded-full border-4 border-white/80 object-cover shadow-xl"
                                />
                            ) : (
                                <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-white/80 bg-white/20 text-3xl font-bold shadow-xl backdrop-blur-sm">
                                    {initials}
                                </div>
                            )}

                            <button
                                type="button"
                                onClick={() =>
                                    setEditProfileOpen(true)
                                }
                                className="absolute bottom-1 right-1 flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-white text-teal-600 shadow-md transition hover:scale-105"
                                title="Change profile picture"
                            >
                                <Camera size={17} />
                            </button>

                        </div>

                        {/* User information */}

                        <div className="text-center sm:text-left">

                            <div className="flex flex-col items-center gap-2 sm:flex-row">

                                <h1 className="text-2xl font-bold">
                                    {fullName}
                                </h1>

                                {user?.isVerified && (
                                    <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-xs font-medium backdrop-blur-sm">
                                        <CheckCircle size={14} />
                                        Verified
                                    </span>
                                )}

                            </div>

                            <p className="mt-1 text-sm text-white/80">
                                {user?.email || "No email available"}
                            </p>

                            <div className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">

                                <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur-sm">
                                    {role.toLowerCase()}
                                </span>

                                {user?.position && (
                                    <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur-sm">
                                        {user.position}
                                    </span>
                                )}

                            </div>

                        </div>

                    </div>

                    {/* Header actions */}

                    <div className="flex flex-col gap-3 sm:flex-row">

                        <button
                            type="button"
                            onClick={() =>
                                setEditProfileOpen(true)
                            }
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-teal-700 shadow-md transition hover:bg-white/90"
                        >
                            <Pencil size={17} />
                            Edit Profile
                        </button>

                        <button
                            type="button"
                            onClick={() =>
                                setChangePasswordOpen(true)
                            }
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
                        >
                            <LockKeyhole size={17} />
                            Change Password
                        </button>

                    </div>

                </div>

            </section>

            {/* ========================================================= */}
            {/* Account Status */}
            {/* ========================================================= */}

            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

                <StatusCard
                    icon={ShieldCheck}
                    title="Account Status"
                    value={
                        user?.isActive
                            ? "Active"
                            : "Inactive"
                    }
                    active={user?.isActive}
                />

                <StatusCard
                    icon={CheckCircle}
                    title="Email Status"
                    value={
                        user?.isVerified
                            ? "Verified"
                            : "Not Verified"
                    }
                    active={user?.isVerified}
                />

                <StatusCard
                    icon={Shield}
                    title="Account Role"
                    value={role}
                />

                <StatusCard
                    icon={Clock}
                    title="Last Login"
                    value={formatDateTime(user?.lastLogin)}
                />

            </section>

            {/* ========================================================= */}
            {/* Main Content */}
            {/* ========================================================= */}

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

                {/* Personal Information */}

                <ProfileSection
                    title="Personal Information"
                    description="Your basic personal information."
                    icon={User}
                    className="lg:col-span-2"
                >

                    <InfoGrid>

                        <InfoItem
                            icon={User}
                            label="First Name"
                            value={user?.firstName}
                        />

                        <InfoItem
                            icon={User}
                            label="Last Name"
                            value={user?.lastName}
                        />

                        <InfoItem
                            icon={Calendar}
                            label="Date of Birth"
                            value={formatDate(user?.dateOfBirth)}
                        />

                        <InfoItem
                            icon={User}
                            label="Gender"
                            value={user?.gender}
                        />

                        <InfoItem
                            icon={Briefcase}
                            label="Position"
                            value={user?.position}
                        />

                        <InfoItem
                            icon={Shield}
                            label="Role"
                            value={role}
                        />

                    </InfoGrid>

                </ProfileSection>

                {/* Account */}

                <ProfileSection
                    title="Account"
                    description="Your account information."
                    icon={Shield}
                >

                    <div className="space-y-4">

                        <AccountRow
                            label="Account"
                            value={
                                user?.isActive
                                    ? "Active"
                                    : "Inactive"
                            }
                            active={user?.isActive}
                        />

                        <AccountRow
                            label="Email"
                            value={
                                user?.isVerified
                                    ? "Verified"
                                    : "Not Verified"
                            }
                            active={user?.isVerified}
                        />

                        <AccountRow
                            label="Member Since"
                            value={formatDate(user?.createdAt)}
                        />

                        <AccountRow
                            label="Updated"
                            value={formatDate(user?.updatedAt)}
                        />

                    </div>

                </ProfileSection>

            </div>

            {/* ========================================================= */}
            {/* Contact Information */}
            {/* ========================================================= */}

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

                <ProfileSection
                    title="Contact Information"
                    description="How people can reach you."
                    icon={Mail}
                >

                    <div className="space-y-4">

                        <InfoItem
                            icon={Mail}
                            label="Email Address"
                            value={user?.email}
                        />

                        <InfoItem
                            icon={Phone}
                            label="Phone Number"
                            value={user?.phone}
                        />

                    </div>

                </ProfileSection>

                {/* Social Information */}

                <ProfileSection
                    title="Social Profile"
                    description="Your social media information."
                    icon={AtSign}
                >

                    <InfoItem
                        icon={AtSign}
                        label="Facebook Username"
                        value={
                            user?.facebookUsername
                                ? `@${user.facebookUsername}`
                                : null
                        }
                    />

                </ProfileSection>

            </div>

            {/* ========================================================= */}
            {/* Biography */}
            {/* ========================================================= */}

            <ProfileSection
                title="About Me"
                description="Your personal biography."
                icon={User}
            >

                <div className="rounded-xl bg-slate-50 p-5">

                    <p className="text-sm leading-7 text-slate-600">
                        {user?.bio ||
                            "You haven't added a biography yet."}
                    </p>

                </div>

            </ProfileSection>

            {/* ========================================================= */}
            {/* Security */}
            {/* ========================================================= */}

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                    <div className="flex items-start gap-4">

                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                            <LockKeyhole size={22} />
                        </div>

                        <div>
                            <h2 className="font-semibold text-slate-900">
                                Password & Security
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Keep your account secure by using a strong password.
                            </p>
                        </div>

                    </div>

                    <button
                        type="button"
                        onClick={() =>
                            setChangePasswordOpen(true)
                        }
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                    >
                        <LockKeyhole size={17} />
                        Change Password
                    </button>

                </div>

            </section>

            {/* ========================================================= */}
            {/* Edit Profile Modal */}
            {/* ========================================================= */}

            <EditProfileModal
                isOpen={editProfileOpen}
                onClose={() => setEditProfileOpen(false)}
                user={user}
            />

            {/* ========================================================= */}
            {/* Change Password Modal */}
            {/* ========================================================= */}

            <ChangePasswordModal
                isOpen={changePasswordOpen}
                onClose={() =>
                    setChangePasswordOpen(false)
                }
            />

        </div>
    );
}


/*
|--------------------------------------------------------------------------
| Status Card
|--------------------------------------------------------------------------
*/

function StatusCard({
    icon: Icon,
    title,
    value,
    active,
}) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">

            <div className="flex items-center justify-between">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                    <Icon size={21} />
                </div>

                {active !== undefined && (
                    active ? (
                        <CheckCircle
                            size={18}
                            className="text-emerald-500"
                        />
                    ) : (
                        <XCircle
                            size={18}
                            className="text-red-500"
                        />
                    )
                )}

            </div>

            <p className="mt-4 text-xs font-medium uppercase tracking-wide text-slate-400">
                {title}
            </p>

            <p className="mt-1 truncate text-lg font-semibold capitalize text-slate-800">
                {value || "Not available"}
            </p>

        </div>
    );
}


/*
|--------------------------------------------------------------------------
| Profile Section
|--------------------------------------------------------------------------
*/

function ProfileSection({
    title,
    description,
    icon: Icon,
    children,
    className = "",
}) {
    return (
        <section
            className={`rounded-2xl border border-slate-200 bg-white p-6 shadow-sm ${className}`}
        >

            <div className="mb-6 flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                    <Icon size={20} />
                </div>

                <div>
                    <h2 className="font-semibold text-slate-900">
                        {title}
                    </h2>

                    <p className="text-sm text-slate-500">
                        {description}
                    </p>
                </div>

            </div>

            {children}

        </section>
    );
}


/*
|--------------------------------------------------------------------------
| Info Grid
|--------------------------------------------------------------------------
*/

function InfoGrid({ children }) {
    return (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {children}
        </div>
    );
}


/*
|--------------------------------------------------------------------------
| Info Item
|--------------------------------------------------------------------------
*/

function InfoItem({
    icon: Icon,
    label,
    value,
}) {
    return (
        <div className="flex items-start gap-3">

            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                <Icon size={17} />
            </div>

            <div className="min-w-0">

                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    {label}
                </p>

                <p className="mt-1 wrap-break-words text-sm font-medium text-slate-700">
                    {value || "Not provided"}
                </p>

            </div>

        </div>
    );
}


/*
|--------------------------------------------------------------------------
| Account Row
|--------------------------------------------------------------------------
*/

function AccountRow({
    label,
    value,
    active,
}) {
    return (
        <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-3 last:border-0 last:pb-0">

            <span className="text-sm text-slate-500">
                {label}
            </span>

            {active !== undefined ? (
                <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        active
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-red-50 text-red-600"
                    }`}
                >
                    {value}
                </span>
            ) : (
                <span className="text-right text-sm font-medium text-slate-700">
                    {value}
                </span>
            )}

        </div>
    );
}


/*
|--------------------------------------------------------------------------
| Edit Profile Modal
|--------------------------------------------------------------------------
*/

function EditProfileModal({
    isOpen,
    onClose,
    user,
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-sm">

            <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">

                <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

                    <div>
                        <h2 className="text-lg font-semibold text-slate-900">
                            Edit Profile
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Update your personal information.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                    >
                        ✕
                    </button>

                </div>

                <form className="space-y-5 p-6">

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                        <FormField
                            label="First Name"
                            defaultValue={user?.firstName || ""}
                        />

                        <FormField
                            label="Last Name"
                            defaultValue={user?.lastName || ""}
                        />

                        <FormField
                            label="Email"
                            type="email"
                            defaultValue={user?.email || ""}
                        />

                        <FormField
                            label="Phone"
                            defaultValue={user?.phone || ""}
                        />

                        <FormField
                            label="Position"
                            defaultValue={user?.position || ""}
                        />

                        <FormField
                            label="Facebook Username"
                            defaultValue={
                                user?.facebookUsername || ""
                            }
                        />

                    </div>

                    <div>

                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Gender
                        </label>

                        <select
                            defaultValue={user?.gender || ""}
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
                        >
                            <option value="">
                                Select gender
                            </option>
                            <option value="MALE">
                                Male
                            </option>
                            <option value="FEMALE">
                                Female
                            </option>
                            <option value="OTHER">
                                Other
                            </option>
                        </select>

                    </div>

                    <div>

                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Biography
                        </label>

                        <textarea
                            rows={5}
                            defaultValue={user?.bio || ""}
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
                        />

                    </div>

                    <div className="flex justify-end gap-3 border-t border-slate-200 pt-5">

                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700"
                        >
                            Save Changes
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}


/*
|--------------------------------------------------------------------------
| Form Field
|--------------------------------------------------------------------------
*/

function FormField({
    label,
    type = "text",
    defaultValue,
}) {
    return (
        <div>

            <label className="mb-2 block text-sm font-medium text-slate-700">
                {label}
            </label>

            <input
                type={type}
                defaultValue={defaultValue}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
            />

        </div>
    );
}


/*
|--------------------------------------------------------------------------
| Change Password Modal
|--------------------------------------------------------------------------
*/

function ChangePasswordModal({
    isOpen,
    onClose,
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-sm">

            <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">

                <div className="border-b border-slate-200 px-6 py-5">

                    <div className="flex items-center gap-3">

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
                            <LockKeyhole size={21} />
                        </div>

                        <div>
                            <h2 className="font-semibold text-slate-900">
                                Change Password
                            </h2>

                            <p className="text-sm text-slate-500">
                                Update your account password.
                            </p>
                        </div>

                    </div>

                </div>

                <form className="space-y-5 p-6">

                    <FormField
                        label="Current Password"
                        type="password"
                    />

                    <FormField
                        label="New Password"
                        type="password"
                    />

                    <FormField
                        label="Confirm New Password"
                        type="password"
                    />

                    <div className="flex justify-end gap-3 border-t border-slate-200 pt-5">

                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
                        >
                            <LockKeyhole size={17} />
                            Update Password
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}