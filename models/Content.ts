import mongoose, { Schema } from "mongoose";

const ContentSchema = new Schema({
  type: { type: String, enum: ["video", "reel", "post", "image", "banner"], required: true },
  platform: { type: String, enum: ["youtube", "instagram", "facebook", "website"], required: true },
  url: { type: String, required: true },
  embedUrl: { type: String, default: "" },
  title: { type: String, default: "" },
  description: { type: String, default: "" },
  thumbnail: { type: String, default: "" },
  category: { type: String, default: "" },
  featured: { type: Boolean, default: false },
  published: { type: Boolean, default: true },
  displayOrder: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.models.Content || mongoose.model("Content", ContentSchema);
