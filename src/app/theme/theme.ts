import {action, makeObservable} from "mobx";
import {Color, ConicGradient} from "@fbltd/math";

export class Theme extends ConicGradient {
    color: Color

    constructor() {
        super(
            {angle: 0, color: new Color(240, 127, 129)},
            {angle: 0.33, color: new Color(129, 255, 127)},
            {angle: 0.66, color: new Color(127, 129, 255)},
        );

        this.color = this.colors[0].color

        makeObservable(this, {
            color: true,
            switchColor: action,
        })
    }

    switchColor(color: typeof this.color) {
        this.color = color
    }

    get colorAngle() {
        return super.getAngleByColor(this.color)
    }
}