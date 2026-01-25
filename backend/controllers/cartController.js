import Cart from "../models/carts.js";

// Add to cart
export const addToCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({ message: "Missing userId or productId" });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = await Cart.create({
        userId,
        items: [{ productId, quantity: 1 }],
      });

      await cart.populate("items.productId");

      return res.json({
        message: "Cart created and item added successfully",
        cart,
      });
    }

    const item = cart.items.find(
      (i) => i.productId.toString() === productId
    );

    if (item) {
      item.quantity += 1;
    } else {
      cart.items.push({ productId, quantity: 1 });
    }

    await cart.save();
    await cart.populate("items.productId");

    res.json({
      message: "Cart updated successfully",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      message: "error in adding to cart",
      Error: error.message,
    });
  }
};

export const removeItem = async (req, res) => {
  const { userId, productId } = req.body;

  if (!userId || !productId) {
    return res.status(400).json({ message: "Missing data" });
  }

  const cart = await Cart.findOne({ userId });
  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  cart.items = cart.items.filter(
    (i) => i.productId.toString() !== productId
  );

  await cart.save();
  await cart.populate("items.productId");

  res.json({
    message: "Item removed from cart",
    cart,
  });
};

export const getUserCart = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId || userId === "undefined") {
      return res.status(400).json({ message: "Invalid userId" });
    }

    let cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart) {
      cart = await Cart.create({ userId, items: [] });
    }

    res.json({
      message: "User cart fetched successfully",
      cart,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error in fetching user cart",
      Error: err.message,
    });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.items.find(
      (i) => i.productId.toString() === productId
    );

    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    item.quantity = quantity;
    await cart.save();
    await cart.populate("items.productId");

    res.json({
      message: "Cart item updated successfully",
      cart,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error in updating cart item",
      Error: err.message,
    });
  }
};
