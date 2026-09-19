import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import useDeals from "@/hooks/useDeals";
import { Loader } from "lucide-react";

const DealsPage = () => {
  const { deals, loading } = useDeals();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px] py-8">
        <Loader className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <main className="mt-10 px-4 sm:px-6 lg:px-12 xl:px-20 2xl:px-40 py-4 md:py-8 min-h-[50vh]">
      <h1 className="text-2xl font-medium uppercase text-foreground">Current Deals</h1>
      <div className="w-20 h-2 border-b-4 border-primary mt-1"></div>

      {deals.length === 0 ? (
        <p className="text-text-muted-2 mt-10">No active deals right now — check back soon.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
          {deals.map((deal) => (
            <div key={deal._id} className="relative rounded-2xl overflow-hidden min-h-[220px] flex items-center">
              <img src={deal.bannerImage} alt={deal.name} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/50" />
              <div className="relative z-10 px-8 text-white">
                <h2 className="text-2xl font-bold mb-2">{deal.name}</h2>
                {deal.description && <p className="text-sm mb-2 opacity-90">{deal.description}</p>}
                <p className="text-xl font-semibold mb-4">{deal.discount}</p>
                <Button asChild variant="outline" className="bg-white/10 text-white backdrop-blur-sm hover:bg-white/20">
                  <Link to={deal.ctaUrl || "/"}>{deal.ctaText || "Shop the Deal"}</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default DealsPage;
