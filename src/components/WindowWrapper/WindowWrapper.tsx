import React, {useCallback, useEffect, MouseEvent, useState, useRef} from 'react'
import styles from './WindowWrapper.module.scss'
import {setClasses} from '../../common/utils/setClasses'
import {IoCloseOutline} from 'react-icons/all'
import {useDispatch} from 'react-redux'
import {appUpdateState} from '../../redux/appReducer/appReducer'


type tWindowWrapper = {
    containerClass?: string,
    children?: React.ReactNode
}
export const WindowWrapper: React.FC<tWindowWrapper> = React.memo(({
                                                                       containerClass,
                                                                       children
                                                                   }) => {
    const flag = useRef(false)
    const dispatch = useDispatch()
    const onClose = useCallback(() => {
        dispatch(appUpdateState({
            windowWrapper: undefined
        }))
    }, [])


    useEffect(() => {
        const canvas = document.getElementById('wwCanvas') as HTMLCanvasElement | null
        let reqId: any
        if (canvas) {
            const context = canvas.getContext('2d')
            if (context) {
                flag.current = true
                const width = window.innerWidth
                const height = window.innerHeight
                const dots: Particle[] = []
                canvas.addEventListener('mousemove', (event) => {
                    dots.push(new Particle({
                        x: event.clientX,
                        y: event.clientY,
                        ctx: context,
                        radius: 30,
                        dots,
                    }))
                })

                const draw = () => {
                    context.clearRect(0, 0, width, height)
                    dots.forEach((particle, i) => {
                        particle.move()
                        particle.draw()

                        if (particle.velocity.x < 0.015 || particle.radius < 1) {
                            dots.splice(i, 1)
                        }
                        if (dots.length > 50) {
                            dots[0].coef *= .5
                        }
                    })
                }

                const render = () => {

                    if (flag.current) {
                        draw()
                    }
                    reqId = requestAnimationFrame(render)
                }

                render()
            }
        }

        return () => {
            cancelAnimationFrame(reqId)
        }
    }, [])

    return (
        <div className={setClasses(styles.modalContainer, 'flexCenter')}>
            <canvas id={'wwCanvas'} width={window.innerWidth} height={window.innerHeight}
                    onMouseEnter={() => {
                        flag.current = true
                    }}
                    onMouseLeave={() => {
                        flag.current = false
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
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" className={styles.svg}>
                <defs>
                    <filter id="liquid">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="1" result="blur" />
                        <feTurbulence id="turbulence" type="fractalNoise" baseFrequency=".03" numOctaves=".1" />
                        <feDisplacementMap in="SourceGraphic" scale="1000" />
                    </filter>
                </defs>
            </svg>
        </div>
    )
})

type tPos = {
    x: number,
    y: number
}
type tParticleProps = {
    x: number,
    y: number,
    ctx: CanvasRenderingContext2D
    radius: number,
    dots: Particle[]
}

export class Particle {
    pos: tPos
    ctx: CanvasRenderingContext2D
    radius: number
    velocity: tPos
    life: number
    coef: number

    constructor(props: tParticleProps) {
        this.pos = {x: props.x, y: props.y}
        this.ctx = props.ctx
        this.radius = props.radius
        this.velocity = {
            x: (Math.random() * 2) - 1,
            y: (Math.random() * 2) - 1,
        }
        this.life = 0
        this.coef = 1
    }


    move() {
        this.velocity.x *= 0.99 * 1
        this.velocity.y *= 0.99 * 1
        this.radius *= 0.99 * 1
        this.life++
        this.pos.x += this.velocity.x
        this.pos.y += this.velocity.y
    }

    draw() {
        this.ctx.fillStyle = '#454545'
        this.ctx.beginPath()
        this.ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI)
        this.ctx.closePath()
        this.ctx.fill()
    }
}