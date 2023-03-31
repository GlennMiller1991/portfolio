type tPos = {
    x: number,
    y: number
}
type tParticleProps = {
    x: number,
    y: number,
    radius: number,
    dots: Particle[]
}

export class Particle {
    pos: tPos
    radius: number
    velocity: tPos
    coef: number

    constructor(props: tParticleProps) {
        this.pos = {x: props.x, y: props.y}
        this.radius = props.radius
        this.velocity = {
            x: (Math.random() * 4) - 2,
            y: (Math.random() * 4) - 2,
        }
        this.coef = 1
    }


    move() {
        this.velocity.x *= 0.99 * this.coef
        this.velocity.y *= 0.99 * this.coef
        this.radius *= 0.99 * this.coef
        this.pos.x += this.velocity.x
        this.pos.y += this.velocity.y
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = '#454545'
        ctx.beginPath()
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI)
        ctx.closePath()
        ctx.fill()
    }
}