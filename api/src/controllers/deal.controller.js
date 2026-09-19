import { Deal } from "../models/deal.model.js";
import { deleteFromCloudinary } from "../utills/cloudinary.js";

export const addDeal = async (req, res) => {
  try {
    const { name, description, bannerImage, discount, ctaText, ctaUrl, startDate, endDate, isActive } = req.body;

    if (!name || !bannerImage || !discount) {
      return res.status(400).json({ success: false, message: "Name, banner image, and discount are required" });
    }

    const deal = await Deal.create({
      name,
      description: description || "",
      bannerImage,
      discount,
      ctaText: ctaText || "Shop the Deal",
      ctaUrl: ctaUrl || "/",
      startDate: startDate || null,
      endDate: endDate || null,
      isActive: isActive !== undefined ? isActive : true,
    });

    res.status(201).json({ success: true, deal });
  } catch (error) {
    console.error("Error adding deal:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const removeDeal = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Deal.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Deal not found" });
    }

    await deleteFromCloudinary(deleted.bannerImage);

    res.json({ success: true, deal: deleted });
  } catch (error) {
    console.error("Error removing deal:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getAllDeals = async (req, res) => {
  try {
    const deals = await Deal.find({}).sort({ createdAt: -1 });
    res.json({ success: true, deals });
  } catch (error) {
    console.error("Error fetching deals:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getActiveDeals = async (req, res) => {
  try {
    const now = new Date();
    const deals = await Deal.find({
      isActive: true,
      $and: [
        { $or: [{ startDate: null }, { startDate: { $lte: now } }] },
        { $or: [{ endDate: null }, { endDate: { $gte: now } }] },
      ],
    }).sort({ createdAt: -1 });
    res.json({ success: true, deals });
  } catch (error) {
    console.error("Error fetching active deals:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
