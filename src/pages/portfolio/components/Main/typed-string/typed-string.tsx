import React, {useEffect, useState} from "react";
import styles from '../Main.module.scss'
import {observer} from "mobx-react-lite";
import {TypedStringControllerPortfolio} from "./controller";
import {useAppContext} from "@src/app/app.context";

export const TypedString = observer(() => {
    const app = useAppContext()
    const [controller] = useState(() => new TypedStringControllerPortfolio(app.d.typedString))

    useEffect(() => controller.dispose.bind(controller), [])
    return (
        <span className={styles.react}>
            {
                controller.currentPart
            }
        </span>
    )
})