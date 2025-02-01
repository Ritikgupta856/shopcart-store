import about from "../../assets/about.jpg";

function AboutUs() {
  return (
    <div className="container py-12 px-6 bg-gray-50">
 
      <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
      
        <div className="lg:w-1/2 relative overflow-hidden rounded-lg shadow-lg">
          <img
            src={about}
            alt="ShopCart - Your Ultimate Audio & Tech Store"
            className="w-full h-auto object-cover transform transition-transform duration-500 hover:scale-105"
          />
        </div>


        <div className="lg:w-1/2 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center lg:text-left text-[navy] uppercase mb-6">
            Who Are We?
          </h2>
          <p className="text-base sm:text-lg text-gray-700 text-justify">
            Welcome to ShopCart, your ultimate destination for all your audio
            and technology needs! We offer a wide range of products including
            headphones, Bluetooth speakers, smartwatches, and more. With our
            user-friendly website, you can easily shop from the comfort of your
            home and have your favorite items delivered to you.
          </p>
          <p className="text-base sm:text-lg text-gray-700 text-justify">
            At ShopCart, we believe in delivering quality and innovation. Our
            platform brings together a diverse collection of cutting-edge
            gadgets and timeless classics, ensuring that you find exactly what
            you need to elevate your lifestyle.
          </p>
          <p className="text-base sm:text-lg text-gray-700 text-justify">
            With a passion for excellence, we meticulously curate our products
            from trusted brands and innovative creators. Every item on ShopCart
            reflects our commitment to providing exceptional craftsmanship,
            advanced technology, and unparalleled value.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;