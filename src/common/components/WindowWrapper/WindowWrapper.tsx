import React, {useCallback, useEffect} from 'react'
import styles from './WindowWrapper.module.scss'
import {setClasses} from '../../utils/setClasses'
import {useDispatch} from 'react-redux'
import {appUpdateState} from '../../../redux/appReducer/appReducer'
import {SwipeListener} from "../../utils/SwipeListener";
import {wwContainer} from "../../constants/ids";
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



    // swipe out
    useEffect(() => {
        const container = document.getElementById(wwContainer)
        let swipeListener: SwipeListener
        if (container) {
            // swipeListener = new SwipeListener({
            //     element: container,
            //     callback: onClose,
            // })
        }

        return () => {
            swipeListener &&
                swipeListener.removeEventListener()
        }
    }, [])

    return (
        <div className={setClasses(styles.modalContainer, 'flexCenter')}
             id={wwContainer}>
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



