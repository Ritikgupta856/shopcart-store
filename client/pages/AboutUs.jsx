import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function AboutUs() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    { number: "50K+", label: "Happy Customers" },
    { number: "500+", label: "Premium Products" },
    { number: "99%", label: "Satisfaction Rate" },
    { number: "24/7", label: "Customer Support" },
  ];

  const features = [
    {
      icon: "🎧",
      title: "Premium Audio",
      description:
        "Curated collection of high-quality headphones and speakers with crystal-clear sound",
    },
    {
      icon: "⌚",
      title: "Smart Technology",
      description:
        "Latest smartwatches and innovative tech gadgets that enhance your daily life",
    },
    {
      icon: "🚚",
      title: "Fast Delivery",
      description:
        "Lightning-fast shipping with real-time tracking to your doorstep",
    },
    {
      icon: "💎",
      title: "Quality Promise",
      description:
        "Only the finest brands and rigorously tested products make our selection",
    },
  ];

  return (
    <div className="min-h-screen py-4 px-4 sm:px-6 lg:px-12 xl:px-20 2xl:px-40 mt-10 w-full mb-10">
      <div className="">
        <div
          className={`flex flex-col items-center gap-12 mb-24 transition-all duration-1000 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <div className="space-y-6">
              <div className="inline-block transform hover:scale-105 transition-transform duration-300">
                <span className="text-sm font-bold text-violet-500 bg-violet-100 px-6 py-3 rounded-full uppercase tracking-wider shadow-lg border border-violet-200">
                  About ShopCart
                </span>
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 leading-tight">
                Who Are We?
              </h1>
              <div className="w-32 h-2 bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 rounded-full mx-auto shadow-lg"></div>
            </div>

            <div className="space-y-8 text-slate-700 max-w-3xl mx-auto">
              <p className="text-xl leading-relaxed font-medium">
                Welcome to{" "}
                <span className="font-bold text-violet-500 bg-violet-50 px-2 py-1 rounded">
                  ShopCart
                </span>
                , your ultimate destination for cutting-edge audio and
                technology! We've revolutionized online shopping with our
                curated collection of premium headphones, Bluetooth speakers,
                smartwatches, and innovative gadgets.
              </p>
              <p className="text-xl leading-relaxed font-medium">
                Our platform combines{" "}
                <span className="font-bold text-violet-500">
                  quality, innovation, and convenience
                </span>{" "}
                to deliver an exceptional shopping experience. From timeless
                classics to the latest tech trends, we ensure every product
                meets our rigorous standards of excellence.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-6 pt-4">
              <button className="group bg-gradient-to-r from-violet-500 to-purple-600 text-white px-10 py-4 rounded-full font-bold shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300 hover:from-violet-600 hover:to-purple-700">
                <Link to="/" className="flex items-center gap-2" >
                  <span className="flex items-center gap-2" >
                    Shop Now
                    <ArrowRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </Link>
              </button>
              <button className="border-2 border-violet-300 text-violet-600 px-10 py-4 rounded-full font-bold hover:border-violet-500 hover:bg-violet-50 hover:text-violet-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                Learn More
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`group text-center p-8 bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-violet-100 hover:shadow-2xl hover:border-violet-300 transform hover:scale-110 transition-all duration-500`}
            >
              <div className="text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-purple-600 mb-3 group-hover:scale-110 transition-transform duration-300">
                {stat.number}
              </div>
              <div className="text-slate-600 font-semibold text-lg">
                {stat.label}
              </div>
              <div className="w-12 h-1 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full mx-auto mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        <div className="space-y-16">
          <div className="text-center space-y-6">
            <h2 className="text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-600">
              Why Choose ShopCart?
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto font-medium leading-relaxed">
              We're committed to delivering excellence through innovation,
              quality, and exceptional customer service that exceeds
              expectations
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group relative p-8 bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl border border-violet-100 hover:shadow-2xl hover:border-violet-300 transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 overflow-hidden`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>

                <div className="relative z-10">
                  <div className="text-5xl mb-6 group-hover:scale-125 transition-all duration-500 filter group-hover:drop-shadow-lg">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-4 group-hover:text-violet-600 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed font-medium">
                    {feature.description}
                  </p>
                  <div className="w-16 h-1 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Mission Statement */}
        <div className="mt-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500 via-purple-600 to-indigo-600 rounded-3xl"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl"></div>
          <div className="relative text-center text-white p-16 rounded-3xl shadow-2xl">
            <div className="absolute top-6 left-6 w-12 h-12 border-2 border-white/30 rounded-full"></div>
            <div className="absolute bottom-6 right-6 w-16 h-16 border-2 border-white/20 rounded-full"></div>
            <div className="absolute top-1/2 left-8 w-8 h-8 bg-white/20 rounded-full blur-sm"></div>

            <h3 className="text-3xl lg:text-4xl font-black mb-8">
              Our Mission
            </h3>
            <p className="text-xl lg:text-2xl max-w-4xl mx-auto leading-relaxed font-medium opacity-95">
              To empower your lifestyle with cutting-edge technology and premium
              audio experiences, while providing unmatched convenience and
              exceptional value in every interaction.
            </p>
            <div className="w-24 h-1 bg-white/60 rounded-full mx-auto mt-8"></div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AboutUs;
