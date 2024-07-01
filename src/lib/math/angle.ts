export enum AngleUnits {
    deg = 0,
    rad = 1,
    turn = 2,
}


export class Angle {
    static toRad(angle: number, unit: AngleUnits = AngleUnits.deg) {
        switch (unit) {
            case AngleUnits.rad:
                return angle
            case AngleUnits.deg:
                return angle * Math.PI / 180
            case AngleUnits.turn:
                return Math.PI * 2 * angle
        }
    }

    static toTurn(angle: number, unit: AngleUnits = AngleUnits.deg) {
        switch (unit) {
            case AngleUnits.turn:
                return angle
            case AngleUnits.deg:
                return angle / 360
            case AngleUnits.rad:
                return angle / (Math.PI * 2)
        }
    }

    static toDeg(angle: number, unit: AngleUnits = AngleUnits.rad) {
        switch(unit) {
            case AngleUnits.deg:
                return angle
            case AngleUnits.turn:
                return angle * 360
            case AngleUnits.rad:
                return undefined
        }
    }
}