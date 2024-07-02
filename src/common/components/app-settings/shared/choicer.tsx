import React from "react";
import styles from "../settings.module.scss";
import {setClasses} from "../../../utils/setClasses";
import {Angle, AngleUnits} from "../../../../lib/math/angle/angle";

type IChoicer = {
    angle: number,
    unit: AngleUnits,
}

export const Choicer: React.FC<IChoicer> = React.memo(({
                                                           angle,
                                                           unit,
                                                       }) => {

    return (
        <div
            style={{transform: Angle.toCSS(angle, unit)}}
            className={setClasses(
                styles.choicer,
                'unobservable',
                'flexCenter',
                'transition',
            )}>
            <div className={setClasses(
                'flexCenter',
                'pointer',
                'transition',
                styles.controlBorder,
                styles.button
            )}>
                <div className={setClasses(
                    styles.control,
                    'rel',
                    'flexCenter',
                )}>
                    <div className={setClasses(
                        'rel',
                        'transition',
                        styles.risk
                    )}/>
                </div>
            </div>
        </div>
    )
})

export const Caption: React.FC<React.PropsWithChildren> = React.memo(({
                                                                          children,
                                                                      }) => {
    return (
        <div className={setClasses(
            'fullBordered',
            'abs',
            'transformToCenter',
            styles.choiceCaption
        )}>
            <span className={'rel'}>{
                children
            }</span>
        </div>
    )
})