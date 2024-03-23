import Product from "./Product/Product";

const Products = ({ products, innerPage, headingText }) => {
  return (

    <div className="px-8 py-4 mt-10 ">
        {!innerPage && <h1 className="text-2xl font-medium uppercase">{headingText}</h1>}
        <div className='w-20 h-2 border-b-4 border-purple-600 mt-1'></div>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 my-20 cursor-pointer mb-20 ">
      {products.map((item) => (
        <Product key={item._id} id={item._id} data={item} />
      ))}
    </div>
    </div>
  );
};

export default Products;
