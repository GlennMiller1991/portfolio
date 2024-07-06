import {ConicGradient} from "../../lib/math/colors/conic.gradient";
import {Color} from "../../lib/math/colors/color";
import {action, makeObservable} from "mobx";

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