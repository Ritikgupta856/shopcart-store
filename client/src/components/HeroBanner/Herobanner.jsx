import { useNavigate } from "react-router-dom";

const Herobanner = () => {
  const navigate = useNavigate();
  return (
    <div className="container flex flex-col-reverse gap-10 w-full px-4 py-4 items-center h-fit md:px-10 md:py-5 md:flex-row md:justify-between md:h-[calc(100vh-50px)] mb-10 ">
      <div className="flex flex-col items-center md:items-start">
        <h1 className="text-5xl md:text-7xl font-bold">
          Experience Sound
        </h1>
        <h2 className="text-3xl md:text-7xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text mb-10">
          Like Never Before
        </h2>

        <p className="text-md md:text-lg font-semibold text-gray-900 mb-10 text-justify">
          Step into the dawn of a revolutionary era in sound technology, where
          unmatched quality and unparalleled experience converge to redefine the
          way you perceive audio. Elevate your auditory journey and immerse
          yourself in a world of sonic excellence like never before.
        </p>

        <div className="flex gap-4">
          <button className="w-40 bg-black flex gap-2 items-center justify-center hover:bg-black/70 transition text-lg py-3 px-4 mt-4 text-white">
            Shop Now
          </button>
          <button
            onClick={() => navigate("/aboutus")}
            className="w-40 bg-red-500 flex gap-2 items-center justify-center hover:bg-red-400 transition text-lg py-3 px-4 mt-4 text-white"
          >
            Read More
          </button>
        </div>
      </div>
      <div className="w-[200px] md:w-[400px] md:h-[450px] shrink-0">
        <img src="/banner-img.png" alt="" className="w-full h-full" />
      </div>
    </div>
  );
};

export default Herobanner;
