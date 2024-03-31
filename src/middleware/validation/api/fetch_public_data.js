const { query, validationResult } = require("express-validator");

const validateFetchPublicDataRequestMiddleware = [
    // Validate category query parameter (if required)
    query("category")
        .optional()
        .isString()
        .withMessage("Category must be a string. hint 'category' (string)"),
  
    // Validate limit query parameter (if required)
    query("limit")
        .default(100)
        .isInt({ min: 1, max: 100 })
        .withMessage("Limit must be an integer between 1 and 100. hint 'limit' (integer)"),
  
    // Validate offset query parameter (if required)
    query("offset")
        .default(0)
        .isInt({ min: 0 })
        .withMessage("Offset must be a non-negative integer. hint 'offset' (integer)"),
  
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
module.exports = validateFetchPublicDataRequestMiddleware;