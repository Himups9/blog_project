export default function DashboardSection({
    title,
    children,
}) {
    return (
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">

            <div className="border-b px-6 py-4">
                <h3 className="text-lg font-semibold text-slate-800">
                    {title}
                </h3>
            </div>

            <div className="p-6">
                {children}
            </div>

        </div>
    );
}