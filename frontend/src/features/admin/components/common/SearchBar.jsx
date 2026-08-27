import { Search } from "lucide-react";

export default function SearchBar({
    value,
    onChange,
    placeholder = "Search...",
}) {
    return (
        <div className="relative w-full max-w-md">

            <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-4 outline-none focus:border-cyan-500"
            />

        </div>
    );
}