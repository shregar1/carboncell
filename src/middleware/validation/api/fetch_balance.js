const { query, validationResult } = require('express-validator');

const validateFetchBalanceRequestMiddleware = [
    // Validate category query parameter (if required)
    query('address')
        .isString()
        .withMessage("Address is a string. hint 'address' (string)")
        .notEmpty()
        .withMessage("Address is required. hint 'address' (string)"),
  
    // Handle validation errors
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json(
            { 
                urn: req.request_urn,
                message: "Parameter validation failed",
                response_key: "error_param_validation",
                errors: errors.array()
            }
        );
      }
      next();
    }
]
module.exports = validateFetchBalanceRequestMiddleware;