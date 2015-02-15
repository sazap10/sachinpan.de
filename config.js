var config = {
  
  development: {
    server: {
      port: process.env.PORT,
    },
    mailgunApiKey: 'MAILGUN-API-KEY'
  },
  testing: {
    server: {
      port: 3001
    },
    mailgunApiKey: 'MAILGUN-API-KEY',
  },
  production: {
    server: {
      port: 8080
    },
    mailgunApiKey: 'MAILGUN-API-KEY',
  }
};
module.exports = config[process.env.NODE_ENV || 'development'];
