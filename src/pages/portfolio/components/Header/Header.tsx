import React, {useEffect, useState} from "react";
import styles from './Header.module.scss'
import {Nava} from "./Nava/Nava";
import {observer} from "mobx-react-lite";
import {setClasses} from "../../../../common/utils/setClasses";
import {Up} from "../Up/Up";
import {HeaderController} from "./header.controller";
import {AppSettings} from "../../../../common/components/app-settings/app-settings";
import {useAppContext} from "../../../../app/app.context";

export const Header: React.FC = observer(() => {
        const [controller] = useState(() => new HeaderController())
        const app = useAppContext()

        useEffect(() => controller.dispose.bind(controller), [])

        return (
            <>
                <div id={'header'}
                     className={setClasses(styles.header, controller.isUpBtnShown && styles.backgrounded)}>
                    {
                        app.appDomRect.width > 1000 &&
                        <AppSettings factor={0.8}/>
                    }
                    <Nava currentAnchor={controller.nearestSection}/>
                </div>
                {
                    controller.isUpBtnShown && <Up/>
                }
            </>

        )
    }
)

