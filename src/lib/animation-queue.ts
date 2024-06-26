/**
 * Multiple raf is worse than one raf.
 * Here we manage functions for one next raf
 */
export class AnimationQueue {
    private queue: Function[] = []
    private id: number | undefined
    private isBlocked = false

    block() {
        this.isBlocked = true
    }

    unblock() {
        this.isBlocked = false
    }

    push(f: Function, previousClear?: boolean) {
        if (this.isBlocked) return

        if (previousClear) {
            this.queue = []
            this.dispose()
        }

        if (!this.queue.length) {
            this.raf()
        }

        this.queue.push(f)
    }

    raf() {
        this.id = requestAnimationFrame(() => {
            this.id = undefined
            const queue = this.queue
            this.queue = []

            queue.forEach(f => f())
        })
    }

    dispose() {
        this.id && cancelAnimationFrame(this.id)
    }
}