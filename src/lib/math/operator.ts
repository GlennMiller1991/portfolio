import {IMatrix2d} from "./matrix";
import {Angle, AngleUnits} from "./angle";

export class Operator {
    private static temp1: number
    private static temp2: number

    /**
     * @param angle поворот в градусах
     */
    static rotateIdentity(angle: number, unit: AngleUnits = AngleUnits.Deg): IMatrix2d {
        angle = Angle.toRad(angle, unit)
        this.temp1 = Math.cos(angle)
        this.temp2 = Math.sin(angle)
        return [
            this.temp1,
            this.temp2,
            -this.temp2,
            this.temp1,
            0, 0
        ]
    }
}