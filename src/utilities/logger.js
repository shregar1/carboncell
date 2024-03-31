const winston = require('winston');

// Create a logger instance
const logger = winston.createLogger({
  level: 'info', // Logging level
  format: winston.format.json(), // JSON format for log messages
  transports: [
    new winston.transports.Console(), // Log to the console
    new winston.transports.File({ filename: 'error.log', level: 'error' }), // Log errors to a file
    new winston.transports.File({ filename: 'combined.log' }) // Log all levels to a file
  ]
});

module.exports = logger;
