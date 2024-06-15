import React, {useContext} from 'react'
import styles from './WindowWrapper.module.scss'
import {setClasses} from '../../utils/setClasses'
import {WindowWrapperCanvas} from "./WindowWrapperCanvas/WindowWrapperCanvas";
import {IoCloseOutline} from "react-icons/io5";
import {AppContext} from "../../../App";

export const WindowWrapper: React.FC<React.PropsWithChildren> = React.memo(({
                                                                                children
                                                                            }) => {
    const appController = useContext(AppContext)

    return (
        <div className={setClasses(styles.modalContainer, 'flexCenter')}>
            <WindowWrapperCanvas/>
            <div className={styles.modalContent}>
                <button className={setClasses(styles.closeBtn, 'flexCenter')} onClick={() => {
                    appController.setWindowContent(undefined)
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



