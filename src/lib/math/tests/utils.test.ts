import {approximately} from "../utils";

test('approximately', () => {
    expect(approximately(0, 0)).toBe(true)
    expect(approximately(1 + 1e-8, 1)).toBe(true)
    expect(approximately(-1 - 1e-8, -1)).toBe(true)
    expect(approximately(1 + 1e-8 + 1e-9, 1)).toBe(false)
    expect(approximately(-1 - 1e-8 - 1e-9, -1)).toBe(false)
    expect(approximately(0, 0.1)).toBe(false)
    expect(approximately(0, 0.1, 0.1)).toBe(true)
})