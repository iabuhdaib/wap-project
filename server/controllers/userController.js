const User = require('../models/user');



exports.authenticate = (req, res, next) => {
    const authenticationResult = User.doAuthentication(res, req.body.username, req.body.password);
    
    if (!authenticationResult) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    res.status(200).json(authenticationResult);
  };



  
  