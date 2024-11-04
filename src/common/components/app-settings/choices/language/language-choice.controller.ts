import {app} from "../../../../../app/constants";
import {Circle, StraightLine} from "@fbltd/math";

export class LanguageChoiceController {
    circle = new Circle([0, 0], 45)
    line = new StraightLine(this.circle.center, [this.circle.r, this.circle.center[0]])

    switchVariant(variant: typeof app.lang.langs[number]) {
        app.setLanguage(variant)
    }

    get chosenIndex() {
        return app.lang.langs.findIndex((lang) => lang === app.lang.currentLang)
    }

    get angleStep() {
        return 35
    }

}