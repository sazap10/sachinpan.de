var config = {
  development: {
    server: {
      port: process.env.PORT,
    },
    database: {
      url: 'mongodb://localhost/website_dev'
    }
  },
  testing: {
    server: {
      port: 3001
    },
    database: {
      url: 'mongodb://localhost/website_test'
    }
  },
  production: {
    server: {
      port: 8080
    },
    database: {
      url: 'mongodb://localhost/website'
    }
  }
};

module.exports = config[process.env.NODE_ENV || 'development'];
