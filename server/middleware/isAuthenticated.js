require('dotenv').config()
const jwt = require('jsonwebtoken') //this is used to generate and verify JSON web tokens
const {SECRET} = process.env

module.exports = {
    isAuthenticated: (req, res, next) => { //this function invokes the next middleware function in the chain
        const headerToken = req.get('Authorization')

        if (!headerToken) {
            console.log('ERROR IN auth middleware')
            res.sendStatus(401) //sends an unauthorized 401 response to the client
        }

        let token //declares the variable token & will be used to store the decodded JWT

        try {
            token = jwt.verify(headerToken, SECRET)
        } catch (err) {
            err.statusCode = 500
            throw err
        } //verifies the authenticity and integrity of the JWT

        if (!token) {
            const error = new Error('Not authenticated.')
            error.statusCode = 401
            throw error
        } //checks if the variable is falsy, and creates a new "error" object with the Not aunthenticated message

        next() //if everything passes authentication, then it invokes the next function to proceed to the next middleware
    }
}