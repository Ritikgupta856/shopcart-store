import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const Breadcrumb = ({ items }) => {
  return (
    <nav className="flex items-center gap-1.5 text-xs text-text-muted-2 mb-3">
      {items.map((item, index) => (
        <span key={item.label} className="flex items-center gap-1.5">
          {index > 0 && <ChevronRight size={12} />}
          {item.path ? (
            <Link to={item.path} className="hover:text-primary transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-text-secondary">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumb;
