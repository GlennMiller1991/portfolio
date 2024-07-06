import {AnimationQueue} from "../../../../lib/animation-queue";
import {IPoint2, Point2} from "../../../../lib/math/figures";
import {AppController} from "../../../../app/infra/app.controller";

export class Particle {
    velocity: IPoint2
    coef: number = 0.99
    angle = 2 * Math.PI
    velocityMax = 10

    constructor(private center: IPoint2, public radius: number) {
        this.velocity = [
            (Math.random() * this.velocityMax) - this.velocityMax / 2,
            (Math.random() * this.velocityMax) - this.velocityMax / 2,
        ]
    }


    move() {
        this.radius *= this.coef
        this.center = Point2.sum(this.center, Point2.scale(this.velocity, this.coef))

        this.coef *= 0.999999
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath()
        ctx.arc(...this.center, this.radius, 0, this.angle)
        ctx.fill()
    }

}

export class ParticlesController {
    animationQueue = new AnimationQueue()
    canvas!: HTMLCanvasElement
    ctx!: CanvasRenderingContext2D
    particles: Particle[] = []
    timeoutId?: number

    constructor(private appController: AppController) {

    }

    init(canvas: typeof this.canvas) {
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')!
        const rect = this.canvas.getBoundingClientRect()
        this.canvas.width = rect.width
        this.canvas.height = rect.height

        if (this.appController.isMobile) {
            this.timeoutId = this.mobileListener() as unknown as number
        } else {
            this.canvas.addEventListener('mousemove', this.onMouseMove)
        }
    }


    createParticle = (x: number, y: number) => {
        this.particles.push(new Particle([x, y], Math.random() * 30))
        if (this.particles.length > 300) {
            this.particles.splice(0, 1)
        }

        this.animationQueue.push(this.draw, true)
    }

    onMouseMove = (event: MouseEvent) => {
        this.createParticle(event.clientX, event.clientY)
    }

    draw = () => {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
        let particle: Particle
        let dead: Particle[] = []

        this.ctx.fillStyle = '#454545'
        for (let i = 0; i < this.particles.length; i++) {
            particle = this.particles[i]

            if (particle.coef < 0.000001 || particle.radius < 1) {
                dead.push(particle)
                continue
            }

            particle.move()
            particle.draw(this.ctx)

        }

        this.particles = this.particles.filter(p => !dead.includes(p))

        if (this.particles.length) this.animationQueue.push(this.draw)
    }

    mobileListener = () => {
        return setInterval(() => {
            this.createParticle(Math.random() * this.canvas.width, Math.random() * this.canvas.height)
        }, 300)
    }

    dispose() {
        this.animationQueue.dispose()
        this.canvas.removeEventListener('mousemove', this.onMouseMove)
        clearInterval(this.timeoutId)
    }
}