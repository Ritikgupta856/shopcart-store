import { X } from "lucide-react";

const ActiveFilterChips = ({ chips, onClearAll }) => {
  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {chips.map((chip) => (
        <button
          key={chip.key}
          type="button"
          onClick={chip.onRemove}
          className="group flex items-center gap-1.5 rounded-full border border-border bg-secondary py-1 pl-3 pr-2 text-xs font-medium text-text-secondary transition-colors hover:border-danger/40 hover:text-danger focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          {chip.label}
          <X size={12} className="text-text-muted-2 transition-colors group-hover:text-danger" />
        </button>
      ))}
      <button
        type="button"
        onClick={onClearAll}
        className="rounded-md px-1 text-xs font-medium text-primary transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        Clear all
      </button>
    </div>
  );
};

export default ActiveFilterChips;
