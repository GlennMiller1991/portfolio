import {Circle, StraightLine} from "@fbltd/math";
import {Language} from "../../../../../app/infra/language";

export class LanguageChoiceController {
    circle = new Circle([0, 0], 45)
    line = new StraightLine(this.circle.center, [this.circle.r, this.circle.center[0]])

    constructor(public language: Language) {
    }

    switchVariant(variant: typeof this.language.langs[number]) {
        this.language.switch(variant)
    }

    get chosenIndex() {
        return this.language.langs.findIndex((lang) => lang === this.language.currentLang)
    }

    get angleStep() {
        return 35
    }

}