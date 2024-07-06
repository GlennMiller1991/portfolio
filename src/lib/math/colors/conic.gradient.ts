import {Color} from "./color";
import {IPoint2} from "../figures";

export class ConicGradient {
    colors: { angle: number, color: Color }[]

    constructor(...colors: { angle: number, color: Color }[]) {
        this.colors = [...colors].sort((a, b) => a.angle - b.angle)
        this.colors.push({
            angle: 1,
            color: this.colors[0].color
        })
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

            let redDif = next.color.red - prev.color.red
            let greenDif = next.color.green - prev.color.green
            let blueDif = next.color.blue - prev.color.blue
            let redDifColor = color.red - prev.color.red
            let greenDifColor = color.green - prev.color.green
            let blueDifColor = color.blue - prev.color.blue

            if (
                ((redDifColor >= 0 && redDifColor <= redDif) || (redDifColor <= 0 && redDifColor >= redDif)) &&
                ((greenDifColor >= 0 && greenDifColor <= greenDif) || (greenDifColor <= 0 && greenDifColor >= greenDif)) &&
                ((blueDifColor >= 0 && blueDifColor <= blueDif) || (blueDifColor <= 0 && blueDifColor >= blueDif))
            ) {

                const redCoef = ((color.red - prev.color.red) / (next.color.red - prev.color.red))
                const greenCoef = ((color.green - prev.color.green) / (next.color.green - prev.color.green))
                const blueCoef = ((color.blue - prev.color.blue) / (next.color.blue - prev.color.blue))
                const coefs = [redCoef, greenCoef, blueCoef].filter(Boolean)
                return (next.angle - prev.angle) * Math.min(...coefs) + prev.angle
            }
        }
        return undefined
    }

    isColorInRange(color: Color): boolean {
        return Boolean(this.getAngleByColor(color))
    }

    /**
     * Для использования метода, углы  должны быть в Turn единицах измерения
     */
    toCanvas(ctx: CanvasRenderingContext2D, center: IPoint2) {
        const gradient = ctx.createConicGradient(0, ...center)
        for (let color of this.colors) {
            gradient.addColorStop(color.angle, color.color.toCSS())
        }

        return gradient
    }

    /**
     * Для использования метода, углы  должны быть в Turn единицах измерения
     */
    toCSS() {
        let s = ''

        for (let color of this.colors) {
            if (s) s += ','
            s += `rgb(${color.color.red},${color.color.green},${color.color.blue})`
        }

        s = `conic-gradient(in srgb from 0.25turn at 50% 50%, ${s})`
        return s
    }

}