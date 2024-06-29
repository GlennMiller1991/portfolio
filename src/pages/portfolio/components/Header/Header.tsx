import React, {useEffect, useState} from "react";
import styles from './Header.module.scss'
import {Nava} from "./Nava/Nava";
import {observer} from "mobx-react-lite";
import {setClasses} from "../../../../common/utils/setClasses";
import {Up} from "../Up/Up";
import {HeaderController} from "./header.controller";
import {Circle} from "../../../../lib/math/figures/circle";
import {StraightLine} from "../../../../lib/math/figures/straight-line";
import {IPoint2} from "../../../../lib/math/figures";
import {Operator} from "../../../../lib/math/operator";

export const Header: React.FC = observer(() => {
        const [controller] = useState(() => new HeaderController())

        useEffect(() => controller.dispose.bind(controller), [])

        return (
            <>
                <div id={'header'}
                     className={setClasses(styles.header, controller.isUpBtnShown && styles.backgrounded)}>
                    <LanguageChoice/>
                    <Nava currentAnchor={controller.nearestSection}/>
                </div>
                {
                    controller.isUpBtnShown && <Up/>
                }
            </>

        )
    }
)

export const Variants: React.FC = React.memo(() => {

    const circle = new Circle([0, 0], 40)

    const line = new StraightLine(circle.center, [circle.r, circle.center[0]])

    return (
        <div className={styles.variants}>
            {
                ['en', 'ru'].map((variant, i, arr) => {
                    line.transform(Operator.rotateIdentity(360 / arr.length))
                    return (
                        <Variant center={line.p2} text={variant}/>
                    )
                })
            }
        </div>
    )
})


type IVariant = {
    center: IPoint2,
    text: string,
}
export const Variant: React.FC<IVariant> = React.memo(({
                                                           center,
                                                           text,
                                                       }) => {

    console.log(center)

    return (
        <div className={styles.variant} style={{
            left: center[0],
            top: center[1]
        }}>
            {
                text
            }
        </div>
    )
})

export const LanguageChoice: React.FC = React.memo(() => {
    return (
        <div className={styles.field} tabIndex={1}>
            <div className={styles.lang}>
                <div className={setClasses(styles.controlBorder, styles.button)}>
                    <div className={styles.control}>
                        <div className={styles.risk}/>
                    </div>
                </div>
            </div>
            <Variants/>
        </div>
    )
})