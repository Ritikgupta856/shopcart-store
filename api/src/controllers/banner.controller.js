import { Banner } from "../models/banner.model.js";
import { deleteFromCloudinary } from "../utills/cloudinary.js";

export const addBanner = async (req, res) => {
  try {
    const {
      title,
      ctaUrl,
      desktopImage,
      mobileImage,
      startDate,
      endDate,
      isActive,
      displayOrder,
    } = req.body;

    if (!title || !desktopImage) {
      return res.status(400).json({ success: false, message: "Title and desktop image are required" });
    }

    const banner = await Banner.create({
      title,
      ctaUrl: ctaUrl || "/",
      desktopImage,
      mobileImage: mobileImage || "",
      startDate: startDate || null,
      endDate: endDate || null,
      isActive: isActive !== undefined ? isActive : true,
      displayOrder: displayOrder !== undefined ? Number(displayOrder) : 0,
    });

    res.status(201).json({ success: true, banner });
  } catch (error) {
    console.error("Error adding banner:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const removeBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Banner.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Banner not found" });
    }

    await deleteFromCloudinary(deleted.desktopImage);
    if (deleted.mobileImage) {
      await deleteFromCloudinary(deleted.mobileImage);
    }

    res.json({ success: true, banner: deleted });
  } catch (error) {
    console.error("Error removing banner:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getAllBanners = async (req, res) => {
  try {
    const banners = await Banner.find({}).sort({ displayOrder: 1, createdAt: -1 });
    res.json({ success: true, banners });
  } catch (error) {
    console.error("Error fetching banners:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getActiveBanners = async (req, res) => {
  try {
    const now = new Date();
    const banners = await Banner.find({
      isActive: true,
      $and: [
        { $or: [{ startDate: null }, { startDate: { $lte: now } }] },
        { $or: [{ endDate: null }, { endDate: { $gte: now } }] },
      ],
    }).sort({ displayOrder: 1, createdAt: -1 });
    res.json({ success: true, banners });
  } catch (error) {
    console.error("Error fetching active banners:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
