const { v4: uuidv4 } = require('uuid');

const logger = require("../../utilities/logger")

const UserRepository = require("../../repositories/user")

class RegistrationService{
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

            this.logger.info("Preparing user document", this.logger_metadata)
            const newUser = {
                urn: uuidv4(),
                username: data["username"],
                email: data["email"],
                password: data["password"]
            }
            this.logger.info("Prepared user document", this.logger_metadata)
    
            this.logger.info("Fetching user", this.logger_metadata)
            const userData = await this.userRepository.fetchuserbyusernameoremail(newUser.username, newUser.email)
            this.logger.info("Fetched user", this.logger_metadata)
    
            if (userData){
    
                this.logger.info("Unername or email already exists", this.logger_metadata)
                return {
                    status_code: 422,
                    data: {
                        "urn": this.urn,
                        "status": false,
                        "message": "Username or Email exists",
                        "response_key": "error_username_exists"
                    }
                }
            }
    
            this.logger.info("Inserting User Document", this.logger_metadata)
            const result = await this.userRepository.createUser(newUser);
            this.logger.info("Inserted User Document", this.logger_metadata)
    
            return {
                status_code: 200,
                data: {
                    "urn": this.urn,
                    "status": true,
                    "message": "User registration successfull.",
                    "response_key": "success_user_registration",
                    "data": {
                        "user_urn": result.urn,
                        "username": result.username,
                        "email": result.email
                    }
                }
            }

        } catch(error) {

            this.logger.error(`An error occurred while user registration: ${error}`, this.logger_metadata);
            return {
                status_code: 500,
                data: {
                    "urn": this.urn,
                    "status": false,
                    "message": "Failed to register user.",
                    "response_key": "error_registration_failed"
                }
            }  
        }
    }
}

module.exports = RegistrationService;