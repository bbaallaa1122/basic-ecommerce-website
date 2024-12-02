import { createContext, useEffect, useState } from "react";
import { products } from "../assests/assets";
export const shopcontext=createContext();
export function Contextprovider(props){
  const curr='$';
  const delfee=10;
  const [searchitem,setSearchitem]=useState('');
  const [cart,setCart]=useState({});
  const [orders,setOrders]=useState([]);
  const [wishlist,setWishlist]=useState([]);
  const [users,setusers]=useState([]);
  function addcart({id,size}){
    let cartdata=structuredClone(cart);
       if(cartdata[id]){
        if(cartdata[id][size])
           cartdata[id][size]+=1;
        else 
          cartdata[id][size]=1;
       }
       else  {cartdata[id]={};
         cartdata[id][size]=1;}
      setCart(cartdata);
  }
  function updateorders(){
    let temporders=structuredClone(orders);
    for(const ids in cart){
      for(const sizes in cart[ids]){
        const today = new Date();
        const product=products.find((item)=>item._id===ids);
        const del=product.deltime
        today.setDate(today.getDate()+del); 
        const date = today.toISOString().split('T')[0]; 
          temporders.push({
             id:ids,
             size:sizes,
             quantity:cart[ids][sizes],
             deldate:date,
          })
          console.log(ids);
      }
    }
    setOrders(temporders);
  }
  function cancelorders(index){
    let updatedOrders = [...orders];
    updatedOrders.splice(index, 1); 
    setOrders(updatedOrders);
  }
  function updatecart({id,size,quantity}){
    let cartdata=structuredClone(cart);
    if(quantity===0){
      delete cartdata[id][size];
    }
    else{
    cartdata[id][size]=quantity;}
    setCart(cartdata);
  }
  function cartcount(){
    var count=0;
     for(const ids in cart){
        for(const sizes in cart[ids]){
           count+=cart[ids][sizes];
        }
     }
     return count;
  }
  function addwishlist({ id }) {
    let wishdata = [...wishlist];
    if (!wishdata.includes(id)) {
      wishdata.push(id);
    }
    setWishlist(wishdata);
  }
   const [totalamount,settotalamount]=useState(0);
   function updateamount(amount){
     settotalamount(amount);
   }
  function removewishlist({ id }) {
    let wishdata = wishlist.filter((item) => item !== id);
    setWishlist(wishdata);
  }
  useEffect(()=>{
    console.log(cart)
  },[cart])
  useEffect(()=>{
    console.log(wishlist)
  },[wishlist])
  const value={
    products,curr,delfee,searchitem,setSearchitem,cart,wishlist,
    addcart,addwishlist,cartcount,removewishlist,
    updatecart,totalamount,updateamount,orders,updateorders,cancelorders,users,setusers
  }
  return (

    <shopcontext.Provider value={value}>
        {props.children}
    </shopcontext.Provider>
  )
}







