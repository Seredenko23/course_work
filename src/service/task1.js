import {query, WOLFRAM_URL} from "../config/config";

function calculateEquation(x) {
    return Math.log(x) - Math.atan(x)
}

function getAmountAfterDot(n) {
    return n > 0 && n < 1 ? n.toString().length - 2 : 0
}

export function findSolutionByIteration(interval, n) {
    let result = []
    let afterDot = getAmountAfterDot(n)
    for(let i = interval.min; i <= interval.max; i += n) {
        let j = +i.toFixed(afterDot)
        result.push({'Y': calculateEquation(j), 'X': j})
    }
    return result
}

export function findSolutionByDichotomy(interval, n) {
    let {min, max} = interval
    let center
    for(let i = 0; i < n; i++) {
        center = (min + max) / 2
        if(calculateEquation(center) * calculateEquation(max) >= 0) {
            max = center
        } else {
            min = center
        }
    }
    return (min + max) / 2
}

export async function findSolutionByNewton(interval, e) {
    let x1 = interval.max
    let x2 = undefined
    while(!(Math.abs(x2) - Math.abs(x1) < e)) {
        let res = await getInfo(query + x1)
        let equation = res.queryresult.pods[0].subpods[0].plaintext
        x2 = x1
        x1 = calculateRootAtZero(equation)
    }
    return x1
}

export function closestToZero(dots) {
    let closest = dots[0]
    dots.forEach((dot) => {
        if(Math.abs(closest.Y) > Math.abs(dot.Y)) {
            closest = dot
        }
    })
    return closest
}

export async function getInfo(input) {
    let response = await fetch(WOLFRAM_URL + input + '&output=json', {
        headers: {
            "Origin": "http://localhost:3000"
        }
    })
    if(response.status >= 400 && response.status <= 600) throw Error(await response.json());
    return response.json()
}

export function calculateRootAtZero(equation) {
    let trimedEquation = equation.split('=')[1].trim().split(' ')
    trimedEquation.splice(1, 2)
    let [first, second] = trimedEquation
    return second / first
}