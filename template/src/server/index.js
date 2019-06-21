const express = require('express')
const {errorsMid} = require('../middlewares')

module.exports = ctx => {
    const app = express()
    app.set('etag', 'strong')
    app.use('/api', [express.json()], require('../routes'))
    app.use(errorsMid)
    return app
}
