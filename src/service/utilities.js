export function getRandom(min, max) {
    return Math.random() * (max - min) + min
}

export function getAmountAfterDot(n) {
    return n > 0 && n < 1 ? n.toString().length - 2 : 0
}

export function getYMax(min, max, equation){
    let maximum = 0
    for(let i = min; i < max; i += 0.1) if(equation(i) > maximum) maximum = equation(i)
    return maximum
}