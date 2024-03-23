const Product = require('../model/products');
// Products
// app.get('/api/products',
const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getProducts };