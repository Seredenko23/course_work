import {calculateEquation} from "./task1";

export function dichotomyTable(interval, n) {
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