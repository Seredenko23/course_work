import {query, WOLFRAM_URL} from "../config/config";
import {getAmountAfterDot} from "./utilities";

export function calculateEquation(x) {
    return Math.log(x) - Math.atan(x)
}

export function generateGraph(interval, n, equation) {
    let {min, max} = interval
    if(min > max) throw new Error('Min не може бути більше max')
    let result = []
    let afterDot = getAmountAfterDot(n)
    for(let i = min; i <= max; i += n) {
        let j = +i.toFixed(afterDot)
        result.push({'Y': equation(j), 'X': j})
    }
    return result
}

export function findSolutionByDichotomy(interval, n) {
    let {min, max} = interval
    if(min > max) throw new Error('Min не може бути більше max')
    let result = []
    let center
    for(let i = 0; i < n; i++) {
        let obj = {'Нижня точка': min, 'Верхня точка': max}
        center = (min + max) / 2
        obj['Центр'] = center
        if(calculateEquation(center) * calculateEquation(max) >= 0) {
            max = center
            obj['Напрямок'] = 'Лівіше'
        } else {
            min = center
            obj['Напрямок'] = 'Правіше'
        }
        result.push(obj)
    }
    return result
}

export async function findSolutionByNewton(interval, e) {
    let result = []
    if(interval.min > interval.max) throw new Error('Min не може бути більше max')
    let x1 = interval.max
    let x2 = undefined
    while(!(Math.abs(Math.abs(x2) - Math.abs(x1)) < e)) {
        let res = await getInfo(query + x1)
        let equation = res.queryresult.pods[0].subpods[0].plaintext
        x2 = x1
        x1 = +calculateRootAtZero(equation).toFixed(getAmountAfterDot(e))
        let obj = {'Рівняння дотичної': equation, 'Точка перетину Оси X': x1}
        result.push(obj)
    }
    return result
}

export function findSolutionByIteration(dots) {
    let closest = dots[0]
    dots.forEach((dot) => {
        if(Math.abs(closest.Y) > Math.abs(dot.Y)) {
            closest = dot
        }
    })
    return closest.X
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