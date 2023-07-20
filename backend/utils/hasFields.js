const DEBUG = require("../config").DEBUG === "1"
/**
 * checks that the `body` contains all the fields 
 * described in `fields`
*/
const hasFields = (body, fields) => {
    if (DEBUG){
        console.log("CHECKING FIELDS"); 
        console.log(body); 
        console.log(fields)
    }

    for (let i = 0; i < fields.length; i ++){
        if (!body[fields[i]]){
            if (DEBUG) { console.log(fields[i] + " not found") }
            return false
        }
    }
    return true 
}

module.exports = hasFields