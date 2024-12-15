import usermodel from "../models/usermodel.js";

export const additem = async (req, res) => {
    try {
        const { userid, id } = req.body;

        
        const userdata = await usermodel.findById(userid);
        if (!userdata) {
            return res.json({ success: false, message: "User not found" });
        }

       
        const wish = userdata.wishlist || [];
        if (!wish.includes(id)) {
            wish.push(id);
            await usermodel.findByIdAndUpdate(userid, { wishlist: wish });
            return res.json({ success: true, message: "Added successfully" });
        }

        res.json({ success: false, message: "Item already in wishlist" });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Failed to add item" });
    }
};
export const removeitem = async (req, res) => {
    try {
        const { userid, id } = req.body;

        
        const userdata = await usermodel.findById(userid);
        if (!userdata) {
            return res.json({ success: false, message: "User not found" });
        }

       
        const wish = userdata.wishlist || [];
        const index = wish.indexOf(id);
        if (index > -1) {
            wish.splice(index, 1);
            await usermodel.findByIdAndUpdate(userid, { wishlist: wish });
            return res.json({ success: true, message: "Removed successfully" });
        }

        res.json({ success: false, message: "Item not found in wishlist" });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Failed to remove item" });
    }
};
export const getitem = async (req, res) => {
    try {
        const { userid } = req.body;

       
        const userdata = await usermodel.findById(userid);
        if (!userdata) {
            return res.json({ success: false, message: "User not found" });
        }

        res.json({ success: true, wishlist: userdata.wishlist || [] });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Failed to fetch wishlist" });
    }
};
