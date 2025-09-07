const express = require('express');
const User = require('../models/User');
const Item = require('../models/Item');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/cart
// @desc    Get user's cart
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate({
      path: 'cart.item',
      select: 'name price image category stock'
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Filter out items that no longer exist
    const validCartItems = user.cart.filter(cartItem => cartItem.item);

    // If cart was filtered, update user's cart
    if (validCartItems.length !== user.cart.length) {
      user.cart = validCartItems;
      await user.save();
    }

    const cartItems = validCartItems.map(cartItem => ({
      _id: cartItem._id,
      item: cartItem.item,
      quantity: cartItem.quantity,
      subtotal: cartItem.item.price * cartItem.quantity
    }));

    const total = cartItems.reduce((sum, item) => sum + item.subtotal, 0);

    res.json({
      items: cartItems,
      total,
      itemCount: cartItems.length
    });
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/cart/add
// @desc    Add item to cart
// @access  Private
router.post('/add', auth, async (req, res) => {
  try {
    const { itemId, quantity = 1 } = req.body;

    if (!itemId) {
      return res.status(400).json({ message: 'Item ID is required' });
    }

    // Check if item exists
    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Check stock
    if (item.stock < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if item already in cart
    const existingCartItem = user.cart.find(
      cartItem => cartItem.item.toString() === itemId
    );

    if (existingCartItem) {
      // Update quantity
      const newQuantity = existingCartItem.quantity + Number(quantity);
      
      if (newQuantity > item.stock) {
        return res.status(400).json({ message: 'Cannot exceed available stock' });
      }
      
      existingCartItem.quantity = newQuantity;
    } else {
      // Add new item to cart
      user.cart.push({
        item: itemId,
        quantity: Number(quantity)
      });
    }

    await user.save();

    res.json({ message: 'Item added to cart successfully' });
  } catch (error) {
    console.error('Add to cart error:', error);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid item ID' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/cart/update
// @desc    Update cart item quantity
// @access  Private
router.put('/update', auth, async (req, res) => {
  try {
    const { itemId, quantity } = req.body;

    if (!itemId || quantity === undefined) {
      return res.status(400).json({ message: 'Item ID and quantity are required' });
    }

    if (quantity < 0) {
      return res.status(400).json({ message: 'Quantity cannot be negative' });
    }

    // Check if item exists
    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find cart item
    const cartItemIndex = user.cart.findIndex(
      cartItem => cartItem.item.toString() === itemId
    );

    if (cartItemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    if (quantity === 0) {
      // Remove item from cart
      user.cart.splice(cartItemIndex, 1);
    } else {
      // Check stock
      if (quantity > item.stock) {
        return res.status(400).json({ message: 'Insufficient stock' });
      }
      // Update quantity
      user.cart[cartItemIndex].quantity = Number(quantity);
    }

    await user.save();

    res.json({ message: 'Cart updated successfully' });
  } catch (error) {
    console.error('Update cart error:', error);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid item ID' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/cart/remove/:itemId
// @desc    Remove item from cart
// @access  Private
router.delete('/remove/:itemId', auth, async (req, res) => {
  try {
    const { itemId } = req.params;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find and remove cart item
    const cartItemIndex = user.cart.findIndex(
      cartItem => cartItem.item.toString() === itemId
    );

    if (cartItemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    user.cart.splice(cartItemIndex, 1);
    await user.save();

    res.json({ message: 'Item removed from cart successfully' });
  } catch (error) {
    console.error('Remove from cart error:', error);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid item ID' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/cart/clear
// @desc    Clear entire cart
// @access  Private
router.delete('/clear', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.cart = [];
    await user.save();

    res.json({ message: 'Cart cleared successfully' });
  } catch (error) {
    console.error('Clear cart error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
