const { v4: uuidv4 } = require('uuid');

const UserRepository = require("../../repositories/user")
const Authentication = require("../../module/authentication/auth")
const logger = require("../../utilities/logger")


class LoginService{
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
                email: data["email"],
                password: data["password"]
            }
            this.logger.info("Prepared user document", this.logger_metadata)
    
            this.logger.info("Fetching user", this.logger_metadata)
            const userData = await this.userRepository.fetchuserbyemailandpassword(newUser.email, newUser.password)
            this.logger.info("Fetched user", this.logger_metadata)
    
            if (!userData){
    
                this.logger.info("Incorrect email or password.", this.logger_metadata)
                return {
                    status_code: 422,
                    data: {
                        "urn": this.urn,
                        "status": false,
                        "message": "Incorrect Email or Password",
                        "response_key": "error_authetication_failed"
                    }
                }
            }
    
            this.logger.info("Inserting User Document", this.logger_metadata)
            const result = await this.userRepository.updateLoginData(userData.urn);
            this.logger.info("Inserted User Document", this.logger_metadata)
    
            this.logger.info("Preparing jwt payload", this.logger_metadata)
            const payload  = {
                "urn": result.urn,
                "username": result.username,
                "email": result.email,
                "last_login": result.last_login,
                "is_logged_in": result.is_logged_in
            }
            this.logger.info("Prepared jwt payload", this.logger_metadata)
    
            this.logger.info("Initialising authentication utility", this.logger_metadata)
            const authentication = new Authentication(this.urn, process.env.SECRET_KEY)
    
            this.logger.info("Generating JWT token", this.logger_metadata)
            const token = authentication.generateJWT(payload)
    
            return {
                status_code: 200,
                data: {
                    "urn": this.urn,
                    "status": true,
                    "message": "User login successfull.",
                    "response_key": "success_login",
                    "data": {
                        "token": token
                    }
                }
            }

        } catch(error){

            this.logger.error(`An error occurred while loggin in: ${error}`, this.logger_metadata);
            return {
                status_code: 500,
                data: {
                    "urn": this.urn,
                    "status": false,
                    "message": "Failed to login user.",
                    "response_key": "error_login_failed"
                }
            }
        }
    }
}

module.exports = LoginService;