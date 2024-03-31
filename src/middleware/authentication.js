const logger = require("../utilities/logger")
const Authentication = require("../module/authentication/auth")

const authenticationMiddleware = (req, res, next) => {
    const logger_metadata = {
        "urn": req.request_urn
    }
    logger.info(`Inside Authentication Middleware`, logger_metadata)
    const headers = req.headers

    const token = headers["authorization"]
    if (!token || !String(token).trim()){
        payload = {
            "request_urn": req.request_urn,
            "message": "Authentication token not found",
            "response_key": "error_authentication_failed"
        }
        return res.status(401).json(payload)
    }

    logger.info("Initialising authentication utility", logger_metadata)
    const authentication = new Authentication(
        urn=req.request_urn, 
        secretKey=process.env.SECRET_KEY
    )

    logger.info("Verifying JWT", logger_metadata)
    const authentication_data = authentication.verifyJWT(token.split(" ")[1])
    if (!authentication_data){

        logger.error("JWT verification failed", logger_metadata)
        payload = {
            "request_urn": req.request_urn,
            "message": "Authentication token verification failed",
            "response_key": "error_authentication_failed"
        }
        return res.status(403).json(payload)
    }
    logger.info("JWT verification Successful", logger_metadata)
    req.user_data = authentication_data
    next()
}

module.exports = authenticationMiddleware;