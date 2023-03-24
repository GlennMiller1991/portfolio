import React, {useCallback} from 'react'
import styles from './WindowWrapper.module.scss'
import {setClasses} from '../../common/utils/setClasses'
import {IoCloseOutline} from 'react-icons/all'
import {useDispatch} from 'react-redux'
import {appUpdateState} from '../../redux/appReducer/appReducer'

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