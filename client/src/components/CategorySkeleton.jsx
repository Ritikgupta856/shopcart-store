import React from "react";

const CategorySkeleton = () => {
  return (
    <div className="px-4 py-4 md:px-8 mt-10 ">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 my-10">
        {Array(4)
          .fill()
          .map((_, index) => (
            <div key={index} className="bg-neutral-400 animate-pulse">
              <div className="w-full h-40"></div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CategorySkeleton;
