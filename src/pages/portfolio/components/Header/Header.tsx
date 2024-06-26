import React, {useEffect, useState} from "react";
import styles from './Header.module.scss'
import {Nava} from "./Nava/Nava";
import {observer} from "mobx-react-lite";
import {setClasses} from "../../../../common/utils/setClasses";
import {Up} from "../Up/Up";
import {HeaderController} from "./header.controller";

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

export const LanguageChoice: React.FC = React.memo(() => {
    return (
        <div className={styles.lang}>
            <div className={styles.control}/>
        </div>
    )
})