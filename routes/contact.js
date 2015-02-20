var express = require('express'),
    config  = require('../config'),
    Mailgun = require('mailgun-js');

//Your api key, from Mailgun’s Control Panel
var apiKey = config.mailgunApiKey;

//Your domain, from the Mailgun Control Panel
var domain = 'sachinpan.de';

//Your sending email address
var fromWho = 'postmaster@sachinpan.de';

var toWho = 'sazap10+sachinpande@gmail.com';

function validateEmail(email) { 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

module.exports = (function() {
    var contact = express.Router();

    contact.post('/', function(req, res) {
        var name = req.body.name;
        var email = req.body.email;
        var message = req.body.message;
        if(!name || !email|| !message || !validateEmail(email)){
            res.status(400).send('One of the variables is empty');
            return;
        }
        console.log('name: ' + name +', email: ' + email + ', message: ' + message);
        //We pass the api_key and domain to the wrapper, or it won't be able to identify + send emails
        var mailgun = new Mailgun({apiKey: apiKey, domain: domain});
    
        var data = {
        //Specify email data
          from: fromWho,
        //The email to contact
          to: toWho,
        //Subject and text data  
          subject: 'Website Contact Form: ' + name,
          text: 'You have received a new message from your website contact form.\n\n' + 
          'Here are the details:\n\n'+
          'Name: ' + name +'\n\n'+
          'Email: '+ email +'\n\n'+
          'Message:\n' + message
        };
    
        //Invokes the method to send emails given the above data with the helper library
        mailgun.messages().send(data, function (err, body) {
            //If there is an error
            if (err) {
                res.status(500).send('Error sending email.');
                console.log('Error sending email: ', err);
            }
            else {
                res.send('Email sent.');
                console.log('Success sending email: '+body);
            }
        });
    });

    return contact;
    
})();
