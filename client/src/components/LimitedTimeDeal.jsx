import { Link } from "react-router-dom";
import useDeals from "@/hooks/useDeals";

const LimitedTimeDeal = () => {
  const { deals, loading } = useDeals();
  const deal = deals[0];

  if (loading || !deal) return null;

  return (
    <section className="px-4 sm:px-6 lg:px-12 xl:px-20 2xl:px-40 py-8">
      <Link to={deal.ctaUrl || "/deals"} className="block rounded-2xl overflow-hidden">
        <img
          src={deal.bannerImage}
          alt={deal.name}
          className="w-full h-auto object-cover"
        />
      </Link>
    </section>
  );
};

export default LimitedTimeDeal;
