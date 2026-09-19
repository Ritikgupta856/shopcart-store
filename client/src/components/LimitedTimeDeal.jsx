import { Link } from "react-router-dom";
import useDeals from "@/hooks/useDeals";
import BannerSkeleton from "@/components/skeletons/BannerSkeleton";

const LimitedTimeDeal = () => {
  const { deals, loading } = useDeals();
  const deal = deals[0];

  if (loading) return <BannerSkeleton height="h-[200px] sm:h-[240px]" />;
  if (!deal) return null;

  return (
    <section className="px-4 sm:px-6 lg:px-12 xl:px-20 2xl:px-40 py-8">
      <Link to={deal.ctaUrl || "/shop"} className="block rounded-2xl overflow-hidden">
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
