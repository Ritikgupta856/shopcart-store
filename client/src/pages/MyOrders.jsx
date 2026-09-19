import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Loader, PackageX } from "lucide-react";
import Breadcrumb from "@/components/shop/Breadcrumb";
import { OrderStatusBadge } from "@/components/OrderStatusBadge";
import useAuthStore from "@/store/useAuthStore";

const MyOrders = () => {
  const { user, token } = useAuthStore();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/api/orders/mine`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setOrders(res.data.orders || []))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, [user, token, navigate]);

  if (!user) return null;

  return (
    <main className="mt-10 px-4 sm:px-6 lg:px-12 xl:px-20 2xl:px-40 py-6 max-w-3xl mx-auto min-h-[60vh]">
      <Breadcrumb items={[{ label: "Home", path: "/" }, { label: "My Orders" }]} />
      <h1 className="text-2xl sm:text-3xl font-semibold text-foreground mb-6">My Orders</h1>

      {loading ? (
        <div className="flex justify-center py-16">
          <Loader className="w-6 h-6 animate-spin text-primary" />
        </div>
      ) : orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
          <PackageX className="text-text-muted-2" size={40} />
          <p className="font-medium text-foreground">No orders yet</p>
          <p className="text-sm text-text-muted-2">Your order history will show up here.</p>
          <Link to="/shop" className="text-primary hover:underline text-sm mt-2">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <div key={order._id} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <span className="text-xs text-text-muted-2 block">Order #{order._id.slice(-8)}</span>
                  <span className="text-xs text-text-muted-2">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <OrderStatusBadge status={order.status} />
              </div>
              <div className="flex flex-col divide-y divide-border">
                {order.products.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 py-2">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-lg bg-secondary object-contain p-1"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground line-clamp-1">{item.name}</p>
                      {(item.size || item.color) && (
                        <p className="text-xs text-text-muted-2">
                          {[item.size, item.color].filter(Boolean).join(" / ")}
                        </p>
                      )}
                    </div>
                    <span className="text-xs text-text-secondary">Qty: {item.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center mt-3 pt-3 border-t border-border">
                <span className="text-sm text-text-secondary">Total</span>
                <span className="font-semibold text-foreground">₹{order.totalAmount.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default MyOrders;
