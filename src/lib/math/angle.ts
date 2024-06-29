export enum AngleUnits {
    deg = 0,
    rad = 1,
}

export class Angle {
    static toRad(angle: number, unit: AngleUnits = AngleUnits.deg) {
        switch (unit) {
            case AngleUnits.rad:
                return angle
            case AngleUnits.deg:
                return angle * Math.PI / 180
        }
    }
}