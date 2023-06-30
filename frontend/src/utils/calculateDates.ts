const DateDiff = require("date-diff").default;

export const dateDiffPretty = (d1: Date, d2: Date) => {
    const res = new DateDiff(d1, d2);
    if ( res.years() >= 1 ){
        return parseInt(res.years()) + "y"
    } else if ( res.months() >= 1 ){
        return parseInt(res.months()) + "mo"
    } else if ( res.weeks() >= 1){
        return parseInt(res.weeks()) + "w"
    }  else if ( res.days() >= 1 ){
        return parseInt(res.days()) + "d"
    } else if ( res.hours() >= 1 ){
        return parseInt(res.hours()) + "h"
    } else if ( res.minutes() >= 1 ){
        return parseInt(res.minutes()) + "m"
    } else {
        return "now"
    }

}