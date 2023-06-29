var numeral = require('numeral')
export const formatNumber = (x:number) => {
    return numeral(x).format("0a")
}