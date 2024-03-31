const logger = require("../utilities/logger")

class IService{
    constructor(urn){
        this.urn = urn
        this.logger = logger
    }
}

module.exports = IService;