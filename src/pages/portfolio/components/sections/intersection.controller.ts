import {makeAutoObservable} from 'mobx';

export class IntersectionController {
    private node: HTMLDivElement;
    public _isIntersecting: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    set isIntersecting(value: boolean) {
        this._isIntersecting = value;
    }

    get isIntersecting() {
        return this._isIntersecting;
    }

    get context() {
        return {
            isVisible: this.isIntersecting,
        }
    }

    didComponentMount = (node: HTMLDivElement) => {
        if (this.node) return;
        this.node = node;

        const onIntersect: IntersectionObserverCallback = (entries) => {
            for (let entry of entries) {
                if (entry.target !== this.node) continue;
                this.isIntersecting = !!entry.isIntersecting;
            }
        }
        const io = new IntersectionObserver(onIntersect, {
            root: null,
            threshold: [0, 0.01],
        });
        io.observe(node);


    }
}