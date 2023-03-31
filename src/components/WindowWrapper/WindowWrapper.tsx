import React, {useCallback, useEffect, useRef} from 'react'
import styles from './WindowWrapper.module.scss'
import {setClasses} from '../../common/utils/setClasses'
import {IoCloseOutline} from 'react-icons/all'
import {useDispatch} from 'react-redux'
import {appUpdateState} from '../../redux/appReducer/appReducer'
import {Particle} from '../../common/classes/Particle/Particle'


type tWindowWrapper = {
    containerClass?: string,
    children?: React.ReactNode
}
export const WindowWrapper: React.FC<tWindowWrapper> = React.memo(({
                                                                       containerClass,
                                                                       children
                                                                   }) => {
    const drawFlag = useRef(false)
    const dispatch = useDispatch()
    const onClose = useCallback(() => {
        dispatch(appUpdateState({
            windowWrapper: undefined
        }))
    }, [])


    useEffect(() => {
        const dots: Particle[] = []
        const listener = (event: MouseEvent) => {
            dots.push(new Particle({
                x: event.clientX,
                y: event.clientY,
                radius: Math.random() * 30,
                dots,
            }))
        }

        const canvas = !window.ontouchstart && document.getElementById('wwCanvas') as HTMLCanvasElement | null
        let reqId: any
        if (canvas) {
            const context = canvas.getContext('2d')
            if (context) {
                drawFlag.current = true
                const width = window.innerWidth
                const height = window.innerHeight

                canvas.addEventListener('mousemove', listener)

                const draw = () => {
                    context.clearRect(0, 0, width, height)
                    dots.forEach((particle, i) => {
                        particle.move()
                        particle.draw(context)

                        if ((particle.velocity.x < 0.015 && particle.velocity.x > -0.015) || particle.radius < 1) {
                            dots.splice(i, 1)
                        }
                        if (dots.length > 50) {
                            dots[0].coef *= .5
                        }
                    })
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
            cancelAnimationFrame(reqId)
            canvas && canvas.removeEventListener('mousemove', listener)
        }
    }, [])

    return (
        <div className={setClasses(styles.modalContainer, 'flexCenter')}>
            <canvas id={'wwCanvas'} width={window.innerWidth} height={window.innerHeight}
                    onMouseEnter={() => {
                        drawFlag.current = true
                    }}
                    onMouseLeave={() => {
                        drawFlag.current = false
                    }}
                    className={styles.canvas}/>
            <div className={setClasses(styles.modalContent, containerClass)}>
                <button className={setClasses(styles.closeBtn, 'flexCenter')} onClick={onClose}>
                    <IoCloseOutline/>
                </button>
                {
                    children
                }
            </div>
            <svg className={styles.svg}>
                <defs>
                    <filter id="liquid">
                        <feTurbulence type="fractalNoise" baseFrequency=".03"/>
                        <feDisplacementMap in="SourceGraphic" scale="150"/>
                    </filter>
                </defs>
            </svg>
        </div>
    )
})

