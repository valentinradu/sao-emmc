const errors = require('../errors')
const cors = require('cors')


const errorsMid = (err, req, res, next) => { // eslint-disable-line no-unused-vars
    const payload = {
        message: err.message || 'Unknown error'
    }
    if (err.name === 'MongoError') {
        res.status(400).json(payload)
    }
    else {
        res.status(err.code || 500).json(payload)
    }
}

module.exports = {
    errorsMid,
}