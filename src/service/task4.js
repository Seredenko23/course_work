export function calculateEquation(x) {
    return x/(1 + Math.sqrt(1 + Math.cos(x)))
}

export function calculateDifferential(x) {
    return  (x * Math.sin(x))/(2 * (Math.pow(Math.sqrt(Math.cos(x) + 1) + 1), 2) * (1/(Math.sqrt(Math.cos(x) + 1)) + 1))
}