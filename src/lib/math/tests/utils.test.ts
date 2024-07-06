import {approximately, toPositive} from "../utils";

test('approximately', () => {
    expect(approximately(0, 0)).toBe(true)
    expect(approximately(1 + 1e-8, 1)).toBe(true)
    expect(approximately(-1 - 1e-8, -1)).toBe(true)
    expect(approximately(1 + 1e-8 + 1e-9, 1)).toBe(false)
    expect(approximately(-1 - 1e-8 - 1e-9, -1)).toBe(false)
    expect(approximately(0, 0.1)).toBe(false)
    expect(approximately(0, 0.1, 0.1)).toBe(true)
})

test('toPositive', () => {
    expect(toPositive(-1, 360)).toEqual(359)
    expect(toPositive(1, 360)).toEqual(1)
    expect(toPositive(0, 1)).toEqual(0)
    expect(toPositive(-720, 360)).toEqual(0)
    expect(toPositive(-721, 360)).toEqual(359)
    expect(toPositive(-0, 0)).toEqual(0)
})