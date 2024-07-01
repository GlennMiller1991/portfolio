import {app} from "../../../../../app/constants";
import React, {MouseEventHandler} from "react";
import {IPoint2} from "../../../../../lib/math/figures";
import {Angle, AngleUnits} from "../../../../../lib/math/angle/angle";

export class ThemeChoiceController {
    private canvas!: HTMLCanvasElement
    private ctx!: CanvasRenderingContext2D

    get angle() {
        return app.theme.colorAngle || 0
    }

    init = (canvas: HTMLCanvasElement | null) => {
        if (!canvas) return
        if (this.canvas) return

        const ctx = canvas.getContext('2d', {
            willReadFrequently: true,
            alpha: false,
        })
        if (!ctx) return
        this.canvas = canvas
        this.ctx = ctx

        requestAnimationFrame(this.draw)
        this.draw()
    }

    onPick: MouseEventHandler<HTMLCanvasElement> = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!this.ctx) return
        const canvas = this.canvas
        const rect = canvas.getBoundingClientRect()
        const center: IPoint2 = [rect.left + 35, rect.top + 35]
        let angle = Angle.toTurn(Math.atan2(-center[1] + e.clientY, -center[0] + e.clientX), AngleUnits.Rad)
        angle = Angle.toPositive(angle, AngleUnits.Turn)
        angle = Angle.normalize(angle, AngleUnits.Turn)
        const color = app.theme.getColorAtAngle(angle)
        color && app.theme.switchColor(color)
    }

    draw = () => {
        if (!this.ctx) return
        const gradient = this.ctx.createConicGradient(0, 35, 35)

        for (let color of app.theme.colors) {
            gradient.addColorStop(color.angle, color.color.toCSS())
        }
        gradient.addColorStop(1, app.theme.colors[0].color.toCSS())


        this.ctx.fillStyle = gradient
        this.ctx.fillRect(0, 0, 70, 70)
    }

}