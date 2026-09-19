import { MdClose } from "react-icons/md";
import FilterSidebar from "./FilterSidebar";

const MobileFilterSheet = ({ onClose, ...filterProps }) => {
  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="bg-black/50 w-full h-full absolute inset-0" onClick={onClose} />
      <div className="relative ml-auto w-full max-w-xs h-full bg-card flex flex-col animate-slide-cart-window">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <span className="font-semibold text-foreground">Filters</span>
          <MdClose className="cursor-pointer text-text-secondary" onClick={onClose} />
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <FilterSidebar {...filterProps} />
        </div>
      </div>
    </div>
  );
};

export default MobileFilterSheet;
