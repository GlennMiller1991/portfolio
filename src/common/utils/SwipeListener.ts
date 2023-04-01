import {tPos} from "../types/types";
import {SwipeEvent} from "./SwipeEvent";

type tSwipeListenerProps = {
    element: HTMLElement,
    callback: () => void,
}

interface iSwipeListener {
    readonly element: HTMLElement,
    removeEventListener: () => void,

}
export class SwipeListener implements iSwipeListener {
    element: HTMLElement
    private positions: {
        start: tPos | undefined,
        end: tPos | undefined
    }
    private difference: number
    private callback: () => void
    constructor(props: tSwipeListenerProps) {
        this.element = props.element
        this.callback = props.callback
        this.positions = {
            start: undefined,
            end: undefined,
        }
        this.difference = 35


        this.addEventListener()
    }

    private addEventListener() {
        this.element.addEventListener('mousedown', this.startMouseListener)
        this.element.addEventListener('mouseup', this.endMouseListener)
        this.element.addEventListener('swipe', this.callback)
    }

    removeEventListener() {
        this.element.removeEventListener('mousedown', this.startMouseListener)
        this.element.removeEventListener('touchstart', this.startTouchListener)
        this.element.removeEventListener('mouseup', this.endMouseListener)
        this.element.removeEventListener('touchend', this.endTouchListener)
        this.element.removeEventListener('swipe', this.callback)
    }

    startTouchListener = (event: TouchEvent) => {
        const touches = event.touches
        if (touches.length === 1) {
            this.startMouseListener(touches[0])
        } else {
            this.positions.start = undefined
        }
    }
    startMouseListener = (event: MouseEvent | Touch) => {
        this.positions.start = {
            x: event.clientX,
            y: event.clientY,
        }
    }

    endTouchListener = (event: TouchEvent) => {
        const touches = event.touches
        if (touches.length === 1) {
            this.endMouseListener(touches[0])
        }
    }
    endMouseListener = (event: MouseEvent | Touch) => {
        this.positions.end = {
            x: event.clientX,
            y: event.clientY,
        }
        const start = this.positions.start
        const end = this.positions.end
        if (start) {
            const xDif = Math.abs(start.x - end.x) > this.difference
            const yDif = Math.abs(start.y - end.y) > this.difference
            if (xDif || yDif) {
                this.element.dispatchEvent(new SwipeEvent())
            }
        }
        this.positions = {
            start: undefined,
            end: undefined,
        }
    }

}