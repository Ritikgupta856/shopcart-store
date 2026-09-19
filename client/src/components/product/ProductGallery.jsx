import { useState } from "react";

const ProductGallery = ({ images, name, discountPercent }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const activeImage = images[activeIndex] || images[0];

  return (
    <div className="flex flex-col gap-4">
      <div
        className="group relative aspect-square w-full overflow-hidden rounded-xl border border-border bg-secondary p-6 sm:p-10"
        onClick={() => setZoomed((v) => !v)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setZoomed((v) => !v)}
        aria-label={zoomed ? "Zoom out" : "Zoom in"}
      >
        <img
          src={activeImage}
          alt={name}
          className={`h-full w-full object-contain transition-transform duration-300 ${
            zoomed ? "scale-150 cursor-zoom-out" : "cursor-zoom-in group-hover:scale-105"
          }`}
        />

        {discountPercent > 0 && (
          <span className="absolute left-4 top-4 rounded-md bg-danger px-2.5 py-1 text-xs font-semibold leading-none text-white">
            {discountPercent}% OFF
          </span>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex flex-wrap gap-3">
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => {
                setActiveIndex(index);
                setZoomed(false);
              }}
              aria-label={`View image ${index + 1}`}
              className={`size-20 shrink-0 overflow-hidden rounded-lg border bg-secondary p-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                index === activeIndex ? "border-primary" : "border-border hover:border-primary/40"
              }`}
            >
              <img src={image} alt="" className="h-full w-full object-contain" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
