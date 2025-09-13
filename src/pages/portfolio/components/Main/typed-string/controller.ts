import {TypedString} from "@src/lib/typed-string/typed-string";
import {TypedStringEventEmitter} from "@src/lib/typed-string/contracts";

// Глобальная, потому что шарить состояние между экземплярами
// А пихать в стейт лениво.
// TODO учитывать отрендеренные предложения, процент рендера внутри последнего предолжения
//  и количество отрендерреных символов внутри последнего предложения для того же языка
let isEndWas = false;

export class TypedStringControllerPortfolio extends TypedString {
    timeoutId: any;

    constructor(public string: string, ee: TypedStringEventEmitter) {
        super({forwardOnly: true, cmdEventEmitter: ee});
        this.replaceString(this.string);
        this.endProcessing();
    }

    endProcessing() {
        if (isEndWas) {
            while (!this.isEnd) this.increment();
        }
    }

    nextTick() {
        isEndWas = this.isEnd;
        this.timeoutId = setTimeout(() => {
            super.nextTick()
            this.nextTick()
        }, this.carriage === this.typedString.length ? 2000 : Math.min(30, Math.random() * 100))
    }

    onRun(){
        this.nextTick();
    }

    onStop() {
        clearTimeout(this.timeoutId);
    }

    dispose() {
        this.onStop();
    }
}