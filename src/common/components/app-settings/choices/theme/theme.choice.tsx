import React, {MouseEventHandler, useState} from "react";
import {observer} from "mobx-react-lite";
import {AngleUnits} from "../../../../../lib/math/angle";
import {setClasses} from "../../../../utils/setClasses";
import {Caption, Choicer} from "../../shared/choicer";
import {ThemeChoiceController} from "./theme-choice.controller";
import styles from './../../settings.module.scss'
import {app, s} from "../../../../../app/constants";

export const ThemeChoice: React.FC = observer(() => {
    const [controller] = useState(() => new ThemeChoiceController())
    const size = 70

    return (
        <>
            <Choicer angle={controller.angle} unit={AngleUnits.Turn}/>
            <Caption>{app.d.settings.theme}</Caption>
            <div className={setClasses(s.abs, s.origin, s.transformToCenter, s.fullBordered)}>
                <div
                    onClick={controller.onPick as MouseEventHandler}
                    className={setClasses(s.abs, s.fullBordered, s.transformToCenter)}
                    style={{
                        width: size,
                        height: size,
                        background: app.theme.toCSS(),
                    }}/>
                <div
                    className={setClasses(styles.canvasCircle, s.transformToCenter, s.fullBordered, s.abs, s.unobservable)}
                    style={{
                        width: size - 20,
                        height: size - 20,
                    }}/>
            </div>
        </>
    )
})