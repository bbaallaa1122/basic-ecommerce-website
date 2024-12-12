import productmodel from "../models/productmodel.js";
import usermodel from "../models/usermodel.js";

export const addcart = async (req, res) => {
    try {
        const { userid,itemid, size } = req.body;
        
        const userdata = await usermodel.findById(userid);
        const usercart = { ...userdata.cart };

        if (usercart[itemid]) {
            usercart[itemid][size] = (usercart[itemid][size] || 0) + 1;
        } else {
            usercart[itemid] = { [size]: 1 };
        }
     
        await usermodel.findByIdAndUpdate(userid, { cart: usercart });
        res.json({ success: true, message: "Product added to cart" ,usercart});
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
export const updatecart = async (req, res) => {
    try {
        const { userid,itemid, size, quantity } = req.body;
        const userdata = await usermodel.findById(userid);
        const usercart = { ...userdata.cart };
        if (!usercart[itemid]) usercart[itemid] = {};
        usercart[itemid][size] = quantity;

        await usermodel.findByIdAndUpdate(userid, { cart: usercart });
        res.json({ success: true, message: "Cart updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const getcart = async (req, res) => {
    try {
        const {userid} = req.body;
        const userdata = await usermodel.findById(userid);
        res.json({ success: true, cart: userdata.cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
export const placeorder =async(req,res)=>{
    try{
       const {userid}=req.body;
       const userdata = await usermodel.findById(userid);
       const cart = { ...userdata.cart };
       const temporders=userdata.orders;
       for (const ids in cart) {
        for (const sizes in cart[ids]) {
          const today = new Date();
          const product = productmodel.findById(ids);
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
      await usermodel.findByIdAndUpdate(userid, { orders:temporders});
      await usermodel.findByIdAndUpdate(userid, { cart:{}});
      res.json({success:true,message:"orders placed successfully"});
    }
    catch(error){
        res.json({success:false,message:error.message});
    }
}
export const cancelorder=async (req,res) => {
    try{
    const {userid,index}=req.body;
    const userdata = await usermodel.findById(userid);
    const temporders=userdata.orders;
    temporders.splice(index, 1);
    await usermodel.findByIdAndUpdate(userid, { orders:temporders});
    res.json({success:true,message:"orders cancelled successfully"});
}
catch(error){
    res.json({success:false,message:error.message});
}
}
export const getorders = async (req, res) => {
    try {
        const {userid} = req.body;
        const userdata = await usermodel.findById(userid);
        res.json({ success: true, orders: userdata.orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
 
