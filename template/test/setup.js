const chai = require('chai')
const chaiHttp = require('chai-http')
const Server = require('../src/server')
const Database = require('../src/db')
const {promisify} = require('util')
const superagentUse = require('superagent-use')


before(async () => {
    chai.use(chaiHttp)
    const server = Server()
    const database = Database()
    const request = superagentUse(chai.request(server).keepOpen())
    global.expect = chai.expect
    global.server = server
    global.request = request
    global.db = database
    global.sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

    await db.connect(process.env.MONGODB_URI)
})
after(async () => {
    await promisify(request.close)()
    await db.disconnect()
})
beforeEach(async () => {
    await db.clear()
})


