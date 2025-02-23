import React, {MouseEventHandler, useState} from "react";
import {observer} from "mobx-react-lite";
import {setClasses} from "../../../../../lib/common/set-classes";
import {Caption, Choicer} from "../../shared/choicer";
import {ThemeChoiceController} from "./theme-choice.controller";
import styles from './../../settings.module.scss'
import {s} from "../../../../../app/constants";
import {AngleUnits} from "@fbltd/math";
import {useAppContext} from "../../../../../app/app.context";

export const ThemeChoice: React.FC = observer(() => {
    const app = useAppContext()
    const [controller] = useState(() => new ThemeChoiceController(app.theme))
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