const fs = require('fs');
const productDataPath = './models/productModel.json';

function getProducts(req, res) {
    const products = JSON.parse(fs.readFileSync(productDataPath));
    res.json(products);
}

function addProduct(req, res) {
    const { name, description, price, quantity } = req.body;
    const products = JSON.parse(fs.readFileSync(productDataPath));

    products.push({ name, description, price, quantity });
    fs.writeFileSync(productDataPath, JSON.stringify(products));

    res.status(201).json({ message: 'Product added successfully' });
}

module.exports = { getProducts, addProduct };
