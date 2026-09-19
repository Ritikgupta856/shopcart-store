import { ChevronLeft, ChevronRight } from "lucide-react";

const buildPageList = (page, totalPages) => {
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);

  const pages = [1];
  const start = Math.max(2, page - 1);
  const end = Math.min(totalPages - 1, page + 1);

  if (start > 2) pages.push("start-ellipsis");
  for (let p = start; p <= end; p++) pages.push(p);
  if (end < totalPages - 1) pages.push("end-ellipsis");
  pages.push(totalPages);

  return pages;
};

const Pagination = ({ page, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = buildPageList(page, totalPages);
  const navClass =
    "flex h-9 items-center gap-1 rounded-md border border-border px-3 text-sm font-medium text-text-secondary transition-colors hover:bg-secondary hover:text-foreground disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-1.5 pt-10">
      <button onClick={() => onPageChange(page - 1)} disabled={page <= 1} className={navClass}>
        <ChevronLeft size={15} />
        <span className="hidden sm:inline">Previous</span>
      </button>

      <div className="flex items-center gap-1">
        {pages.map((p) =>
          typeof p === "string" ? (
            <span key={p} className="px-1 text-sm text-text-muted-2">
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              aria-current={p === page ? "page" : undefined}
              className={`h-9 min-w-9 rounded-md px-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                p === page
                  ? "bg-primary text-primary-foreground"
                  : "text-text-secondary hover:bg-secondary hover:text-foreground"
              }`}
            >
              {p}
            </button>
          )
        )}
      </div>

      <button onClick={() => onPageChange(page + 1)} disabled={page >= totalPages} className={navClass}>
        <span className="hidden sm:inline">Next</span>
        <ChevronRight size={15} />
      </button>
    </nav>
  );
};

export default Pagination;
