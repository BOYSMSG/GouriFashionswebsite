import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  hashtag: { type: String },
  published: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.models.Collection || mongoose.model("Collection", schema);
