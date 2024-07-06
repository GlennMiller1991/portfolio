import {Angle, AngleUnits} from "../angle";

describe('math.angle', () => {
    test('angle.toDeg from Turn', () => {
        expect(Angle.toDeg(1, AngleUnits.Turn)).toBe(360)
        expect(Angle.toDeg(0, AngleUnits.Turn)).toBe(0)
        expect(Angle.toDeg(0.5, AngleUnits.Turn)).toBe(180)
        expect(Angle.toDeg(-0.5, AngleUnits.Turn)).toBe(-180)
    })

    test('angle.toDeg from Rad', () => {
        expect(Angle.toDeg(Math.PI * 2, AngleUnits.Rad)).toBe(360)
        expect(Angle.toDeg(0, AngleUnits.Rad)).toBe(0)
        expect(Angle.toDeg(Math.PI, AngleUnits.Rad)).toBe(180)
        expect(Angle.toDeg(-Math.PI, AngleUnits.Rad)).toBe(-180)
    })

    test('angle.toDeg from Deg', () => {
      expect(Angle.toDeg(180, AngleUnits.Deg)).toBe(180)
    })

})