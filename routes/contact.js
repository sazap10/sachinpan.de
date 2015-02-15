var express = require('express'),
    config  = require("../config");

console.log(config);
module.exports = (function() {
    var contact = express.Router();

    contact.post('/', function(req, res) {
        var name = req.body.name;
        var email = req.body.email;
        var message = req.body.message;
        if(typeof name !== 'undefined' || typeof email !== 'undefined' || typeof message !== 'undefined'){
            res.status(400).send('One of the variables is empty');
            return;
        }
        console.log("sending email");
        res.send('processing the login form!');
    });

    return contact;
    
})();
