import React, {useContext} from 'react'
import styles from './WindowWrapper.module.scss'
import {setClasses} from '../../utils/setClasses'
import {DistortedBackground} from "./background/view";
import {IoCloseOutline} from "react-icons/io5";
import {AppContext} from "../../../App";

type IWindowWrapper = {
    onClose?: () => void
}
export const WindowWrapper: React.FC<React.PropsWithChildren<IWindowWrapper>> = React.memo(({
                                                                                                children,
                                                                                                onClose
                                                                                            }) => {
    const appController = useContext(AppContext)

    return (
        <div className={setClasses(styles.modalContainer, 'flexCenter')}>
            <DistortedBackground/>
            <div className={styles.modalContent}>
                <button className={setClasses(styles.closeBtn, 'flexCenter')} onClick={() => {
                    onClose && onClose()
                    !onClose && appController.setWindowContent(undefined)
                }}>
                    <IoCloseOutline/>
                </button>
                {
                    children
                }
            </div>

        </div>
    )
})



