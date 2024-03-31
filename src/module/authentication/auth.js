const jwt = require("jsonwebtoken")
const logger = require("../../utilities/logger")

class Authentication{
    constructor(urn, secretKey){
        this.urn = urn
        this.secretKey = secretKey
        this.logger = logger
        this.logger_metadata = {
            "urn": this.urn
        }
    }

    generateJWT(payload) {
        const expireIn = process.env.JWT_EXPIRY
        this.logger.info("Generating JWT token.", this.logger_metadata)
        const token = jwt.sign(payload, this.secretKey, {expiresIn:expireIn})
        this.logger.info("Generated JWT token.", this.logger_metadata)
        return token
    }

    verifyJWT(token){
        try{

            this.logger.info("Authenticating JWT token.", this.logger_metadata)
            const payload = jwt.verify(token, this.secretKey)
            this.logger.info("Authentication Successful.", this.logger_metadata)
            return payload

        } catch (err){
            this.logger.error("Authentication Failed.", this.logger_metadata)
            return null
        }
    }
}

module.exports = Authentication;