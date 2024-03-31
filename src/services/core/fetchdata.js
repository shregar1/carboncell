const axios = require("axios")
const logger = require("../../utilities/logger")
const API_URL = require("../../constants/public_api")


class FetchPublicData{
    constructor(urn){
        this.urn = urn
        this.logger = logger
        this.logger_metadata = {
            "urn": this.urn
        }
    }

    async run(data){

        try {

            this.logger.info("Making request to public api.", this.logger_metadata)
            const response = await axios.get(API_URL);

            this.logger.info("Fetching response data.", this.logger_metadata)
            const response_payload = await response.data;
            let filteredData = response_payload.entries
            
            if (data.category && data.category.toLowerCase().trim()){
                this.logger.info("Filtering response data.", this.logger_metadata)
                filteredData = filteredData.filter(item => item.Category.toLowerCase().trim() == data.category.toLowerCase().trim())
            }
    
            this.logger.info("Filetered response data.", this.logger_metadata)
            return {
                status_code: 200,
                data: {
                    "urn": this.urn,
                    "status": true,
                    "message": "Successfully fetched public data",
                    "response_key": "success_data_fetch",
                    "data": filteredData.slice(parseInt(data.offset), parseInt(data.offset)+parseInt(data.limit))
                }
            }

          } catch (error) {

            this.logger.error(`An error occurred while fetching data: ${error}`, this.logger_metadata);
            return {
                status_code: 500,
                data: {
                    "urn": this.urn,
                    "status": true,
                    "message": "Failed to fetched public data",
                    "response_key": "error_data_fetch"
                }
            }
          }
    }
}

module.exports = FetchPublicData;