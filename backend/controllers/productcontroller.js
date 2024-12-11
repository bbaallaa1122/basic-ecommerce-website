import cloudinary from 'cloudinary';
import Product from '../models/productmodel.js';
export const addproduct = async (req, res) => {
  try {
    const { name, description, price, category, subcategory, size, bestseller, deltime} = req.body;
    const imageUrls = [];
    if (req.files) {
      for (let key in req.files) {
        for (let file of req.files[key]) {
          if (file.path !== undefined) {
            const cloudinaryResponse = await cloudinary.v2.uploader.upload(file.path);
            imageUrls.push(cloudinaryResponse.secure_url);
          }
        }
      }
    }

    const newProduct = new Product({
      name,
      description,
      price: Number(price), 
      image: imageUrls,
      category,
      subcategory,
      size: JSON.parse(size),
      date: Date.now(),
      bestseller: bestseller === 'true', 
      deltime,
    });

    await newProduct.save();
    return res.json({
      success: true,
      message: "Item added successfully!", 
      product: newProduct
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: 'Error adding product' });
  }
};

export const listproduct = async (req, res) => {
  try {
    const products = await Product.find();
    res.json({
      message: 'Products retrieved successfully!',
      products
    });
  } catch (err) {
    console.log(err);
    res.json({ message: 'Error fetching products' });
  }
};
export const delproduct = async (req, res) => {
  try {
    const { itemId } = req.body; 
    console.log("Product ID to delete:", itemId); 

    const deletedProduct = await Product.findByIdAndDelete(itemId);
   
    if (!deletedProduct) {
      return res.json({ success: false, message: 'Product not found' });
    }

    res.json({
      success: true,
      message: 'Product deleted successfully!',
    });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: 'Error deleting product' });
  }
};

export const productinfo = async (req, res) => {
  try {
    const  productId  = req.body;
    const product = await Product.findById(productId);

    if (!product) {
      return res.json({success:false, message: 'Product not found' });
    }

    res.json({
      success:true,
      product
    });
  } catch (err) {
    console.log(err);
    res.json({ success:false,message: 'Error fetching product info' });
  }
};
