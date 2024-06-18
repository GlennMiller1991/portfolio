import React, {useContext, useEffect, useRef, useState} from "react";
import styles from "../WindowWrapper.module.scss"
import {AppContext} from "../../../../App";
import {ParticlesController} from "./controller";

export const DistortedBackground: React.FC = React.memo(() => {
    const viewController = useContext(AppContext)
    const [controller] = useState(() => new ParticlesController(viewController))
    const canvasRef = useRef<HTMLCanvasElement>(null)


    // visual effects
    useEffect(() => {
        canvasRef.current && controller.init(canvasRef.current)
        return controller.dispose.bind(controller)
    }, [])

    return (
        <>
            <canvas ref={canvasRef} className={styles.canvas}/>
            <svg className={styles.svg}>
                <defs>
                    <filter id={'liquid'}>
                        <feTurbulence type="fractalNoise" baseFrequency=".03"/>
                        <feDisplacementMap in="SourceGraphic" scale="150"/>
                    </filter>
                </defs>
            </svg>
        </>
    )
})