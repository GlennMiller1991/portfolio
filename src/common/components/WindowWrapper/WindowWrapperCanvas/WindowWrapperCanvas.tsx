import React, {useContext, useEffect, useRef} from "react";
import {Particle} from "../../../classes/Particle/Particle";
import styles from "../WindowWrapper.module.scss"
import {WindowViewContext} from "../../../../App";

export const WindowWrapperCanvas: React.FC = React.memo(() => {
    const viewController = useContext(WindowViewContext)
    const drawFlag = useRef(false)
    const canvasRef = useRef<HTMLCanvasElement>(null)


    // visual effects
    useEffect(() => {
        const width = window.innerWidth
        const height = window.innerHeight
        const dots: Particle[] = []
        let reqId: any

        const pcListener = (event: MouseEvent) => {
            dots.push(new Particle({
                x: event.clientX,
                y: event.clientY,
                radius: Math.random() * 30,
                dots,
            }))
            if (dots.length > 300) {
                dots.splice(0, 1)
            }
        }
        const mobListener = () => {
            return setInterval(() => {
                dots.push(new Particle({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    radius: Math.random() * 30,
                    dots,
                }))
            }, 300)
        }
        if (canvasRef.current) {
            const context = canvasRef.current.getContext('2d')
            if (context) {

                drawFlag.current = true
                !viewController.isMobile && canvasRef.current.addEventListener('mousemove', pcListener)
                viewController.isMobile && (reqId = mobListener())

                const draw = () => {
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
        }

        return () => {
            if (canvasRef.current) {
                if (viewController.isMobile) {
                    clearInterval(reqId)
                } else {
                    cancelAnimationFrame(reqId)
                    canvasRef.current.removeEventListener('mousemove', pcListener)
                }
            }
        }
    }, [])

    return (
        <>
            <canvas ref={canvasRef}
                    width={viewController.appDomRect.width} height={viewController.appDomRect.height}
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