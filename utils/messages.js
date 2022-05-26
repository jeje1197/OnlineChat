const moment = require('moment')
// import * as moment from 'moment'

function formatMessage(username, text) {
    return  {
        username,
        text,
        time: moment().format('h:mm a')
    }
}

module.exports = formatMessage