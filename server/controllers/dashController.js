const path = require('path');

exports.open = (req, res, next) => {


  res.status(200).json({'success': true});
};