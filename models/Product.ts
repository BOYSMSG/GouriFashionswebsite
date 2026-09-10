import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, index: true },
  description: { type: String, default: "" },
  category: { type: String, default: "Men's Wear", index: true },
  price: { type: Number, default: null },
  originalPrice: { type: Number, default: null },
  sku: { type: String, default: "" },
  sizes: [{ type: String }],
  colors: [{ type: String }],
  tags: [{ type: String }],
  images: [{ type: String }],
  videos: [{ type: String }],
  featured: { type: Boolean, default: false },
  newArrival: { type: Boolean, default: false },
  bestseller: { type: Boolean, default: false },
  availability: { type: String, default: "In Store" },
  published: { type: Boolean, default: true },
  displayOrder: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
