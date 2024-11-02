const fs = require('fs');
const orderDataPath = './models/orderModel.json';
const productDataPath = './models/productModel.json';

function createOrder(req, res) {
    const { username, items } = req.body;
    const products = JSON.parse(fs.readFileSync(productDataPath));
    const orders = JSON.parse(fs.readFileSync(orderDataPath));

    // Calcular el precio total de la orden
    let total = 0;
    const orderItems = items.map(item => {
        const product = products.find(p => p.name === item.name);
        if (product && product.quantity >= item.quantity) {
            total += product.price * item.quantity;
            product.quantity -= item.quantity;
            return { name: item.name, quantity: item.quantity, price: product.price };
        } else {
            return null;
        }
    }).filter(item => item !== null);

    // Guardar la orden
    const order = { username, items: orderItems, total };
    orders.push(order);
    fs.writeFileSync(orderDataPath, JSON.stringify(orders));

    // Actualizar la cantidad de productos
    fs.writeFileSync(productDataPath, JSON.stringify(products));

    res.status(201).json({ message: 'Order created successfully', order });
}

function getOrderHistory(req, res) {
    const { username } = req.params;
    const orders = JSON.parse(fs.readFileSync(orderDataPath));
    const userOrders = orders.filter(order => order.username === username);
    res.json(userOrders);
}

module.exports = { createOrder, getOrderHistory };
