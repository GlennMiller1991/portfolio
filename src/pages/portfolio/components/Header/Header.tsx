import React, {useEffect, useState} from "react";
import styles from './Header.module.scss'
import sharedStyles from '../../../../common/styles/common.module.scss'
import {Nava} from "./Nava/Nava";
import {observer} from "mobx-react-lite";
import {setClasses} from "../../../../common/utils/setClasses";
import {Up} from "../Up/Up";
import {HeaderController} from "./header.controller";
import {Circle} from "../../../../lib/math/figures/circle";
import {StraightLine} from "../../../../lib/math/figures/straight-line";
import {IPoint2} from "../../../../lib/math/figures";
import {Operator} from "../../../../lib/math/operator";
import {app} from "../../../../app/constants";
import {action, makeObservable} from "mobx";
import {Color} from "../../../../lib/math/colors/color";

export const Header: React.FC = observer(() => {
        const [controller] = useState(() => new HeaderController())

        useEffect(() => controller.dispose.bind(controller), [])

        return (
            <>
                <div id={'header'}
                     className={setClasses(styles.header, controller.isUpBtnShown && styles.backgrounded)}>
                    <LanguageChoice/>
                    <ThemeChoice/>
                    <Nava currentAnchor={controller.nearestSection}/>
                </div>
                {
                    controller.isUpBtnShown && <Up/>
                }
            </>

        )
    }
)

type IVariant = {
    center: IPoint2,
    text: string,
    isChosen: boolean,
    onChoose(): void,
}
export const Variant: React.FC<IVariant> = observer(({
                                                           center,
                                                           text,
                                                           isChosen,
                                                           onChoose,
                                                       }) => {

    return (
        <div className={setClasses(sharedStyles.transformToCenter, styles.variant, isChosen && styles.chosenVariant)}
             onClick={onChoose}
             style={{
                 left: center[0],
                 top: center[1]
             }}>
            {
                text
            }
        </div>
    )
})


export class LanguageChoiceController {
    circle = new Circle([0, 0], 45)
    line = new StraightLine(this.circle.center, [this.circle.r, this.circle.center[0]])

    isActive: boolean = false

    setIsActive(value: typeof this.isActive) {
        this.isActive = value
    }

    switchVariant(variant: typeof app.lang.langs[number]) {
        if (this.isActive) {
            app.lang.switch(variant)
        }
    }

    get chosenIndex() {
        return app.lang.langs.findIndex((lang) => lang === app.lang.currentLang)
    }

    get angleStep() {
        return 360 / app.lang.langs.length
    }

    constructor() {
        makeObservable(this, {
            isActive: true,
            setIsActive: action
        })
    }
}

export const ThemeChoice: React.FC = observer(() => {
    const [controller] = useState(() => new LanguageChoiceController())
    const angle = app.theme.colorAngle || 0
    return (
        <div className={styles.field}
             tabIndex={1}
             onFocus={() => controller.setIsActive(true)}
             onBlur={() => controller.setIsActive(false)}>
            <Choiser angle={angle}/>
            <div className={setClasses(styles.variants, sharedStyles.transformToCenter)}
                 style={{
                     width: 70,
                     height: 70,
                     zIndex: -1,
                     borderRadius: '50%'
                 }}
            >
                <canvas width={70}
                        onClick={(e) => {
                            const canvas = e.currentTarget
                            const ctx = canvas.getContext('2d')!
                            const rect = canvas.getBoundingClientRect()
                            const x = e.clientX - rect.left
                            const y = e.clientY - rect.top
                            const data = ctx.getImageData(x, y, 1, 1)
                            app.theme.switchColor(new Color(
                                data.data[0],
                                data.data[1],
                                data.data[2]
                            ))
                            console.log('ok')
                        }}
                        ref={(node) => {
                            if (!node) return
                            const ctx = node.getContext('2d', {
                                willReadFrequently: true,
                                alpha: false,
                            })
                            if (!ctx) return

                            const gradient = ctx.createConicGradient(0, 35, 35)

                            for (let color of app.theme.colors) {
                                gradient.addColorStop(color.angle, color.color.toCSS())
                            }
                            gradient.addColorStop(1, app.theme.colors[0].color.toCSS())

                            ctx.fillStyle = gradient
                            ctx.fillRect(0, 0, 70, 70)


                        }}
                        height={70} style={{
                    position: 'absolute',
                    borderRadius: '50%',
                    inset: 0,
                    width: 70,
                    height: 70,
                }}/>
                <div style={{
                    position: 'absolute',
                    background: 'black',
                    width: 50,
                    height: 50,
                    left: '50%',
                    top: '50%',
                    borderRadius: '50%',
                    transform: 'translate(-50%, -50%)',
                }}/>
            </div>
        </div>
    )
})

export const LanguageChoice: React.FC = observer(() => {

    const [controller] = useState(() => new LanguageChoiceController())

    return (
        <div className={styles.field}
             tabIndex={1}
             onFocus={() => controller.setIsActive(true)}
             onBlur={() => controller.setIsActive(false)}>
            <Choiser angle={(controller.chosenIndex + 1) * controller.angleStep}/>
            <div className={setClasses(styles.variants, sharedStyles.transformToCenter)}>
                {
                    app.lang.langs.map((variant, i, arr) => {
                        controller.line.transform(Operator.rotateIdentity(controller.angleStep))
                        return (
                            <Variant key={variant} center={controller.line.p2}
                                     onChoose={() => controller.switchVariant(variant)}
                                     text={variant}
                                     isChosen={variant === app.lang.currentLang}/>
                        )
                    })
                }
            </div>
        </div>
    )
})

type IChoiser = {
    angle: number,
}
export const Choiser: React.FC<IChoiser> = React.memo(({
                                                         angle,
                                                     }) => {

    return (
        <div
            className={styles.lang}
            style={{
                transform: `rotate(${angle}deg)`
            }}
        >
            <div className={setClasses(styles.controlBorder, styles.button)}>
                <div className={styles.control}>
                    <div className={styles.risk}/>
                </div>
            </div>
        </div>
    )
})