const statuses = require('statuses')

const error = (code, message) => ({
    code,
    message,
    json: function() {
        return JSON.stringify(this)
    }
})

module.exports = {
    httpError: status => error(status, statuses[status])
}