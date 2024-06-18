import React, {useEffect, useState} from "react";
import styles from '../Main.module.scss'
import {observer} from "mobx-react-lite";
import {TypedStringControllerPortfolio} from "./controller";

export const TypedString = observer(() => {
    const [controller] = useState(() => new TypedStringControllerPortfolio())

    useEffect(() => controller.dispose.bind(controller), [])
    return (
        <span className={styles.react}>
            {
                controller.currentPart
            }
        </span>
    )
})