import Slider from "react-slick";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ArrowLeft, ArrowRight } from "lucide-react";
import useBanners from "@/hooks/useBanners";

const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-card border border-border shadow-soft p-2 hover:bg-secondary transition-colors"
  >
    <ArrowRight className="h-5 w-5 text-foreground" />
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-card border border-border shadow-soft p-2 hover:bg-secondary transition-colors"
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
