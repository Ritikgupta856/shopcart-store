import Slider from "react-slick";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ArrowLeft, ArrowRight } from "lucide-react";
import useBanners from "@/hooks/useBanners";
import BannerSkeleton from "@/components/skeletons/BannerSkeleton";

const arrowClass =
  "absolute top-1/2 z-10 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card/90 text-foreground shadow-soft backdrop-blur transition-colors hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:flex";

const NextArrow = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label="Next banner"
    className={`${arrowClass} right-4 lg:right-6`}
  >
    <ArrowRight className="h-5 w-5" />
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label="Previous banner"
    className={`${arrowClass} left-4 lg:left-6`}
  >
    <ArrowLeft className="h-5 w-5" />
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

  if (loading) return <BannerSkeleton />;
  if (banners.length === 0) return null;

  return (
    <section className="hero-slider-light relative w-full overflow-hidden">
      <Slider {...settings}>
        {banners.map((banner) => (
          <div key={banner._id}>
            <Link to={banner.ctaUrl || "/shop"} className="block">
              <picture>
                {banner.mobileImage && (
                  <source media="(max-width: 640px)" srcSet={banner.mobileImage} />
                )}
                <img
                  src={banner.desktopImage}
                  alt={banner.title}
                  className="w-full h-auto object-cover"
                />
              </picture>
            </Link>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default HeroBanner;
