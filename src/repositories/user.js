const dbClient = require("../module/db/postgres")
const logger = require("../utilities/logger")
    
class UserRepository{
    constructor(urn){
        this.urn = urn
        this.logger = logger
    }

    async createUser(userData) {
        const queryText = 'INSERT INTO users (urn, username, email, password) VALUES($1, $2, $3, $4) RETURNING *';
        const values = [userData.urn, userData.username, userData.email, userData.password];
        const result = await dbClient.query(queryText, values)
        console.log('Inserted row:', result.rows[0])
        return result.rows[0]
    }

    async fetchuserbyusernameoremail(username, email){
        const queryText = "Select * from users WHERE username=$1 OR email=$2 Limit 1"
        const values = [username, email]
        const result = await dbClient.query(queryText, values)
        if (result.rows.length == 0){
            return null
        }
        return result.rows[0]
    }

    async fetchuserbyemailandpassword(email, password){
        const queryText = "Select * from users WHERE email=$1 and password=$2 Limit 1"
        const values = [email, password]
        const result = await dbClient.query(queryText, values)
        if (result.rows.length == 0){
            return null
        }
        return result.rows[0]
    }

    async fetchuserbyurn(urn){
        const queryText = "Select * from users WHERE urn=$1 Limit 1"
        const values = [urn]
        const result = await dbClient.query(queryText, values)
        if (result.rows.length == 0){
            return null
        }
        return result.rows[0]
    } 

    async updateLoginData(urn){
        const queryText = "UPDATE users SET last_login = current_timestamp, is_logged_in = true, updated_at = current_timestamp WHERE urn = $1 RETURNING *"
        const values = [urn]
        const result = await dbClient.query(queryText, values)
        return result.rows[0]
    }

    async updateLogoutData(urn){
        const queryText = "UPDATE users SET is_logged_in = false, updated_at = current_timestamp WHERE urn = $1 RETURNING *"
        const values = [urn]
        const result = await dbClient.query(queryText, values)
        return result.rows[0]
    }
}
module.exports = UserRepository;