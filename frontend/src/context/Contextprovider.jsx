import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const shopcontext = createContext();

export function Contextprovider(props) {
  const curr = '$';
  const navigate = useNavigate();
  const delfee = 10;
  const backend = process.env.REACT_APP_backend;
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
  const [token, settoken] = useState(localStorage.getItem('token') || '');
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      getcart({token});
      getwishlist({token});
      getorders({token});
      console.log(backend);
    } else {
      localStorage.removeItem('token');  
    }
  }, [token]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get(`${backend}/api/products/listproduct`);
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
   
    let cartdata = structuredClone(cart);
  
    
    if (cartdata[id]) {
      if (cartdata[id][size]) cartdata[id][size] += 1;
      else cartdata[id][size] = 1;
    } else {
      cartdata[id] = {};
      cartdata[id][size] = 1;
    }
    setCart(cartdata);
  
   
    const itemid = id;
  
    try {
      
      const res = await axios.post(`${backend}/api/cart/addcart`, { itemid, size }, {
        headers: {
          token, 
        },
      });
    console.log(res.data);
      if (res.data.success === false) {
        console.log(res.data.message); 
      }
    } catch (error) {
      console.error('Failed to add item to cart:', error.message); 
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
      const res=await axios.get(`${backend}/api/cart/placeorder`,{
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
    try {
    
      let updatedOrders = [...orders];
      updatedOrders.splice(index, 1);
      setOrders(updatedOrders);
  
   
      const cartResponse = await axios.post(
        `${backend}/api/cart/cancelorder`,
        { index },
        {
          headers: {
            token,
          },
        }
      );

      if (!cartResponse.data.success) {
        console.log('Cart cancellation failed:', cartResponse.data.message);
      } else {
        console.log('Cart cancellation successful:', cartResponse.data);
      }
  
     
      const ordersResponse = await axios.post(
        `${backend}/api/orders/cancelorder`,
        { index },
        {
          headers: {
            token, 
          },
        }
      );
      if (!ordersResponse.data.success) {
        console.log('Order cancellation failed:', ordersResponse.data.message);
      } else {
        console.log('Order cancellation successful:', ordersResponse.data);
      }
    } catch (error) {
      console.error('Failed to cancel order:', error.message);
    }
  }
  
  async function getorders({token}){
    const res=await axios.get(`${backend}/api/cart/getorders`,{
     headers:{
       token,
     }
    })
    console.log(res.data);
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
    const res=await axios.post(`${backend}/api/cart/updatecart`,{itemid,size,quantity},{
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
     const res=await axios.get(`${backend}/api/cart/getcart`,{
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
       const res=await axios.post(`${backend}/api/wishlist/additem`,{id},{
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
      const res=await axios.post(`${backend}/api/wishlist/removeitem`,{id},{
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
    const res=await axios.get(`${backend}/api/wishlist/getitem`,{
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
    setpassword,
    backend,
  };

  return (
    <shopcontext.Provider value={value}>
      {props.children}
    </shopcontext.Provider>
  );
}