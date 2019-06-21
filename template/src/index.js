const Database = require('./db')
const debug = require('debug')
const error = debug('start:error')
const Server = require('./server')

const run = async () => {
    try {
        const db = Database()
        const server = Server()

        await db.connect(process.env.MONGODB_URI)
        server.listen(process.env.PORT)
    }
    catch(e) {
        error(e)
    }
}

(async () => await run())()

