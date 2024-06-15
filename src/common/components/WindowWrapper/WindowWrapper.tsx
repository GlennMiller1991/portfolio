import React, {useCallback} from 'react'
import styles from './WindowWrapper.module.scss'
import {setClasses} from '../../utils/setClasses'
import {useDispatch} from 'react-redux'
import {appUpdateState} from '../../../redux/appReducer/appReducer'
import {WindowWrapperCanvas} from "./WindowWrapperCanvas/WindowWrapperCanvas";
import {IoCloseOutline} from "react-icons/io5";


type tWindowWrapper = {
    containerClass?: string,
    children?: React.ReactNode
}
export const WindowWrapper: React.FC<tWindowWrapper> = React.memo(({
                                                                       containerClass,
                                                                       children
                                                                   }) => {
    const dispatch = useDispatch()
    const onClose = useCallback(() => {
        dispatch(appUpdateState({
            windowWrapper: undefined
        }))
    }, [])


    return (
        <div className={setClasses(styles.modalContainer, 'flexCenter')}>
            <WindowWrapperCanvas/>
            <div className={setClasses(styles.modalContent, containerClass)}>
                <button className={setClasses(styles.closeBtn, 'flexCenter')} onClick={onClose}>
                    <IoCloseOutline/>
                </button>
                {
                    children
                }
            </div>

        </div>
    )
})



