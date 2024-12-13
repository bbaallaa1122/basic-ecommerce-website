import ordermodel from "../models/ordermodel.js";
export const allorders = async (req, res) => {
  try {
    // Fetch all orders from the order model
    const orders = await ordermodel.find();

    // Send the orders in the response
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
      console.log(tempOrders);
  
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
        });
  
        const savedOrder = await newOrder.save();
        savedOrders.push(savedOrder);
      }
  
      // Respond with a success message
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
  
      res.status(200).json({ success: true, message: 'Order canceled successfully!' });
    } catch (error) {
      console.error('Error canceling order:', error.message);
      res.status(500).json({ success: false, message: 'Faid to cancel the order' });
    }
  };
  