// src/components/dashboard/AccountSettings.jsx

import { Link } from "react-router-dom";
import {
    UserCircle,
    Lock,
    Bell,
    ShieldCheck,
    Settings,
    ChevronRight,
} from "lucide-react";

const settings = [
    {
        title: "Edit Profile",
        description:
            "Update your personal information, profile picture and social links.",
        icon: UserCircle,
        to: "/profile",
        color: "from-sky-500 to-cyan-500",
    },
    {
        title: "Change Password",
        description:
            "Keep your account secure by updating your password regularly.",
        icon: Lock,
        to: "/profile/change-password",
        color: "from-amber-500 to-orange-500",
    },
    {
        title: "Notification Settings",
        description:
            "Choose when you receive email and website notifications.",
        icon: Bell,
        to: "/settings/notifications",
        color: "from-violet-500 to-purple-600",
    },
    {
        title: "Privacy & Security",
        description:
            "Manage account privacy and security preferences.",
        icon: ShieldCheck,
        to: "/settings/security",
        color: "from-emerald-500 to-teal-600",
    },
];

const AccountSettings = () => {
    return (
        <div className="rounded-3xl bg-white p-8 shadow-sm">

            <div className="mb-8 flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-r from-teal-600 to-emerald-600 text-white">

                    <Settings size={28} />

                </div>

                <div>

                    <h2 className="text-2xl font-bold text-slate-900">
                        Account Settings
                    </h2>

                    <p className="mt-1 text-slate-500">
                        Manage your account preferences and security.
                    </p>

                </div>

            </div>

            <div className="space-y-5">

                {settings.map((item) => {

                    const Icon = item.icon;

                    return (

                        <Link
                            key={item.title}
                            to={item.to}
                            className="group flex items-center justify-between rounded-2xl border border-slate-200 p-6 transition hover:border-teal-500 hover:shadow-lg"
                        >

                            <div className="flex items-center gap-5">

                                <div
                                    className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-r ${item.color} text-white`}
                                >
                                    <Icon size={26} />
                                </div>

                                <div>

                                    <h3 className="text-lg font-semibold text-slate-900">
                                        {item.title}
                                    </h3>

                                    <p className="mt-1 text-sm text-slate-500">
                                        {item.description}
                                    </p>

                                </div>

                            </div>

                            <ChevronRight
                                size={24}
                                className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-teal-600"
                            />

                        </Link>

                    );

                })}

            </div>

        </div>
    );
};

export default AccountSettings;