import {getAmountAfterDot} from "./utilities";

export let data = [
    {d: 28, b: 75, t: 10},
    {d: 21, b: 90, t: 30},
    {d: 14, b: 60, t: 20},
    {d: 7, b: 80, t: 25},
    {d: 3, b: 70, t: 15},
    {d: 1, b: 85, t: 40},
]

function calculateLeftEquation(x) {
    return Math.log10(x + 1)
}

function calculateRightEquation(d, b, t) {
    return 0.561 - 8.701 * Math.pow(d, -4) + 3.935 * Math.pow(d, 2) * Math.pow(10, -7) + 7.187 * b * Math.pow(10, -4) + 0.0398 * t
}

export function calculateEquation(interval, data, precision) {
    let {min, max} = interval
    let rightPart = +calculateRightEquation(...Object.values(data))
    console.log(rightPart)
    let lowest = Infinity
    let result = { data: [], correctY: 0, correctX: 0}
    for(let i = min; i < max; i += precision) {
        let correctX = +i.toFixed(getAmountAfterDot(precision))
        let calculatedY = calculateLeftEquation(correctX)
        result.data.push({X: correctX, Y: calculatedY})
        if(Math.abs(rightPart - calculatedY) < lowest) {
            result.correctX = correctX
            result.correctY = calculatedY
            lowest = Math.abs(rightPart - calculatedY)
        }
    }
    return result
}