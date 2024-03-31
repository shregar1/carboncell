const express = require("express")
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();

const swaggerDocs = require('./utilities/swagger')

const authenticationMiddleware = require("./middleware/authentication")
const requestContextMiddleware = require("./middleware/context")
const validateLoginRequestMiddleware = require("./middleware/validation/user/login")
const validateFetchPublicDataRequestMiddleware = require("./middleware/validation/api/fetch_public_data")
const validateRegisterRequestMiddleware = require("./middleware/validation/user/register")
const validateFetchBalanceRequestMiddleware = require("./middleware/validation/api/fetch_balance")

const app = express()

const registerRoute = require("./routes/user/register")
const loginRoute = require("./routes/user/login")
const logoutRoute = require("./routes/user/logout")
const fetchPublicDataRoute = require("./routes/core/fetch_public_data")
const fetchBalanceRoute = require("./routes/core/fetch_balance")


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestContextMiddleware)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/register',[validateRegisterRequestMiddleware], registerRoute);
app.use('/login',[validateLoginRequestMiddleware], loginRoute)
app.use("/api/fetch_public_data", [authenticationMiddleware, validateFetchPublicDataRequestMiddleware], fetchPublicDataRoute)
app.use("/api/fetch_balance", [validateFetchBalanceRequestMiddleware], fetchBalanceRoute)
app.use('/logout', authenticationMiddleware, logoutRoute)

app.get('/api/users', (req, res) => {
    res.json({ message: 'List of users' });
  });

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})