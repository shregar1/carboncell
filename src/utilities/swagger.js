const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Carbon Cell',
      version: '1.0.0',
      description: 'Documentation for Carbon Cell',
    },
    servers: [
        {
            url: "http://127.0.0.1:4000"
        }
    ],
  },
  apis: ['src/routes/core/*.js', 'src/routes/user/*.js'], // Specify the file where your routes are defined
};

const specs = swaggerJsdoc(options);

module.exports = specs;