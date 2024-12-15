import mongoose from "mongoose";

const productschema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: Array, required: true },
  category: { type: String, required: true },
  subcategory: { type: String, required: true },
  size: { type: Array, required: true },
  date: { type: Date, required: true },
  bestseller: { type: Boolean },
  deltime: { type: Number, required: true },
  admin: { type:String, required: true }, 
});

const productmodel = mongoose.model("Product", productschema);

export default productmodel;
