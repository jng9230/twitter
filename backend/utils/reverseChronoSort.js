module.exports = reverseChronoSort = (arr) => {
    arr.sort(function (a, b) {
        return a.time > b.time ? -1 : 1
    })
    return arr
}