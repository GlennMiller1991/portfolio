import {IPoint2} from "./figures";

export type IMatrix2d = [
    number, number, number,
    number, number, number,
]

export const identityMatrix: IMatrix2d = [1, 0, 0, 1, 0, 0]

export class Matrix2d {
    static multiply(matrix: IMatrix2d, ...matrices: IMatrix2d[]) {
        for (let m of matrices) {
            matrix = [
                matrix[0] * m[0] + matrix[2] * m[1],
                matrix[1] * m[0] + matrix[3] * m[1],
                matrix[0] * m[2] + matrix[2] * m[3],
                matrix[1] * m[2] + matrix[3] * m[3],
                matrix[0] * m[4] + matrix[2] * m[5] + matrix[4],
                matrix[1] * m[4] + matrix[3] * m[5] + matrix[5],
            ]
        }

        return matrix
    }

    static apply(matrix: IMatrix2d, point: IPoint2): IPoint2 {
        return [
            matrix[0] * point[0] + matrix[2] * point[1] + matrix[4],
            matrix[1] * point[0] + matrix[3] * point[1] + matrix[5],
        ]
    }
}