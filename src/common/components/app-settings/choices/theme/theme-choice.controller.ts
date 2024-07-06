import {app} from "../../../../../app/constants";
import React from "react";
import {IPoint2} from "../../../../../lib/math/figures";
import {Angle, AngleUnits} from "../../../../../lib/math/angle/angle";

export class ThemeChoiceController {
    get angle() {
        return app.theme.colorAngle || 0
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
        console.log('angle', angle)
        const color = app.theme.getColorAtAngle(angle)
        console.log('angleafter', color && app.theme.getAngleByColor(color))
        color && app.theme.switchColor(color)
    }

}