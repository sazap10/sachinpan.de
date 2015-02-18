var config = {
  
  development: {
    server: {
      port: process.env.PORT,
    },
    mailgunApiKey: 'key-9bd4rphdayz03zzbl862csif408arem3'
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
