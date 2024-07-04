import React, {MouseEventHandler, useState} from "react";
import {observer} from "mobx-react-lite";
import {AngleUnits} from "../../../../../lib/math/angle/angle";
import {setClasses} from "../../../../utils/setClasses";
import {Caption, Choicer} from "../../shared/choicer";
import {ThemeChoiceController} from "./theme-choice.controller";
import styles from './../../settings.module.scss'
import {app, s} from "../../../../../app/constants";

export const ThemeChoice: React.FC = observer(() => {
    const [controller] = useState(() => new ThemeChoiceController())
    const size = 70

    const gradient = app.theme.toCSS()
    return (
        <>
            <Choicer angle={controller.angle} unit={AngleUnits.Turn}/>
            <Caption>
                {
                    app.d.settings.theme
                }
            </Caption>
            <div className={setClasses(s.abs, s.origin, s.transformToCenter, s.fullBordered)}>
                <div
                    onClick={controller.onPick as MouseEventHandler}
                    className={setClasses(
                        s.abs,
                        s.fullBordered,
                        s.transformToCenter,
                    )}
                    style={{
                        width: size,
                        height: size,
                        background: gradient,
                    }}>

                </div>
                <canvas width={size}
                        onClick={controller.onPick as MouseEventHandler}
                        ref={controller.init}
                        className={setClasses(
                            'abs',
                            'fullBordered',
                            'transformToCenter',
                        )}
                        height={size}
                        style={{
                            width: size,
                            height: size,
                        }}/>
                <div className={setClasses(
                    styles.canvasCircle,
                    'transformToCenter',
                    'fullBordered',
                    'abs',
                    'unobservable',
                )}
                     style={{
                         width: size - 20,
                         height: size - 20,
                     }}/>
            </div>
        </>
    )
})