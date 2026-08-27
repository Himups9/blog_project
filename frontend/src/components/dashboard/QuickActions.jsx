// src/components/dashboard/QuickActions.jsx

import { Link } from "react-router-dom";
import {
    FilePlus,
    FileText,
    User,
    Lock,
    Image,
    Heart,
} from "lucide-react";

const actions = [
    {
        title: "Create Blog",
        description: "Write and publish a new blog post.",
        icon: FilePlus,
        link: "/blog/create",
        color:
            "bg-linear-to-r from-emerald-500 to-green-600",
    },
    {
        title: "My Blogs",
        description: "View and manage your blog posts.",
        icon: FileText,
        link: "/my-blogs",
        color:
            "bg-linear-to-r from-blue-500 to-indigo-600",
    },
    {
        title: "Edit Profile",
        description: "Update your personal information.",
        icon: User,
        link: "/profile",
        color:
            "bg-linear-to-r from-purple-500 to-violet-600",
    },
    {
        title: "Change Password",
        description: "Keep your account secure.",
        icon: Lock,
        link: "/profile/change-password",
        color:
            "bg-linear-to-r from-orange-500 to-red-500",
    },
    {
        title: "Gallery",
        description: "Browse uploaded images.",
        icon: Image,
        link: "/gallery",
        color:
            "bg-linear-to-r from-pink-500 to-rose-500",
    },
    {
        title: "Favorites",
        description: "View your liked blog posts.",
        icon: Heart,
        link: "/favorites",
        color:
            "bg-linear-to-r from-cyan-500 to-sky-600",
    },
];

const QuickActions = () => {
    return (
        <div className="rounded-3xl bg-white p-8 shadow-sm">

            <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900">
                    Quick Actions
                </h2>

                <p className="mt-2 text-slate-500">
                    Quickly access the features you use most.
                </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

                {actions.map((action) => {
                    const Icon = action.icon;

                    return (
                        <Link
                            key={action.title}
                            to={action.link}
                            className="group rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-teal-500 hover:shadow-lg"
                        >

                            <div
                                className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl text-white ${action.color}`}
                            >
                                <Icon size={28} />
                            </div>

                            <h3 className="mb-2 text-lg font-semibold text-slate-900 group-hover:text-teal-700">
                                {action.title}
                            </h3>

                            <p className="text-sm leading-6 text-slate-500">
                                {action.description}
                            </p>

                        </Link>
                    );
                })}

            </div>

        </div>
    );
};

export default QuickActions;