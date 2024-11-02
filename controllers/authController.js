const fs = require('fs');
const jwt = require('jsonwebtoken');
const userDataPath = './models/userModel.json';

const secretKey = 'secretKey123'; // Llave para firmar el JWT (cambiar en producción)

function register(req, res) {
    const { username, password, role } = req.body;

    // Leer datos de usuarios existentes
    const users = JSON.parse(fs.readFileSync(userDataPath));

    // Verificar si el usuario ya existe
    if (users.find(user => user.username === username)) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Agregar nuevo usuario
    users.push({ username, password, role });
    fs.writeFileSync(userDataPath, JSON.stringify(users));

    res.status(201).json({ message: 'User registered successfully' });
}

function login(req, res) {
    const { username, password } = req.body;
    const users = JSON.parse(fs.readFileSync(userDataPath));

    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generar token JWT
    const token = jwt.sign({ username, role: user.role }, secretKey, { expiresIn: '1h' });
    res.json({ token });
}

module.exports = { register, login };
