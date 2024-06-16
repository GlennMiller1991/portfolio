import React, {useContext, useEffect, useRef, useState} from "react";
import {Particle} from "../../../classes/Particle/Particle";
import styles from "../WindowWrapper.module.scss"
import {AppContext, AppController} from "../../../../App";

export class WWCanvasController {
    canvas!: HTMLCanvasElement
    particles: any[] = []
    timeoutId?: number

    constructor(private appController: AppController) {

    }

    init(canvas: typeof this.canvas) {
        const rect = this.canvas.getBoundingClientRect()
        this.canvas.width = rect.width
        this.canvas.height = rect.height

        if (this.appController.isMobile) {
            this.timeoutId = this.mobileListener() as unknown as number
        } else {
            this.canvas.addEventListener('mousemove', this.onMouseMove)
        }
    }

    onMouseMove = (event: MouseEvent) => {
        this.particles.push(new Particle({
            x: event.clientX,
            y: event.clientY,
            radius: Math.random() * 30,
            dots: this.particles,
        }))
        if (this.particles.length > 300) {
            this.particles.splice(0, 1)
        }
    }

    mobileListener = () => {
        return setInterval(() => {
            this.particles.push(new Particle({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                radius: Math.random() * 30,
                dots: this.particles,
            }))
        }, 300)
    }

    dispose() {
        this.canvas.removeEventListener('mousemove', this.onMouseMove)
        clearInterval(this.timeoutId)
    }
}

export const WindowWrapperCanvas: React.FC = React.memo(() => {
    const viewController = useContext(AppContext)
    const [controller] = useState(() => new WWCanvasController(viewController))

    const drawFlag = useRef(false)
    const canvasRef = useRef<HTMLCanvasElement>(null)


    // visual effects
    useEffect(() => {
        const width = window.innerWidth
        const height = window.innerHeight
        const dots: Particle[] = []
        let reqId: any

        if (canvasRef.current) {
            controller.init(canvasRef.current)

            drawFlag.current = true

            const draw = () => {
                console.log('draw')
                context.clearRect(0, 0, width, height)
                for (let i = 0; i < dots.length; i++) {
                    const particle = dots[i]
                    particle.move()
                    particle.draw(context)

                    if ((Math.abs(particle.velocity.x) < 0.015) || particle.radius < 1) {
                        dots.splice(i, 1)
                    }
                    if (dots.length > 50) {
                        dots[0].coef *= 0.5
                    }
                }
            }

            const render = () => {
                if (drawFlag.current || dots.length) {
                    draw()
                }
                reqId = requestAnimationFrame(render)
            }

            render()

        }

        return () => {
            if (canvasRef.current) {
                if (viewController.isMobile) {
                    clearInterval(reqId)
                } else {
                    cancelAnimationFrame(reqId)
                    canvasRef.current.removeEventListener('mousemove', controller.mobileListener)
                }
            }
        }
    }, [])

    return (
        <>
            <canvas ref={canvasRef}
                    onMouseEnter={() => {
                        drawFlag.current = true
                    }}
                    onMouseLeave={() => {
                        drawFlag.current = false
                    }}
                    className={styles.canvas}/>
            <svg className={styles.svg}>
                <defs>
                    <filter id="liquid">
                        <feTurbulence type="fractalNoise" baseFrequency=".03"/>
                        <feDisplacementMap in="SourceGraphic" scale="150"/>
                    </filter>
                </defs>
            </svg>
        </>
    )
})