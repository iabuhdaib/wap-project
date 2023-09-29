const express = require('express');
const jwt = require('jsonwebtoken');
const productRouter = require('./routes/productRouter');
const userRouter = require('./routes/userRouter');
const cartRouter = require('./routes/cartRouter');
const dashRouter = require('./routes/dashRouter');

const userController = require('./controllers/userController');

const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());  

 
app.post('/login', userController.authenticate);


const config = require('./config');
const secretKey = config.secretKey;
console.log(secretKey)


authenticateToken = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authentication token not provided55' });
  }

  // Verify the JWT token

  const decodedToken = jwt.verify(token,secretKey );
  //console.log(req)
  //res.status(200).json({success:true, data:{ token: token,userId:decodedToken.userId}});
  next();
  
}




app.use('/pages', authenticateToken, dashRouter);
app.use('/products', authenticateToken, productRouter);
app.use('/users', authenticateToken, userRouter);
app.use('/carts', authenticateToken, cartRouter);


app.use((req, res, next) => {
  res.status(404).send('API not supported!');
});

app.use((err, req, res, next) => {
  res.status(500).send(err.message);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
