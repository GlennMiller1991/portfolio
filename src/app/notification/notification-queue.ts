import {action, makeObservable} from "mobx";
import {Notification} from "./notification";

export class NotificationQueue {
    queue: Notification[] = []
    currentNotification: Notification | null = null
    isDisappearingPhase: boolean = false

    constructor() {
        this.init()
    }

    init() {
        makeObservable(this, {
            queue: true,
            isDisappearingPhase: true,

            stageAction: action,
            queueAction: action,
        })
    }

    add(notification: Notification) {
        this.queue.push(notification)
        this.queueAction([...this.queue])
    }

    stageAction = (stage: typeof this.isDisappearingPhase) => {
        this.isDisappearingPhase = stage
    }

    queueAction = (queue: typeof this.queue) => {
        this.queue = queue
    }

    remove = (id: any) => {
        this.queueAction(this.queue.filter((n) => n.id !== id))
        this.currentNotification = null
        this.stageAction(false)
    }

    onAnimationEnd = () => {
        if (!this.currentNotification) return
        this.remove(this.currentNotification.id)
    }

    didComponentMount = (notification: Notification) => {
        this.currentNotification = notification
        setTimeout(() => {
            this.unMountComponent(notification)
        }, 3000)
    }

    unMountComponent = (notification: Notification) => {
        if (notification !== this.currentNotification) return
        this.stageAction(true)
    }
}