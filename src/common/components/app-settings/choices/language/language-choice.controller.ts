import {Circle} from "../../../../../lib/math/figures/circle";
import {StraightLine} from "../../../../../lib/math/figures/straight-line";
import {app} from "../../../../../app/constants";

export class LanguageChoiceController {
    circle = new Circle([0, 0], 45)
    line = new StraightLine(this.circle.center, [this.circle.r, this.circle.center[0]])

    switchVariant(variant: typeof app.lang.langs[number]) {
        app.lang.switch(variant)
    }

    get chosenIndex() {
        return app.lang.langs.findIndex((lang) => lang === app.lang.currentLang)
    }

    get angleStep() {
        return 35
    }

}