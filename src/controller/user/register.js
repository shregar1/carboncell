const { json } = require("express")
const logger = require("../../utilities/logger")
const RegistrationService = require("../../services/user/register")

exports.registerUser = async (req, res, next) => {
    logger_metadata = {
        "urn": req.request_urn
    }

    logger.info("Initialising registration service.", logger_metadata)
    const registrationService = new RegistrationService(
        urn=req.request_urn
    )

    logger.info("Preparing user data", logger_metadata)
    const userData = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }

    logger.info("Running registration service", logger_metadata)
    const response_payload = await registrationService.run(userData)

    return res.status(response_payload.status_code).json(response_payload.data)
} 