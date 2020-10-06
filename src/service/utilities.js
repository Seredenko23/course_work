export function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

export function getAmountAfterDot(n) {
    return n > 0 && n < 1 ? n.toString().length - 2 : 0
}