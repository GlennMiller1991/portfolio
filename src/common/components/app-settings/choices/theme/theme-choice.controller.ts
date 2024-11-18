import React from "react";
import {Angle, AngleUnits, IPoint2} from "@fbltd/math";
import {Theme} from "../../../../../app/theme/theme";

export class ThemeChoiceController {

    constructor(public theme: Theme) {

    }

    get angle() {
        return this.theme.colorAngle || 0
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
        const color = this.theme.getColorAtAngle(angle)
        color && this.theme.switchColor(color)
    }

}