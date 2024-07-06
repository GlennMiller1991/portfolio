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

    onPick = (e: React.MouseEvent<HTMLDivElement>) => {
        const canvas = e.currentTarget
        const rect = canvas.getBoundingClientRect()
        const center: IPoint2 = [rect.left + rect.width / 2, rect.top + rect.height / 2]
        const x = e.clientX - center[0]
        const y = e.clientY - center[1]
        let angle = Angle.toTurn(Math.atan2(y, x), AngleUnits.Rad)
        angle = Angle.toPositive(angle, AngleUnits.Turn)
        angle = Angle.normalize(angle, AngleUnits.Turn)
        const color = app.theme.getColorAtAngle(angle)
        color && app.theme.switchColor(color)
    }

    draw = () => {
        if (!this.ctx) return
        this.ctx.fillStyle = app.theme.toCanvas(this.ctx, [35, 35])
        this.ctx.fillRect(0, 0, 70, 70)
        console.log(app.theme.toCSS())
    }

}