import {IPoint2} from "./point";
import {IMatrix2d, Matrix2d} from "../matrix";

export class Circle {
    constructor(public center: IPoint2, public r: number) {

    }

    transform(matrix: IMatrix2d) {
        this.center = Matrix2d.apply(matrix, this.center)
    }
}