import React from 'react';

const ProductsSkeleton = ({headingText}) => {
  return (
    <div className="px-4 py-4 md:px-6 mt-10 ">
        <h1 className="text-2xl font-medium uppercase">{headingText}</h1>
        <div className='w-20 h-2 border-b-4 border-purple-600 mt-1'></div>
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-10 my-10 md:my-15 cursor-pointer mb-20">
    {Array(16).fill().map((_, index) => (
        <div key={index} className="bg-neutral-400 rounded-2xl animate-pulse">
          <div className="w-full h-40 md:h-80"></div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default ProductsSkeleton;
