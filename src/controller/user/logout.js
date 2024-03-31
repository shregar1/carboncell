const { json } = require("express")
const logger = require("../../utilities/logger")
const LogoutService = require("../../services/user/logout")

exports.logoutUser = async (req, res, next) => {
    logger_metadata = {
        "urn": req.request_urn
    }

    logger.info("Initialising logout service.", logger_metadata)
    const logoutService = new LogoutService(
        urn=req.request_urn
    )

    logger.info("Preparing user data", logger_metadata)
    const logouData = {
        urn: req.user_data.urn
    }

    logger.info("Running logout service", logger_metadata)
    const response_payload = await logoutService.run(logouData)

    return res.status(response_payload.status_code).json(response_payload.data)
} 