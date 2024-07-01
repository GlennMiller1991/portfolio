import React from "react";
import styles from "../settings.module.scss";
import {setClasses} from "../../../utils/setClasses";

type IChoicer = {
    angle: number,
}
export const Choicer: React.FC<IChoicer> = React.memo(({
                                                           angle,
                                                       }) => {

    return (
        <div className={styles.choicer}
             style={{transform: `rotate(${angle}deg)`}}>
            <div className={setClasses(styles.controlBorder, styles.button)}>
                <div className={styles.control}>
                    <div className={styles.risk}/>
                </div>
            </div>
        </div>
    )
})