import React, {MouseEventHandler, useState} from "react";
import {observer} from "mobx-react-lite";
import styles from "../../settings.module.scss";
import {Angle, AngleUnits} from "../../../../../lib/math/angle/angle";
import {setClasses} from "../../../../utils/setClasses";
import sharedStyles from "../../../../styles/common.module.scss";
import {Choicer} from "../../shared/choicer";
import {ThemeChoiceController} from "./theme-choice.controller";

export const ThemeChoice: React.FC = observer(() => {
    const [controller] = useState(() => new ThemeChoiceController())
    return (
        <div className={styles.field}
             tabIndex={1}>
            <Choicer angle={Angle.toDeg(controller.angle, AngleUnits.Turn)!}/>
            <div className={setClasses(styles.variants, sharedStyles.transformToCenter)}
                 style={{
                     width: 70,
                     height: 70,
                     borderRadius: '50%'
                 }}>
                <canvas width={70}
                        onClick={controller.onPick as MouseEventHandler}
                        ref={controller.init}
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