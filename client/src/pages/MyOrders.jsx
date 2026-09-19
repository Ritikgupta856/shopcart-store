import { useEffect, useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { PackageX } from "lucide-react";
import Breadcrumb from "@/components/shop/Breadcrumb";
import OrderCard from "@/components/orders/OrderCard";
import OrderListSkeleton from "@/components/skeletons/OrderListSkeleton";
import ShopErrorState from "@/components/shop/ShopErrorState";
import { Button } from "@/components/ui/button";
import { PageContainer, PageHeader } from "@/components/ui/page-container";
import useAuthStore from "@/store/useAuthStore";

const FILTERS = [
  { value: "all", label: "All" },
  { value: "paid", label: "Paid" },
  { value: "pending", label: "Pending" },
  { value: "failed", label: "Failed" },
  { value: "cancelled", label: "Cancelled" },
];

const MyOrders = () => {
  const { user, token } = useAuthStore();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState("all");

  const fetchOrders = () => {
    setLoading(true);
    setError(false);
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/api/orders/mine`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setOrders(res.data.orders || []))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, token, navigate]);

  const counts = useMemo(
    () =>
      orders.reduce(
        (acc, o) => ({ ...acc, [o.status]: (acc[o.status] || 0) + 1 }),
        { all: orders.length }
      ),
    [orders]
  );

  const visibleOrders = useMemo(
    () => (filter === "all" ? orders : orders.filter((o) => o.status === filter)),
    [orders, filter]
  );

  if (!user) return null;

  return (
    <PageContainer>
      <Breadcrumb items={[{ label: "Home", path: "/" }, { label: "My Orders" }]} />
      <PageHeader
        title="My Orders"
        description={
          loading
            ? "Loading your order history..."
            : `${orders.length} order${orders.length !== 1 ? "s" : ""} placed`
        }
      />

      {!loading && !error && orders.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-2">
          {FILTERS.map((item) => {
            const count = counts[item.value] || 0;
            if (item.value !== "all" && count === 0) return null;
            return (
              <button
                key={item.value}
                onClick={() => setFilter(item.value)}
                className={`flex h-9 items-center gap-1.5 rounded-full border px-4 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                  filter === item.value
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-text-secondary hover:bg-secondary hover:text-foreground"
                }`}
              >
                {item.label}
                <span
                  className={filter === item.value ? "text-primary-foreground/70" : "text-text-muted-2"}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {loading ? (
        <OrderListSkeleton />
      ) : error ? (
        <ShopErrorState onRetry={fetchOrders} />
      ) : orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card px-6 py-20 text-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-secondary">
            <PackageX className="text-text-muted-2" size={28} />
          </div>
          <h2 className="mt-5 text-lg font-semibold text-foreground">No orders yet</h2>
          <p className="mt-1.5 max-w-sm text-sm text-text-secondary">
            Once you place an order, it will appear here with its status and details.
          </p>
          <Button asChild size="lg" className="mt-6">
            <Link to="/shop">Start Shopping</Link>
          </Button>
        </div>
      ) : visibleOrders.length === 0 ? (
        <div className="rounded-xl border border-border bg-card px-6 py-16 text-center">
          <p className="text-sm text-text-secondary">No {filter} orders.</p>
          <Button variant="outline" className="mt-4" onClick={() => setFilter("all")}>
            Show all orders
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {visibleOrders.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))}
        </div>
      )}
    </PageContainer>
  );
};

export default MyOrders;
