
import about from "../../assets/about.jpg";

function AboutUs() {
  return (
    <div className="container py-6 px-4 h-fit">

      <div className="flex flex-col items-center lg:flex-row sm:justify-center mb-10">
        <img src={about} alt="" width={500}/>
        <div className="flex flex-col">
          <h2 className="text-3xl sm:text-4xl text-center font-medium uppercase mb-8">Who are we?</h2>

          <div className="flex text-sm sm:text-medium flex-col font-medium text-justify gap-8 text-[navy]">
          <p>
            Welcome to ShopCart, your ultimate destination for style,
            inspiration, and exceptional shopping experiences. We are dedicated
            to providing a diverse and curated collection of products that cater
            to your unique preferences and lifestyle.
          </p>

          <p>
            At ShopCart, we believe that fashion goes beyond boundaries. Our
            platform brings together a wide range of categories, including
            clothing, accessories, home decor, beauty, and more. We aim to be
            your go-to source for discovering the latest trends and timeless
            classics, all in one convenient place.
          </p>
          <p>
            With a passion for quality and style, we meticulously curate our
            collection from a variety of sources. From established brands to
            independent artisans, we handpick each item to ensure that it meets
            our high standards of excellence. Every product featured on
            ShopCart reflects our commitment to providing you with
            exceptional craftsmanship, innovative design, and unparalleled
            value.
          </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
