function calculateEquation(x) {
    return Math.log(x) - Math.atan(x)
}

function findSolutionByIteration(interval, n) {
    let result = []
    let afterDot = getAmountAfterDot(n)
    for(let i = interval.min; i <= interval.max; i += n) {
        let j = +i.toFixed(afterDot)
        result.push({'Y': calculateEquation(j), 'X': j})
    }
    return result
}

function getAmountAfterDot(n) {
    return n > 0 && n < 1 ? n.toString().length - 2 : 0
}