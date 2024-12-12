import mongoose from "mongoose";

const userschema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cart: { type: Object, default: {}, minimize: false }, // Retain empty objects
    wishlist: { type: Array, default: [] }, // Use array for wishlist
}, { minimize: false }); // Optional: Remove if not required globally

const usermodel = mongoose.models.user || mongoose.model('user', userschema);

export default usermodel;
