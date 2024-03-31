const { body, validationResult } = require("express-validator");

const validateRegisterRequestMiddleware = [
    // Validate email field
    body("username")
        .isString()
        .withMessage("Username is a string. hint 'username' (string)")
        .notEmpty()
        .withMessage("Username is required. hint 'username' (string)"),

    // Validate email field
    body("email")
        .isString()
        .withMessage("Email is a string. hint 'email' (string)")
        .isEmail()
        .withMessage("Invalid email address. hint 'email' (string)")
        .notEmpty()
        .withMessage("Email is required. hint 'email' (string)"),
  
    // Validate password field
    body("password")
        .isString()
        .withMessage("Password is a string. hint 'password' (string)")
        .notEmpty()
        .withMessage("Password is required. hint 'password' (string)")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long. hint 'password' (string)"),
  
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
  ];

  module.exports = validateRegisterRequestMiddleware;