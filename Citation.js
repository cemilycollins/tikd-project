const moment = require('moment-timezone');

class Citation {
    constructor(ticketNumber, issueDate, violation, meterNumber, location, time) {
        this.ticketNumber = ticketNumber
        this.issueDate = issueDate
        this.violation = violation
        this.meterNumber = meterNumber
        this.location = location
        this.time = time
        this.UTCDateTime = this.formatUTCDateTime(issueDate, time)
    }

    
    formatUTCDateTime(date, time) {
        // Date and time come from scraper in this format 
        // Date: '02/21/2019'
        // Time: '10:46PM'
        // needs to convert to 'YYYY-MM-DD HH:mm" (military time)

        // split date and time strings
        let parseDate = date.split('/')
        let parseTime = time.split(':')

        // if time is PM, add 12 to hours to convert to 24 hour time
        if (parseTime[1].slice(2) === "PM") {
            parseTime[0] = parseInt(parseTime[0]) + 12
        }

        // store date/time pieces in more readable variables
        const MM = parseDate[0]
        const DD = parseDate[1]
        const YYYY = parseDate[2]
        const HH = `${parseTime[0]}`
        const mm = parseTime[1].slice(0,2)

        // use moment-time to convert to UTC time
        let a = moment.tz(`${YYYY + "-" + MM + "-" + DD} ${HH + ":" + mm}`, "America/New_York");
        return a.utc().format()
    }
}

module.exports = Citation