import {Angle, AngleUnits} from "../angle";
import {approximately} from "../utils";

describe('math.angle.toDeg', () => {
    test('from Turn', () => {
        expect(Angle.toDeg(1, AngleUnits.Turn)).toBe(360)
        expect(Angle.toDeg(0, AngleUnits.Turn)).toBe(0)
        expect(Angle.toDeg(0.5, AngleUnits.Turn)).toBe(180)
        expect(Angle.toDeg(-0.5, AngleUnits.Turn)).toBe(-180)
    })

    test('from Rad', () => {
        expect(Angle.toDeg(Math.PI * 2, AngleUnits.Rad)).toBe(360)
        expect(Angle.toDeg(0, AngleUnits.Rad)).toBe(0)
        expect(Angle.toDeg(Math.PI, AngleUnits.Rad)).toBe(180)
        expect(Angle.toDeg(-Math.PI, AngleUnits.Rad)).toBe(-180)
    })

    test('from Deg', () => {
        expect(Angle.toDeg(180, AngleUnits.Deg)).toBe(180)
    })
})

describe('math.angle.toRad', () => {
    test('from Rad', () => {
        expect(Angle.toRad(1, AngleUnits.Rad)).toBe(1)
    })

    test('from Deg', () => {
        expect(Angle.toRad(360, AngleUnits.Deg)).toBe(Math.PI * 2)
        expect(Angle.toRad(0, AngleUnits.Deg)).toBe(0)
        expect(Angle.toRad(180, AngleUnits.Deg)).toBe(Math.PI)
        expect(Angle.toRad(-180, AngleUnits.Deg)).toBe(-Math.PI)
    })

    test('from Turn', () => {
        expect(Angle.toRad(1, AngleUnits.Turn)).toBe(Math.PI * 2)
        expect(Angle.toRad(0, AngleUnits.Turn)).toBe(0)
        expect(Angle.toRad(0.5, AngleUnits.Turn)).toBe(Math.PI)
        expect(Angle.toRad(-0.5, AngleUnits.Turn)).toBe(-Math.PI)
    })
})

describe('math.angle.toTurn', () => {
    test('from Turn', () => {
        expect(Angle.toTurn(0.1, AngleUnits.Turn)).toBe(0.1)
    })

    test('from Deg', () => {
        expect(Angle.toTurn(360, AngleUnits.Deg)).toBe(1)
        expect(Angle.toTurn(0, AngleUnits.Deg)).toBe(0)
        expect(Angle.toTurn(180, AngleUnits.Deg)).toBe(0.5)
        expect(Angle.toTurn(-180, AngleUnits.Deg)).toBe(-0.5)
    })

    test('from Rad', () => {
        expect(Angle.toTurn(Math.PI * 2, AngleUnits.Rad)).toBe(1)
        expect(Angle.toTurn(0, AngleUnits.Rad)).toBe(0)
        expect(Angle.toTurn(Math.PI, AngleUnits.Rad)).toBe(0.5)
        expect(Angle.toTurn(-Math.PI, AngleUnits.Rad)).toBe(-0.5)
    })
})

describe('math.angle.toPositive', () => {

    test('deg', () => {
        expect(Angle.toPositive(0, AngleUnits.Deg)).toBe(0)
        expect(Angle.toPositive(-0, AngleUnits.Deg)).toBe(0)
        expect(Angle.toPositive(-721, AngleUnits.Deg)).toBe(359)
        expect(Angle.toPositive(361, AngleUnits.Deg)).toBe(361)
    })

    test('rad', () => {
        expect(Angle.toPositive(0, AngleUnits.Rad)).toBe(0)
        expect(Angle.toPositive(-0, AngleUnits.Rad)).toBe(0)
        expect(Angle.toPositive(-Math.PI, AngleUnits.Rad)).toBe(Math.PI)
        expect(Angle.toPositive(-(Math.PI * 3), AngleUnits.Rad)).toBe(Math.PI)
    })

    test('turn', () => {
        expect(Angle.toPositive(0, AngleUnits.Turn)).toBe(0)
        expect(Angle.toPositive(-0, AngleUnits.Turn)).toBe(0)
        expect(approximately(Angle.toPositive(-1.1, AngleUnits.Turn), 0.9)).toBe(true)
        expect(Angle.toPositive(1.1, AngleUnits.Turn)).toBe(1.1)
    })
})

describe('math.angle.normalize', () => {
    test('deg', () => {
        expect(Angle.normalize(0, AngleUnits.Deg)).toBe(0)
        expect(Angle.normalize(-0, AngleUnits.Deg)).toBe(0)
        expect(Angle.normalize(-721, AngleUnits.Deg)).toBe(359)
        expect(Angle.normalize(721, AngleUnits.Deg)).toBe(1)
        expect(Angle.normalize(361, AngleUnits.Deg)).toBe(1)
        expect(Angle.normalize(360, AngleUnits.Deg)).toBe(0)
        expect(Angle.normalize(-360, AngleUnits.Deg)).toBe(0)
    })

    test('rad', () => {
        expect(Angle.normalize(0, AngleUnits.Rad)).toBe(0)
        expect(Angle.normalize(-0, AngleUnits.Rad)).toBe(0)
        expect(Angle.normalize(-(Math.PI * 3), AngleUnits.Rad)).toBe(Math.PI)
        expect(Angle.normalize(Math.PI * 3, AngleUnits.Rad)).toBe(Math.PI)
        expect(approximately(Angle.normalize(Math.PI * 2 + 0.01, AngleUnits.Rad), 0.01)).toBe(true)
        expect(Angle.normalize(Math.PI * 2, AngleUnits.Rad)).toBe(0)
        expect(Angle.normalize(-Math.PI * 2, AngleUnits.Rad)).toBe(0)
    })

    test('turn', () => {

    })
})

describe('math.angle.toCSS', () => {
    expect(Angle.toCSS(1, AngleUnits.Deg)).toEqual('rotate(1deg)')
    expect(Angle.toCSS(1, AngleUnits.Rad)).toEqual('rotate(1rad)')
    expect(Angle.toCSS(1, AngleUnits.Turn)).toEqual('rotate(1turn)')

    expect(Angle.toCSS(-1, AngleUnits.Deg)).toEqual('rotate(-1deg)')
    expect(Angle.toCSS(-1, AngleUnits.Rad)).toEqual('rotate(-1rad)')
    expect(Angle.toCSS(-1, AngleUnits.Turn)).toEqual('rotate(-1turn)')

    expect(Angle.toCSS(NaN, AngleUnits.Deg)).toEqual('')
    expect(Angle.toCSS(Infinity, AngleUnits.Rad)).toEqual('')
    expect(Angle.toCSS(-Infinity, AngleUnits.Turn)).toEqual('')

    //@ts-ignore
    expect(Angle.toCSS('1e -08', AngleUnits.Deg)).toEqual('')

    //@ts-ignore
    expect(Angle.toCSS(undefined, AngleUnits.Deg)).toEqual('')

    //@ts-ignore
    expect(Angle.toCSS(null, AngleUnits.Deg)).toEqual('')
})