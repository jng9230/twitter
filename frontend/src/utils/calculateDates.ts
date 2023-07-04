const DateDiff = require("date-diff").default;

export const dateDiffPretty = (d1: Date, d2: Date) => {
    const res = new DateDiff(d1, d2);
    const tweetDate = d1 < d2 ? d1 : d2

    const str = tweetDate.toLocaleString()
    const split = str.split("/")
    const MMDDYY = split[0] + "/" + split[1] + "/" + split[2].slice(2, 4)

    const MMDD = tweetDate.toLocaleString('default', { month: 'long' }) +
        " " + tweetDate.getDate()

    if ( res.years() >= 1 ){ //MM/DD/YY
        return MMDDYY
    } else if ( res.months() >= 1 ){ //MM/DD
        return MMDD
    } else if (res.weeks() >= 1) { //MM/DD
        return MMDD
    } else if (res.days() >= 1) { //MM/DD
        return MMDD
    } else if ( res.hours() >= 1 ){ //HH
        return parseInt(res.hours()) + "h"
    } else if ( res.minutes() >= 1 ){ //MM
        return parseInt(res.minutes()) + "m"
    } else {
        return "now"
    }
}