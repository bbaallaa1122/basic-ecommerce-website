import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const shopcontext = createContext();

export function Contextprovider(props) {
  const curr = '$';
  const navigate = useNavigate();
  const delfee = 10;
  const [products, setProducts] = useState([]);
  const [searchitem, setSearchitem] = useState('');
  const [cart, setCart] = useState({});
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [users, setusers] = useState([]);
  const [totalamount, settotalamount] = useState(0);
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  // Initialize token from localStorage, if available
  const [token, settoken] = useState(localStorage.getItem('token') || '');
  
  // Update localStorage when token changes
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      getcart({token});
      getwishlist({token});
      getorders({token});
    } else {
      localStorage.removeItem('token');  // Remove token from localStorage if it's empty
    }
  }, [token]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get("http://localhost:5000/api/products/listproduct");
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProducts();
  }, []);

  function erasecart() {
    setCart({});
  }

  async function addcart({ id, size }) {
    // Clone the cart safely
    let cartdata = structuredClone(cart);
  
    // Update the cart locally
    if (cartdata[id]) {
      if (cartdata[id][size]) cartdata[id][size] += 1;
      else cartdata[id][size] = 1;
    } else {
      cartdata[id] = {};
      cartdata[id][size] = 1;
    }
    setCart(cartdata);
  
    // Prepare data for the API request
    const itemid = id;
  
    try {
      // Send the updated cart item to the backend
      const res = await axios.post('http://localhost:5000/api/cart/addcart', { itemid, size }, {
        headers: {
          token, 
        },
      });
    console.log(res.data);
      if (res.data.success === false) {
        console.log(res.data.message); // Log backend message for debugging
      }
    } catch (error) {
      console.error('Failed to add item to cart:', error.message); // Log Axios errors
    }
  }
  

  async function updateorders() {
    let temporders = structuredClone(orders);
    for (const ids in cart) {
      for (const sizes in cart[ids]) {
        const today = new Date();
        const product = products.find((item) => item._id === ids);
        if (product) {
          const del = product.deltime;
          today.setDate(today.getDate() + del);
          const date = today.toISOString().split('T')[0];
          temporders.push({
            id: ids,
            size: sizes,
            quantity: cart[ids][sizes],
            deldate: date,
          });
        }
      }
    }
    setOrders(temporders);
    try {
      const res=await axios.get('http://localhost:5000/api/cart/placeorder',{
        headers:{
          token,
        },
       })
    console.log(res.data);
      if (res.data.success === false) {
        console.log(res.data.message); 
      }
    } catch (error) {
      console.error('Failed to place order:', error.message); 
    }
  }
  async function cancelorders(index) {
    let updatedOrders = [...orders];
    updatedOrders.splice(index, 1);
    setOrders(updatedOrders);
    try {
      const res = await axios.post('http://localhost:5000/api/cart/cancelorder',{index},{
        headers: {
          token, 
        },
      });
    console.log(res.data);
      if (res.data.success === false) {
        console.log(res.data.message); 
      }
    } catch (error) {
      console.error('Failed to cancelorder ', error.message); 
    }
  }
  async function getorders({token}){
    const res=await axios.get('http://localhost:5000/api/cart/getorders',{
     headers:{
       token,
     }
    })
    if(res.data.success){
       setOrders(res.data.orders);
    }
    else{
     console.log(res.data.message);
    }
}
  async function updatecart({ id, size, quantity }) {
    let cartdata = structuredClone(cart);
    if (quantity === 0) {
      delete cartdata[id][size];
    } else {
      cartdata[id][size] = quantity;
    }
    setCart(cartdata);
    const itemid=id;
    const res=await axios.post('http://localhost:5000/api/cart/updatecart',{itemid,size,quantity},{
      headers:{
        token,
      }
    })
    console.log(res.data);
    if(res.data.success===false){
      console.log(res.data.message);
    }
  }
  async function getcart({token}){
     const res=await axios.get('http://localhost:5000/api/cart/getcart',{
      headers:{
        token,
      }
     })
     if(res.data.success){
        setCart(res.data.cart);
     }
     else{
      console.log(res.data.message);
     }
}
  function cartcount() {
    var count = 0;
    for (const ids in cart) {
      for (const sizes in cart[ids]) {
        count += cart[ids][sizes];
      }
    }
    return count;
  }

  async function addwishlist({ id }) {
    let wishdata = [...wishlist];
    if (!wishdata.includes(id)) {
      wishdata.push(id);
    }
    setWishlist(wishdata);
    try{
       const res=await axios.post('http://localhost:5000/api/wishlist/additem',{id},{
        headers:{
          token,
        }
       });
       if(res.data.success=== false){
         console.log(res.data.message);
       }
    }
    catch(error){
       console.log(error);
    }
  }

  async function removewishlist({ id }) {
    let wishdata = wishlist.filter((item) => item !== id);
    setWishlist(wishdata);
    try{
      const res=await axios.post('http://localhost:5000/api/wishlist/removeitem',{id},{
       headers:{
         token,
       }
      });
      if(res.data.success=== false){
        console.log(res.data.message);
      }
   }
   catch(error){
      console.log(error);
   }
  }
  async function getwishlist({token}){
    const res=await axios.get('http://localhost:5000/api/wishlist/getitem',{
      headers:{
        token,
      }
     })
     if(res.data.success){
        setWishlist(res.data.wishlist);
     }
     else{
      console.log(res.data.message);
     }
  }

  function updateamount(amount) {
    settotalamount(amount);
  }
  
  useEffect(() => {
    console.log(cart);
  }, [cart]);

  useEffect(() => {
    console.log(wishlist);
  }, [wishlist]);

  const value = {
    products,
    setProducts,
    curr,
    delfee,
    searchitem,
    setSearchitem,
    cart,
    setCart,
    wishlist,
    navigate,
    addcart,
    erasecart,
    addwishlist,
    cartcount,
    removewishlist,
    updatecart,
    totalamount,
    updateamount,
    orders,
    updateorders,
    cancelorders,
    users,
    setusers,
    token,
    settoken,
    name,
    setname,
    email,
    setemail,
    password,
    setpassword
  };

  return (
    <shopcontext.Provider value={value}>
      {props.children}
    </shopcontext.Provider>
  );
}
