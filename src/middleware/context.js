const {v4: uuidv4} = require("uuid")
const logger = require("../utilities/logger")

const requestContextMiddleware = (req, res, next) => {
    logger.info("Inside requestContext Middleware")
    const request_urn = uuidv4()
    logger.info(`Generated request URN ${request_urn}`)
    req.request_urn = request_urn
    next()
}

module.exports = requestContextMiddleware;