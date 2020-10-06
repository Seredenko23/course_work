import {getRandom} from "./utilities";

function equation(x) {
    return Math.sin(x)/(1 + Math.pow(x, 2))
}

function rectangle(interval, step) {
    let {max, min} = interval
    let area = 0
    let d = (max - min)/step
    let xStart = min
    for(let i = 0; i < step; i++) {
        let xEnd = xStart + d
        let xMiddle = (xStart + xEnd) / 2
        area = area + d * equation(xMiddle)
        xStart = xEnd
    }
    return area
}

function trap(interval, step) {
    let {max, min} = interval
    let area = (equation(min) + equation(max)) / 2
    let height =  (max-min)/step
    for(let x = min + height; x < max; x += height) area += equation(x)
    return area*height
}

function simpson(interval, step) {
    let {max, min} = interval
    let height =  (max-min)/step
    let area = (equation(min) + equation(max)) / 2 + 2 * equation(min+height/2)
    for(let x = min + height; x < max; x += height) area += 2 * equation(x+height/2) + equation(x)
    return area*height/3
}

function monteCarlo(interval, yInterval, amountOfDots) {
    let {xMax, xMin} = interval
    let {yMax, yMin} = yInterval
    let validDot = 0
    let area = (yMax - yMin) * (xMax - xMin)
    for(let i = 0; i < amountOfDots; i++) {
        let rndX = getRandom(xMin, xMax)
        let rndY = getRandom(yMin, yMax)
        if(rndY <= equation(rndX)) validDot++
    }
    return validDot / amountOfDots * area
}