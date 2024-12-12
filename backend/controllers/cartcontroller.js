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
