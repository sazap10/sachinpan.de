/**
 * do something with the user model
 * var User = require('../models/user');
 */

exports.index = function (req, res) {
  res.render('index', {
    title: 'Sachin Pande',
    currentUrl: '/'
  });
};
