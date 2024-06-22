import React from "react";
import styles from './Header.module.scss'
import {Nava} from "./Nava/Nava";
import {observer} from "mobx-react-lite";
import {useAppContext} from "../../../../app/app.context";
import {setClasses} from "../../../../common/utils/setClasses";

type HeaderPropsType = {
    showUp: boolean
}
export const Header: React.FC<HeaderPropsType> = observer((props) => {

        const appController = useAppContext()

        console.log(appController.isUpBtnShown)
        return (
            <div id={'header'} className={setClasses(styles.header, appController.isUpBtnShown && styles.backgrounded)}>
                <Nava/>
            </div>
        )
    }
)
