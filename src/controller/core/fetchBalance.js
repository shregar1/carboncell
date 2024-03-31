const { json } = require("express")

const logger = require("../../utilities/logger")
const FetchBalanceService = require("../../services/core/fetchbalance")

exports.fetchBalance = async (req, res, next) => {
    logger_metadata = {
        "urn": req.request_urn
    }
    logger.info("Initialising Fetch balance service.", logger_metadata)
    const fetchBalanceService = new FetchBalanceService(
        urn=req.request_urn
    )
    logger.info("Running Fetch balance service.", logger_metadata)
    const response_payload = await fetchBalanceService.run(req.query)

    return res.status(response_payload.status_code).json(response_payload.data)
}