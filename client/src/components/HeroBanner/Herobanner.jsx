
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button } from '../ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const slides = [
  {
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=100&w=3840",
    title: "Premium Headphones",
    description: "Immerse yourself in studio-quality sound with our premium collection"
  },
  {
    image: "https://images.unsplash.com/photo-1508243771214-6e95d137426b?auto=format&fit=crop&q=100&w=3840",
    title: "Smart Watches",
    description: "Elevate your lifestyle with cutting-edge wearable technology"
  },
  {
    image: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&q=100&w=3840",
    title: "Home Theatre Systems",
    description: "Experience cinematic excellence in the comfort of your home"
  },
  {
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=100&w=3840",
    title: "Wireless Earbuds",
    description: "Uncompromised sound quality meets ultimate portability"
  },

  {
    image: "https://images.unsplash.com/photo-1420161900862-9a86fa1f5c79?auto=format&fit=crop&q=100&w=3840",
    title: "Bluetooth Speakers",
    description: "Premium audio engineering meets sophisticated design"
  }
];

const NextArrow = ({onClick}) => (
  <button
    onClick={onClick}
    className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/20 p-2 backdrop-blur-sm transition hover:bg-white/40"
  >
    <ArrowRight className="h-6 w-6 text-white" />
  </button>
);

const PrevArrow = ({onClick}) => (
  <button
    onClick={onClick}
    className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/20 p-2 backdrop-blur-sm transition hover:bg-white/40"
  >
    <ArrowLeft className="h-6 w-6 text-white" />
  </button>
);

const HeroBanner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    cssEase: "linear",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    pauseOnHover: true
  };

  return (
    <div className="hero-slider">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative h-[70vh]">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${slide.image})`,
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <h1 className="mb-4  text-4xl sm:text-6xl font-bold tracking-tight">{slide.title}</h1>
                  <p className="mb-8 text-xl sm:text-2xl font-light">{slide.description}</p>
                  <div className="flex items-center justify-center gap-4">
                    <Button variant="outline" className="bg-white/10 text-white backdrop-blur-sm hover:bg-white/20">
                      Shop Now
                    </Button>
                    <Button variant="outline" className="bg-white/10 text-white backdrop-blur-sm hover:bg-white/20">
                      Read More
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroBanner