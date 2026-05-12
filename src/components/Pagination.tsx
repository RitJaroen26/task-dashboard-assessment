import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    if (totalPages <= 0) return null;

    return (
        <div className="flex justify-center items-center mt-8 space-x-2">
            <button
                onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border bg-white disabled:opacity-50 hover:bg-slate-50 transition-colors"
            >
                <ChevronLeft size={16} />
            </button>

            {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                    key={idx}
                    onClick={() => onPageChange(idx + 1)}
                    className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${currentPage === idx + 1 ? 'bg-blue-600 text-white shadow-sm' : 'bg-white border text-slate-600 hover:bg-slate-50'}`}
                >
                    {idx + 1}
                </button>
            ))}

            <button
                onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border bg-white disabled:opacity-50 hover:bg-slate-50 transition-colors"
            >
                <ChevronRight size={16} />
            </button>
        </div>
    );
}