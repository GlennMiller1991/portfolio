export class SwipeEvent extends Event {
    constructor() {
        super('swipe', {
            cancelable: true,
            bubbles: true,
            composed: true
        })
    }
}