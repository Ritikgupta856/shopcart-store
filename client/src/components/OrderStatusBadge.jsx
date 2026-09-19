const statusStyles = {
  paid: "bg-success-bg text-success",
  pending: "bg-warning-bg text-warning",
  failed: "bg-danger-bg text-danger",
  cancelled: "bg-secondary text-text-secondary",
};

export const OrderStatusBadge = ({ status }) => (
  <span
    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium capitalize ${
      statusStyles[status] || "bg-secondary text-text-secondary"
    }`}
  >
    {status}
  </span>
);
