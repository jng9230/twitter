/**
 * checks that the `body` contains all the fields 
 * described in `fields`
*/
const hasFields = (body, fields) => {
    console.log(body)
    console.log(fields)
    for (let i = 0; i < fields.length; i ++){
        if (!(fields[i] in body)){
            return false
        }
    }
    return true 
}

module.exports = hasFields