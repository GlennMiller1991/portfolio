import {app} from "../../../../../app/constants";
import React from "react";
import {Angle, AngleUnits, IPoint2} from "@fbltd/math";

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
        const color = app.theme.getColorAtAngle(angle)
        color && app.setTheme(color)
    }

}