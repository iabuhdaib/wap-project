const users = [
    {
        "id": 1,
        "username": "ibrahim",
        "password": "123",
        "fullName" :"Ibrahim Abu Hdaib"
    },
    {
        "id": 2,
        "username": "nizar",
        "password": "nizar",
        "fullName" :"Nizar Moulaa "
    },
];

const jwt = require('jsonwebtoken');
const config = require('../config');
const { json } = require('express');
const secretKey = config.secretKey;
console.log(secretKey)

    

    

    exports.doAuthentication = (res, username, password) => {
        const user = users.find((user) => user.username === username && user.password === password);
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });

        // Return the token in the response
        return {username:user.username, userid:user.id ,token:token};
 
    }

