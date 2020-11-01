import {getAmountAfterDot} from "./utilities";
import {generateGraph, findSolutionByIteration} from './task1'

export let data = [
    {d: 28, b: 75, t: 10},
    {d: 21, b: 70, t: 15},
    {d: 14, b: 60, t: 16},
    {d: 7, b: 80, t: 17},
    {d: 3, b: 70, t: 13},
    {d: 2, b: 75, t: 14},
]

function calculateLeftEquation(x) {
    return Math.log10(x + 1)
}

function calculateRightEquation(x, data) {
    let {d, b, t} = data
    return 0.561 - 8.701 * Math.pow(d, -4) + 3.935 * Math.pow(d, 2) * Math.pow(10, -7) + 7.187 * b * Math.pow(10, -4) + 0.0398 * t - Math.log10(x + 1)
}

export function calculateEquation(interval, dataset, precision) {
    let data = generateGraph(interval, precision, (x) => calculateRightEquation(x, dataset))
    let result = findSolutionByIteration(data)
    return {data, correctY: 0, correctX: result[0]}
}

// export function calculateEquation(interval, data, precision) {
//     let {min, max} = interval
//     if(min > max) throw new Error('Min не може бути більше max')
//     if(precision <= 0) throw new Error('Точність не може бути менше 0')
//     let rightPart = +calculateRightEquation(...Object.values(data))
//     let lowest = Infinity
//     let result = { data: [], correctY: 0, correctX: 0}
//     for(let i = min; i < max; i += precision) {
//         let correctX = +i.toFixed(getAmountAfterDot(precision))
//         let calculatedY = calculateLeftEquation(correctX)
//         result.data.push({X: correctX, Y: calculatedY})
//         if(Math.abs(rightPart - calculatedY) < lowest) {
//             result.correctX = correctX
//             result.correctY = calculatedY
//             lowest = Math.abs(rightPart - calculatedY)
//         }
//     }
//     return result
// }