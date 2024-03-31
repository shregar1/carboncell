const {Web3} = require("web3")

const logger = require("../../utilities/logger")

const INFURA_ETHEREUM_MAINNET = require("../../constants/web3")

class FetchAccountBalance{
    constructor(urn){
        this.urn = urn
        this.logger = logger
        this.logger_metadata = {
            "urn": this.urn
        }
        this.web3 = new Web3(INFURA_ETHEREUM_MAINNET);
    }

    async run(data){

        try{
            this.logger.info("Fetching account ethereum balance.", this.logger_metadata)
            const balance = await this.web3.eth.getBalance(data.address)
            .then(balance => {
              const balanceInEther = this.web3.utils.fromWei(balance, 'ether');
              return balanceInEther;
            })
            .catch(error => {
              this.logger.error(`An error occurred while fetching balance: ${error}`, this.logger_metadata);
              return null
            });
            this.logger.info("Fetched account ethereum balance.", this.logger_metadata)
    
            if (!balance){
    
                this.logger.info("Failed to fetch ethereum account balance", this.logger_metadata)
                return {
                    status_code: 422,
                    data: {
                        "urn": this.urn,
                        "status": false,
                        "message": "Failed to fetched ethereum account balance.",
                        "response_key": "error_balance_fetch"
                    }
                }
            }
    
            this.logger.info("Preparing response payload", this.logger_metadata)
            return {
                status_code: 200,
                data: {
                    "urn": this.urn,
                    "status": true,
                    "message": "Successfylly fetched ethereum account balance.",
                    "response_key": "success_balance_fetch",
                    "data": {
                        "balance": balance,
                        "tokenCode": "ETH"
                    }
                }
            }
        } catch (error) {
            this.logger.error(`An error occurred while fetching balance: ${error}`, this.logger_metadata);
            return {
                status_code: 500,
                data: {
                    "urn": this.urn,
                    "status": false,
                    "message": "Failed to fetched ethereum account balance.",
                    "response_key": "error_balance_fetch"
                }
            }
        }

    }
}

module.exports = FetchAccountBalance;