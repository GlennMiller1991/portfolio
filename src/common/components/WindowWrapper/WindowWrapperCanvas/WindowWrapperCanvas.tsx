import React, {useEffect, useRef} from "react";
import {useSelector} from "react-redux";
import {stateType} from "../../../../redux/store";
import {Particle} from "../../../classes/Particle/Particle";
import {wwCanvas} from "../../../constants/ids";
import styles from "../WindowWrapper.module.scss";

export const WindowWrapperCanvas: React.FC = React.memo(() => {
    const width = useSelector<stateType, number>(state => state.appState.appWidth)
    const height = useSelector<stateType, number>(state => state.appState.appHeight)
    const isMobile = useSelector<stateType, boolean>(state => state.appState.isMobile)
    const drawFlag = useRef(false)


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
                dots.splice(0 ,1)
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
        // const isMobile = 2 + 2 === 4
        const canvas = document.getElementById(wwCanvas) as HTMLCanvasElement | null
        if (canvas) {
            const context = canvas.getContext('2d')
            if (context) {

                drawFlag.current = true
                !isMobile && canvas.addEventListener('mousemove', pcListener)
                isMobile && (reqId = mobListener())

                const draw = () => {
                    context.clearRect(0, 0, width, height)
                    dots.forEach((particle, i) => {
                        particle.move()
                        particle.draw(context)

                        if ((Math.abs(particle.velocity.x) < 0.015) || particle.radius < 1) {
                            dots.splice(i, 1)
                        }
                        if (dots.length > 50) {
                            dots[0].coef *= 0.5
                        }
                    })
                }

                const render = () => {
                    if (drawFlag.current || dots.length) {
                        draw()
                    }
                    console.log(dots.length)
                    reqId = requestAnimationFrame(render)
                }

                render()
            }
        }

        return () => {
            if (canvas) {
                if (isMobile) {
                    clearInterval(reqId)
                } else {
                    cancelAnimationFrame(reqId)
                    canvas.removeEventListener('mousemove', pcListener)
                }
            }
        }
    }, [])

    return (
        <>
            <canvas id={wwCanvas} width={width} height={height}
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