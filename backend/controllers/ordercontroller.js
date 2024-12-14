import adminmodel from "../models/adminmodel.js";
import ordermodel from "../models/ordermodel.js";

export const allorders = async (req, res) => {
  try {
    const { adminid } = req.body; // Extract adminid from the request body
    // Find orders where the admin field matches the adminid
    const orders = await ordermodel.find({ admin: adminid });
    res.json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching all orders:", error.message);
    // Send an error response
    res.json({ success: false, message: error.message });
  }
};

export const updateorders = async (req, res) => {
    try {
      const { userid, tempOrders } = req.body;
      const savedOrders = [];
      for (const order of tempOrders) {
        // Ensure deldate is a valid date
        const deldate = new Date(order.deldate);
        
        if (isNaN(deldate.getTime())) {
          // If the date is invalid, return an error
          console.log('Invalid delivery date:', order.deldate);
          return res.status(400).json({ success: false, message: 'Invalid delivery date' });
        }
        const newOrder = new ordermodel({
          userid,
          productid: order.productid,
          size: order.size,
          quantity: order.quantity,
          address: order.address,
          deldate,
          admin:order.admin,
        });
        
        const savedOrder = await newOrder.save();
        savedOrders.push(savedOrder);

      const admin = await adminmodel.findById(order.admin); 

      if (!admin) {
        return res.status(404).json({ success: false, message: 'Admin not found' });
      }
      admin.orders.push(savedOrder._id); 
      await admin.save();
      }
      res.status(200).json({ success: true, message: 'Orders placed successfully!', orders: savedOrders });
    } catch (error) {
      console.error('Error saving orders:', error);
      res.status(500).json({ success: false, message: 'Failed to save orders' });
    }
  };
  

export const cancelorder = async (req, res) => {
  try {
    const { userid, index } = req.body;

    if (index === undefined) {
      return res.status(400).json({ success: false, message: 'Index is required' });
    }

    // Fetch all orders for the user
    const userOrders = await ordermodel.find({ userid });
    console.log('User Orders:', userOrders);
    if (!userOrders || userOrders.length === 0) {
      return res.status(404).json({ success: false, message: 'No orders found' });
    }
    if (index < 0 || index >= userOrders.length) {
      return res.status(400).json({ success: false, message: 'Invalid index' });
    }

    const orderToDelete = userOrders[index];
    console.log('Order to delete:', orderToDelete);
    await ordermodel.findByIdAndDelete(orderToDelete._id);
    const adminId = orderToDelete.admin;
    await adminmodel.findByIdAndUpdate(adminId, {
      $pull: { orders: orderToDelete._id },
    });
    res.status(200).json({ success: true, message: 'Order canceled successfully!' });
  } catch (error) {
    console.error('Error canceling order:', error.message);
    res.status(500).json({ success: false, message: 'Failed to cancel the order' });
  }
};
