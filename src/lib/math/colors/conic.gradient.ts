import {Color} from "./color";

export class ConicGradient {
    colors: { angle: number, color: Color }[]

    constructor(...colors: { angle: number, color: Color }[]) {
        this.colors = [...colors].sort((a, b) => a.angle - b.angle)
    }

    /**
     * Получить цвет по углу от оси X по часовой стрелке
     * @param angle единица измерения угла должна быть той же самой, что и углы всех передаваемых в констурктор цветов
     */
    getColorAtAngle(angle: number) {
        let prev = undefined
        let next = undefined
        for (let color of this.colors) {
            if (color.angle === angle) return color.color
            if (color.angle < angle) prev = color
            if (color.angle > angle) {
                next = color
                break
            }
        }

        if (!prev || !next) return undefined

        const coef = (angle - prev.angle) / (next.angle - prev.angle)

        return new Color(
            Math.floor((next.color.red - prev.color.red) * coef + prev.color.red),
            Math.floor((next.color.green - prev.color.green) * coef + prev.color.green),
            Math.floor((next.color.blue - prev.color.blue) * coef + prev.color.blue),
        )
    }

    getAngleByColor(color: Color) {
        let prev: typeof this.colors[number]
        let next = this.colors[0]
        if (color.red === next.color.red && color.green === next.color.green && color.blue === next.color.blue) return next.angle
        for (let i = 1; i < this.colors.length; i++) {
            next = this.colors[i]
            prev = this.colors[i - 1]
            if (color.red === next.color.red && color.green === next.color.green && color.blue === next.color.blue) return next.angle

            if (
                Math.max(prev.color.red, color.red, next.color.red) !== color.red &&
                Math.min(prev.color.red, color.red, next.color.red) !== color.red &&
                Math.max(prev.color.green, color.green, next.color.green) !== color.green &&
                Math.min(prev.color.green, color.green, next.color.green) !== color.green &&
                Math.max(prev.color.blue, color.blue, next.color.blue) !== color.blue &&
                Math.min(prev.color.blue, color.blue, next.color.blue) !== color.blue
            ) {
                const coef = (color.red - prev.color.red) / (next.color.red - prev.color.red)
                return (next.angle - prev.angle) * coef + prev.angle
            }
        }
        return undefined
    }

}