import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  // Logic to show a window of pages
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      let startPage = Math.max(1, currentPage - 2);
      let endPage = Math.min(totalPages, currentPage + 2);

      if (currentPage <= 3) {
        endPage = Math.min(maxVisiblePages, totalPages);
      } else if (currentPage >= totalPages - 2) {
        startPage = Math.max(1, totalPages - 4);
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
    }
    return pageNumbers;
  };

  const pages = getPageNumbers();

  return (
    <div className="flex justify-center items-center gap-2 mt-8 py-4">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-full glass border border-border/50 text-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/20 transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
      </motion.button>

      <div className="flex items-center gap-1">
        {currentPage > 3 && totalPages > 5 && (
            <>
                <button
                    onClick={() => onPageChange(1)}
                    className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300",
                        "glass border border-border/50 hover:border-primary hover:text-primary"
                    )}
                >
                    1
                </button>
                <span className="text-muted-foreground">...</span>
            </>
        )}

        {pages.map((page) => (
          <motion.button
            key={page}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onPageChange(page)}
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300",
              currentPage === page
                ? "bg-primary text-primary-foreground shadow-glow-primary scale-110"
                : "glass border border-border/50 hover:border-primary hover:text-primary"
            )}
          >
            {page}
          </motion.button>
        ))}

        {currentPage < totalPages - 2 && totalPages > 5 && (
            <>
                <span className="text-muted-foreground">...</span>
                 <button
                    onClick={() => onPageChange(totalPages)}
                    className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300",
                        "glass border border-border/50 hover:border-primary hover:text-primary"
                    )}
                >
                    {totalPages}
                </button>
            </>
        )}
      </div>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-full glass border border-border/50 text-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/20 transition-colors"
      >
        <ChevronRight className="w-5 h-5" />
      </motion.button>
    </div>
  );
}
