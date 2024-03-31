const { json } = require("express")
const logger = require("../../utilities/logger")
const LoginService = require("../../services/user/login")

exports.loginUser = async (req, res, next) => {
    logger_metadata = {
        "urn": req.request_urn
    }

    logger.info("Initialising login service.", logger_metadata)
    const loginService = new LoginService(
        urn=req.request_urn
    )

    logger.info("Preparing user data", logger_metadata)
    const userData = {
        email: req.body.email,
        password: req.body.password
    }

    logger.info("Running login service", logger_metadata)
    const response_payload = await loginService.run(userData)

    return res.status(response_payload.status_code).json(response_payload.data)
} 