import React, { useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Layout from './Layout';

function Additem({ items, setItems }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState(location.state?.category || '');
  const [subcategory, setSubcategory] = useState(location.state?.subcategory || '');
  const [sizes, setSizes] = useState([]);
  const [deliveryDate, setDeliveryDate] = useState(1);
  const [isBestseller, setIsBestseller] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem('token');

  const resetForm = () => {
    setItemName('');
    setItemDescription('');
    setItemPrice('');
    setImages([]);
    setCategory('');
    setSubcategory('');
    setSizes([]);
    setDeliveryDate(1);
    setIsBestseller(false);
  };

  const handleAddItem = async () => {
    if (
      !itemName ||
      !itemDescription ||
      !itemPrice ||
      !category ||
      !subcategory ||
      sizes.length === 0 ||
      !deliveryDate ||
      images.length === 0
    ) {
      toast.error('Please fill all fields before submitting!');
      return;
    }

    if (isNaN(itemPrice) || itemPrice <= 0) {
      toast.error('Please enter a valid price!');
      return;
    }

    const formData = new FormData();
    formData.append('name', itemName);
    formData.append('description', itemDescription);
    formData.append('price', itemPrice);
    formData.append('category', category);
    formData.append('subcategory', subcategory);
    formData.append('size', JSON.stringify(sizes));
    formData.append('Date', Date.now());
    formData.append('deltime', deliveryDate);
    formData.append('bestseller', isBestseller);

    images.forEach((image, index) => {
      formData.append(`image${index + 1}`, image);
    });

    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/products/addproduct', formData, {
        headers: {
          token,
        },
      });
      const data = response.data;
      if (data.success) {
        setItems((prevItems) => [...prevItems, data.product]);
        toast.success(data.message || 'Item added successfully!');
        resetForm();
        navigate('/listitems');
      } else {
        toast.error(data.message || 'Error adding product!');
      }
    } catch (error) {
      if (error.response) {
        toast.error(`Error: ${error.response.data.message}`);
      } else {
        toast.error('Error adding product!');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (e) => {
    const selectedImages = Array.from(e.target.files);

    if (images.length + selectedImages.length > 4) {
      toast.warn('You can only upload up to 4 images.');
      return;
    }

    const validImages = selectedImages.filter((image) => image.type.startsWith('image/'));
    if (validImages.length !== selectedImages.length) {
      toast.error('Only image files are allowed!');
      return;
    }

    setImages((prevImages) => [...prevImages, ...validImages]);
  };

  const handleImageDelete = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleSizeChange = (e) => {
    const size = e.target.value;
    setSizes((prevSizes) =>
      prevSizes.includes(size) ? prevSizes.filter((s) => s !== size) : [...prevSizes, size]
    );
  };

  const ImagePreview = useCallback(({ image, index }) => {
    return (
      <div className="relative">
        <img src={URL.createObjectURL(image)} alt="preview" className="w-24 h-24 object-cover rounded-md" />
        <button
          onClick={() => handleImageDelete(index)}
          className="absolute top-0 right-0 bg-red-600 text-white p-1 rounded-full text-xs"
        >
          X
        </button>
      </div>
    );
  }, []);

  return (
    <Layout>
      <div className="mt-20 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Add New Item</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Item Name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
          <textarea
            placeholder="Item Description"
            value={itemDescription}
            onChange={(e) => setItemDescription(e.target.value)}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
          <input
            type="number"
            placeholder="Item Price"
            value={itemPrice}
            onChange={(e) => setItemPrice(e.target.value)}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          >
            <option value="">Select Category</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
          {category && (
            <select
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            >
              <option value="">Select Subcategory</option>
              {category === 'Men' && (
                <>
                  <option value="Topwear">Topwear</option>
                  <option value="Bottomwear">Bottomwear</option>
                  <option value="Winterwear">Winterwear</option>
                </>
              )}
              {category === 'Women' && (
                <>
                  <option value="Topwear">Topwear</option>
                  <option value="Bottomwear">Bottomwear</option>
                  <option value="Winterwear">Winterwear</option>
                </>
              )}
              {category === 'Kids' && (
                <>
                  <option value="Topwear">Topwear</option>
                  <option value="Bottomwear">Bottomwear</option>
                  <option value="Winterwear">Winterwear</option>
                </>
              )}
            </select>
          )}
          <div className="flex space-x-4">
            {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
              <label key={size} className="flex items-center">
                <input
                  type="checkbox"
                  value={size}
                  checked={sizes.includes(size)}
                  onChange={handleSizeChange}
                  className="mr-2"
                />
                {size}
              </label>
            ))}
          </div>
          <select
            value={deliveryDate}
            onChange={(e) => setDeliveryDate(e.target.value)}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          >
            <option value="">Delivery Time (in days)</option>
            {[...Array(10)].map((_, index) => (
              <option key={index} value={index + 1}>
                {index + 1} day{index + 1 > 1 ? 's' : ''}
              </option>
            ))}
          </select>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
          <div className="flex space-x-2 mt-2">
            {images.length > 0 &&
              images.map((image, index) => <ImagePreview key={index} image={image} index={index} />)}
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={isBestseller}
              onChange={() => setIsBestseller(!isBestseller)}
              className="mr-2"
            />
            <span>Mark as Bestseller</span>
          </div>
          <button
            onClick={handleAddItem}
            disabled={isLoading}
            className="bg-blue-600 text-white p-3 rounded-md w-full hover:bg-blue-700 disabled:bg-gray-400"
          >
            {isLoading ? 'Adding...' : 'Add Item'}
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default Additem;
