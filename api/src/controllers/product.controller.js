import { Product } from "../models/product.model.js";
import { Category } from "../models/category.model.js";
import { Review } from "../models/review.model.js";
import { deleteFromCloudinary } from "../utills/cloudinary.js";

const attachReviewStats = async (products) => {
  const ids = products.map((p) => p._id);
  if (ids.length === 0) return products;

  const stats = await Review.aggregate([
    { $match: { product: { $in: ids }, status: "approved" } },
    { $group: { _id: "$product", avgRating: { $avg: "$rating" }, count: { $sum: 1 } } },
  ]);
  const statsMap = new Map(stats.map((s) => [s._id.toString(), s]));

  return products.map((p) => {
    const stat = statsMap.get(p._id.toString());
    return {
      ...p,
      rating: stat ? Math.round(stat.avgRating * 10) / 10 : 0,
      reviewCount: stat ? stat.count : 0,
    };
  });
};

const withComputedStock = (productDoc) => {
  const product = productDoc.toObject ? productDoc.toObject() : productDoc;
  const hasVariants = (product.variants?.length || 0) > 0;
  const totalStock = hasVariants
    ? product.variants.reduce((sum, v) => sum + (v.stock || 0), 0)
    : product.stock || 0;
  const discountPercent =
    product.mrp && Number(product.mrp) > Number(product.price)
      ? Math.round(((Number(product.mrp) - Number(product.price)) / Number(product.mrp)) * 100)
      : 0;
  return { ...product, hasVariants, totalStock, discountPercent };
};

const validateVariants = (variants) => {
  if (!Array.isArray(variants)) return "variants must be an array";
  for (const v of variants) {
    if (!v.size && !v.color) {
      return "Each variant needs at least a size or a color";
    }
    if (v.stock === undefined || v.stock === null || Number(v.stock) < 0) {
      return "Each variant needs a non-negative stock value";
    }
  }
  return null;
};

export const addProduct = async (req, res) => {
  try {
    const {
      name,
      slug,
      description,
      image,
      price,
      category,
      variants,
      stock,
      brand,
      mrp,
      isTrending,
      isNewArrival,
    } = req.body;

    if (!name || !slug || !description || !image || !price || !category) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    let normalizedVariants = [];
    if (variants && variants.length > 0) {
      const variantError = validateVariants(variants);
      if (variantError) {
        return res.status(400).json({ success: false, message: variantError });
      }
      normalizedVariants = variants.map((v) => ({
        size: v.size || "",
        color: v.color || "",
        stock: Number(v.stock),
        sku: v.sku || "",
      }));
    }

    const normalizedStock =
      normalizedVariants.length === 0 && stock !== undefined ? Number(stock) : 0;

    if (normalizedVariants.length === 0 && (isNaN(normalizedStock) || normalizedStock < 0)) {
      return res.status(400).json({ success: false, message: "Stock must be a non-negative number" });
    }

    const newProduct = new Product({
      name,
      slug,
      description,
      image,
      price,
      category,
      variants: normalizedVariants,
      stock: normalizedStock,
      brand: brand || "",
      mrp: mrp ? Number(mrp) : null,
      isTrending: !!isTrending,
      isNewArrival: !!isNewArrival,
    });
    await newProduct.save();

    res.status(201).json({ success: true, product: withComputedStock(newProduct) });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const removeProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    await deleteFromCloudinary(deletedProduct.image);

    res.json({ success: true, product: deletedProduct });
  } catch (error) {
    console.error("Error removing product:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export const getAllProducts = async (req, res) => {
  try {
    let {
      page = 1,
      limit,
      search,
      category,
      brand,
      minPrice,
      maxPrice,
      sort,
      inStock,
      collection,
    } = req.query;

    page = Math.max(1, parseInt(page) || 1);
    // No explicit limit means "return everything" (existing callers like useProducts()
    // rely on this for the full catalog); the Shop page always passes its own limit.
    limit = limit !== undefined ? Math.max(1, Math.min(100, parseInt(limit) || 20)) : Number.MAX_SAFE_INTEGER;

    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    if (category) {
      const categoryDoc = await Category.findOne({ slug: category });
      if (!categoryDoc) {
        return res.json({
          success: true,
          products: [],
          total: 0,
          page,
          limit,
          totalPages: 0,
        });
      }
      query.category = categoryDoc._id;
    }

    if (brand) {
      query.brand = { $regex: `^${brand}$`, $options: "i" };
    }

    if (collection === "trending") {
      query.isTrending = true;
    } else if (collection === "new-arrivals") {
      query.isNewArrival = true;
    }

    let products = await Product.find(query).populate("category", "_id name slug");
    let computed = products.map(withComputedStock);

    if (minPrice !== undefined) {
      computed = computed.filter((p) => Number(p.price) >= Number(minPrice));
    }
    if (maxPrice !== undefined) {
      computed = computed.filter((p) => Number(p.price) <= Number(maxPrice));
    }
    if (inStock === "true") {
      computed = computed.filter((p) => p.totalStock > 0);
    }

    const sortFns = {
      newest: (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      "price-low": (a, b) => Number(a.price) - Number(b.price),
      "price-high": (a, b) => Number(b.price) - Number(a.price),
      popular: (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    };
    if (sort && sortFns[sort]) {
      computed.sort(sortFns[sort]);
    }

    const total = computed.length;
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const start = (page - 1) * limit;
    const paginated = await attachReviewStats(computed.slice(start, start + limit));

    res.json({
      success: true,
      products: paginated,
      total,
      page,
      limit: limit === Number.MAX_SAFE_INTEGER ? total : limit,
      totalPages,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const product = await Product.findOne({ slug }).populate("category", "_id name slug");

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    const [withStats] = await attachReviewStats([withComputedStock(product)]);
    res.json({ success: true, product: withStats });
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
