import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = (fileBuffer, folder = "misc") => {
  return new Promise((resolve, reject) => {
    if (!fileBuffer) return resolve(null);

    const stream = cloudinary.uploader.upload_stream(
      { resource_type: "image", folder: `shopcart/${folder}` },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          return resolve(null);
        }
        console.log("File is uploaded to Cloudinary:", result.url);
        resolve(result);
      }
    );

    stream.end(fileBuffer);
  });
};

const getPublicIdFromUrl = (imageUrl) => {
  if (!imageUrl) return null;
  const match = imageUrl.match(/\/upload\/(?:v\d+\/)?(.+)\.[a-zA-Z0-9]+$/);
  return match ? match[1] : null;
};

const deleteFromCloudinary = async (imageUrl) => {
  const publicId = getPublicIdFromUrl(imageUrl);
  if (!publicId) return;

  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: "image" });
  } catch (error) {
    console.error("Cloudinary delete error:", error);
  }
};

export { uploadOnCloudinary, deleteFromCloudinary };
