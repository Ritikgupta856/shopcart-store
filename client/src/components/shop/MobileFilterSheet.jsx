import { useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import FilterSidebar from "./FilterSidebar";

const MobileFilterSheet = ({ onClose, resultCount, ...filterProps }) => {
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex lg:hidden" role="dialog" aria-modal="true" aria-label="Filters">
      <div className="absolute inset-0 bg-foreground/40" onClick={onClose} />

      <div className="animate-slide-cart-window relative ml-auto flex h-full w-full max-w-sm flex-col bg-card shadow-card">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <span className="text-base font-semibold text-foreground">Filters</span>
          <button
            onClick={onClose}
            aria-label="Close filters"
            className="rounded-md p-1 text-text-secondary transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          <FilterSidebar {...filterProps} />
        </div>

        <div className="flex items-center gap-3 border-t border-border px-5 py-4">
          <Button variant="outline" className="flex-1" onClick={filterProps.onClearAll}>
            Clear all
          </Button>
          <Button className="flex-1" onClick={onClose}>
            Show {resultCount} result{resultCount === 1 ? "" : "s"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileFilterSheet;
