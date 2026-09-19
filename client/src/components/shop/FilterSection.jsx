import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FilterSection = ({ title, children, defaultOpen = true }) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-t border-border first:border-t-0 py-4 first:pt-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between rounded-md text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <span className="text-xs font-semibold uppercase tracking-wider text-foreground">{title}</span>
        <ChevronDown
          size={15}
          className={`text-text-muted-2 transition-transform duration-200 ${open ? "" : "-rotate-90"}`}
        />
      </button>
      {open && <div className="mt-3">{children}</div>}
    </div>
  );
};

export default FilterSection;
