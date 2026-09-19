import { CheckCircle2, Clock, XCircle, Ban } from "lucide-react";

const statusConfig = {
  paid: { className: "bg-success-bg text-success", icon: CheckCircle2, label: "Paid" },
  pending: { className: "bg-warning-bg text-warning", icon: Clock, label: "Pending" },
  failed: { className: "bg-danger-bg text-danger", icon: XCircle, label: "Failed" },
  cancelled: { className: "bg-secondary text-text-secondary", icon: Ban, label: "Cancelled" },
};

export const OrderStatusBadge = ({ status }) => {
  const config = statusConfig[status] || statusConfig.cancelled;
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${config.className}`}
    >
      <Icon size={12} className="shrink-0" />
      {config.label}
    </span>
  );
};
