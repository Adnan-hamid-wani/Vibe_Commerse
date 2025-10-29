const CartItem = require('../models/CartItem');
const Product = require('../models/Product');

// POST /api/cart
exports.addToCart = async (req, res) => {
  try {
    const { productId, qty } = req.body;
    if (!productId) return res.status(400).json({ message: 'productId required' });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    // If an identical product exists in cart, increase qty
    let item = await CartItem.findOne({ product: productId });
    if (item) {
      item.qty += qty || 1;
      await item.save();
    } else {
      item = await CartItem.create({ product: productId, qty: qty || 1 });
    }

    // Populate product for response
    await item.populate('product').execPopulate?.();
    item = await CartItem.findById(item._id).populate('product').lean();

    res.status(201).json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/cart
exports.getCart = async (req, res) => {
  try {
    const items = await CartItem.find().populate('product').lean();
    const total = items.reduce((s, it) => s + (it.product.price * it.qty), 0);
    res.json({ items, total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// DELETE /api/cart/:id
exports.removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await CartItem.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Cart item not found' });
    res.json({ message: 'Removed', id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// POST /api/checkout
exports.checkout = async (req, res) => {
  try {
    const { cartItems, name, email } = req.body;
    // For safety, recalc totals server-side from DB
    const populated = await CartItem.find().populate('product').lean();
    const total = populated.reduce((s, it) => s + (it.product.price * it.qty), 0);

    // Here we would create an Order record; for this task return a mock receipt
    const receipt = {
      total,
      timestamp: new Date().toISOString(),
      name: name || 'Guest',
      email: email || ''
    };

    // Optionally clear cart
    await CartItem.deleteMany({});

    res.json({ message: 'Checkout successful', receipt });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
