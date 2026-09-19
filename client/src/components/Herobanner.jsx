import Slider from "react-slick";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button } from "./ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import useBanners from "@/hooks/useBanners";

const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-card border border-border shadow-soft p-2 hover:bg-secondary transition-colors"
  >
    <ArrowRight className="h-5 w-5 text-foreground" />
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-card border border-border shadow-soft p-2 hover:bg-secondary transition-colors"
  >
    <ArrowLeft className="h-5 w-5 text-foreground" />
  </button>
);

const HeroBanner = () => {
  const { banners, loading } = useBanners();

  const settings = {
    dots: true,
    infinite: banners.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: banners.length > 1,
    autoplaySpeed: 6000,
    arrows: banners.length > 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    pauseOnHover: true,
  };

  if (loading || banners.length === 0) return null;

  return (
    <section className="hero-slider-light relative w-full overflow-hidden bg-surface-beige">
      <Slider {...settings}>
        {banners.map((banner) => (
          <div key={banner._id}>
            <div className="px-4 sm:px-6 lg:px-12 xl:px-20 2xl:px-40 py-10 md:py-16">
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                <div className="flex-1 flex flex-col gap-4 text-center md:text-left">
                  <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                    A Smarter Way to Shop
                  </span>
                  <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground leading-tight">
                    {banner.title}
                  </h1>
                  {banner.subtitle && (
                    <p className="text-base sm:text-lg text-text-secondary max-w-md mx-auto md:mx-0">
                      {banner.subtitle}
                    </p>
                  )}
                  <div className="flex items-center justify-center md:justify-start gap-3 mt-2">
                    <Button asChild>
                      <Link to={banner.ctaUrl || "/shop"}>{banner.ctaText || "Shop Now"}</Link>
                    </Button>
                    <Button asChild variant="outline">
                      <Link to="/categories">Explore Categories</Link>
                    </Button>
                  </div>
                </div>

                <div className="flex-1 w-full">
                  <picture>
                    {banner.mobileImage && (
                      <source media="(max-width: 640px)" srcSet={banner.mobileImage} />
                    )}
                    <img
                      src={banner.desktopImage}
                      alt={banner.title}
                      className="w-full h-[280px] sm:h-[380px] md:h-[420px] object-cover rounded-2xl shadow-soft"
                    />
                  </picture>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default HeroBanner;
