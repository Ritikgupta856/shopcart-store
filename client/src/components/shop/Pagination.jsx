const Pagination = ({ page, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 py-8">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className="px-3 py-1.5 text-sm rounded-md border border-border text-text-secondary hover:bg-secondary disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Previous
      </button>
      <div className="flex items-center gap-1">
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`w-8 h-8 text-sm rounded-md transition-colors ${
              p === page
                ? "bg-primary text-primary-foreground"
                : "text-text-secondary hover:bg-secondary"
            }`}
          >
            {p}
          </button>
        ))}
      </div>
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        className="px-3 py-1.5 text-sm rounded-md border border-border text-text-secondary hover:bg-secondary disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
