import mongoose from "mongoose";

const adminschema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    products: { type: [String] ,default:[]}, 
    orders: { type: [String], default: [], minimize: false },
  },
  { minimize: false }
);

const adminmodel = mongoose.models.admin || mongoose.model("admin", adminschema);

export default adminmodel;
