export function approximately(theValue: number, is: number, withPrecision: number = 1e-8) {
    return Math.abs(theValue - is) <= withPrecision
}

export function toPositive(value: number, range: number) {
    if (value >= 0) return Math.abs(value)
    return Math.abs((range + value % range) % range)
}