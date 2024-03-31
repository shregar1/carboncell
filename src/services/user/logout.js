const { v4: uuidv4 } = require('uuid');

const UserRepository = require("../../repositories/user")
const Authentication = require("../../module/authentication/auth")
const logger = require("../../utilities/logger")


class LogoutService{
    constructor(urn){
        this.urn = urn
        this.logger = logger
        this.userRepository = new UserRepository(
            urn=this.urn
        )
        this.logger_metadata = {
            "urn": this.urn
        }
    }

    async run(data){

        try{

            this.logger.info("Inserting User Document", this.logger_metadata)
            const result = await this.userRepository.updateLogoutData(data.urn);
            this.logger.info("Inserted User Document", this.logger_metadata)
    
            return {
                status_code: 200,
                data: {
                    "urn": this.urn,
                    "status": true,
                    "message": "User logout successfull.",
                    "response_key": "success_logout",
                    "data": {
                        "last_login": result.last_login,
                        "is_logged_in": result.is_logged_in
                    }
                }
            }

        } catch(error) {

            this.logger.error(`An error occurred while loggin out: ${error}`, this.logger_metadata);
            return {
                status_code: 500,
                data: {
                    "urn": this.urn,
                    "status": false,
                    "message": "Failed to logout user.",
                    "response_key": "error_logout_failed"
                }   
            }
        }
    }
}

module.exports = LogoutService;