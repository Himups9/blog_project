import {
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
}) {

    if (totalPages <= 1) return null;

    return (
        <div className="mt-6 flex items-center justify-end gap-2">

            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="rounded-lg border p-2 disabled:opacity-40"
            >
                <ChevronLeft size={18} />
            </button>

            {Array.from(
                { length: totalPages },
                (_, index) => (
                    
                    <button
                        key={index}
                        onClick={() => onPageChange(index + 1)}
                        className={`h-9 w-9 rounded-lg ${
                            currentPage === index + 1
                                ? "bg-cyan-600 text-white"
                                : "border"
                        }`}
                    >
                        {index + 1}
                    </button>
                )
            )}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="rounded-lg border p-2 disabled:opacity-40"
            >
                <ChevronRight size={18} />
            </button>

        </div>
    );
}