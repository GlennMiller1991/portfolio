/**
 * Точка/вектор
 */
export type IPoint2 = [number, number]

/**
 * Точка/вектор
 */
export class Point2 {
    static sum(p1: IPoint2, p2: IPoint2): IPoint2 {
        return [
            p1[0] + p2[0],
            p1[1] + p2[1],
        ]
    }

    static scale(v: IPoint2, factor: number): IPoint2 {
        return [
            v[0] * factor,
            v[1] * factor,
        ]
    }
}