import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import useDeals from "@/hooks/useDeals";

const LimitedTimeDeal = () => {
  const { deals, loading } = useDeals();
  const deal = deals[0];

  if (loading || !deal) return null;

  return (
    <section className="px-4 sm:px-6 lg:px-12 xl:px-20 2xl:px-40 py-8">
      <div className="relative rounded-2xl overflow-hidden bg-[hsl(151,43%,22%)] flex flex-col md:flex-row items-center gap-6 md:gap-10 p-8 md:p-12">
        <div className="flex-1 text-white">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-white/70 mb-3">
            Limited Time Offer
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-2">{deal.discount}</h2>
          <p className="text-base sm:text-lg text-white/80 mb-1">{deal.name}</p>
          {deal.description && <p className="text-sm text-white/70 mb-6 max-w-md">{deal.description}</p>}
          <Button asChild variant="secondary" className="mt-2">
            <Link to={deal.ctaUrl || "/deals"} className="flex items-center gap-2">
              {deal.ctaText || "Shop Deals"} <ArrowRight size={16} />
            </Link>
          </Button>
        </div>
        <div className="flex-1 w-full max-w-sm">
          <img
            src={deal.bannerImage}
            alt={deal.name}
            className="w-full h-[200px] sm:h-[240px] object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default LimitedTimeDeal;
