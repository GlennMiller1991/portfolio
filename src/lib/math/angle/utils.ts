export function toPositive(value: number, range: number) {
    return Math.abs(Math.trunc(value / range)) * range + (range + value % range)
}