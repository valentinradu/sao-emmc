const mongoose = require('mongoose')
const debug = require('debug')
const error = debug('db:error')
const log = debug('db:log')

const collections = []

mongoose.connection.on('open', () => sync())
mongoose.connection.on('error', err => error(err))

const connect = url => mongoose.connect(url, {
    autoReconnect: true,
    reconnectTries: 1000000,
    reconnectInterval: 3000,
    useNewUrlParser: true,
})

const disconnect = () => mongoose.connection.close()
const clear = async () => {
    for (const collection of collections) {
        await collection.deleteMany({})
    }
}

const sync = async () => {
    try {
        await Promise.all(collections.map(r => r.syncIndexes()))
    }
    catch(e) {
        log(e)
    }
}

module.exports = () => ({connect, sync, disconnect, clear})