const { json } = require("express")

const logger = require("../../utilities/logger")
const FetchPublicDataService = require("../../services/core/fetchdata")

exports.fetchPublicData = async (req, res, next) => {
    logger_metadata = {
        "urn": req.request_urn
    }
    logger.info("Initialising Fetch public data service.", logger_metadata)
    const fetchPublicDataService = new FetchPublicDataService(
        urn=req.request_urn
    )
    logger.info("Running Fetch public data service.", logger_metadata)
    const response_payload = await fetchPublicDataService.run(req.query)

    return res.status(response_payload.status_code).json(response_payload.data)
} 