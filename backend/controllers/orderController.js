import orders from "../models/orders.js";
import carts from "../models/carts.js";
import products from "../models/products.js";
import Address from "../models/address.js";

export const placeOrder = async (req, res) => {
  try {
    const { userId, addressId } = req.body;

    if (!userId || !addressId) {
      return res.status(400).json({ message: "userId and addressId required" });
    }

    const address = await Address.findById(addressId);
    if (!address) {
      return res.status(400).json({ message: "Invalid address" });
    }

    const cart = await carts
      .findOne({ userId })
      .populate("items.productId");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const orderItems = cart.items.map(item => {
      if (item.productId.stock < item.quantity) {
        throw new Error("Insufficient stock");
      }

      return {
        productId: item.productId._id,
        quantity: item.quantity,
        price: item.productId.price
      };
    });

    const totalAmount = orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    for (const item of orderItems) {
      await products.findByIdAndUpdate(
        item.productId,
        { $inc: { stock: -item.quantity } }
      );
    }

    const order = await orders.create({
      userId,
      items: orderItems,
      address,
      totalAmount,
      paymentMethod: "COD",
      status: "Placed"
    });

    await carts.findOneAndUpdate(
      { userId },
      { items: [] }
    );

    res.status(201).json({
      message: "Order placed successfully",
      orderId: order._id
    });

  } catch (error) {
    res.status(500).json({
      message: "Order placement failed",
      error: error.message
    });
  }
};
