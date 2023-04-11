import React, {useEffect} from 'react'
import styles from './Alert.module.scss'
import {setClasses} from '../../utils/setClasses'
import {useDispatch} from 'react-redux'
import {appUpdateState} from '../../../redux/appReducer/appReducer'

type tAlert = {
    text: string,
    className?: string
}
export const Alert: React.FC<tAlert> = React.memo(({
                                                       text,
                                                       className,
                                                   }) => {

    const dispatch = useDispatch()
    useEffect(() => {
        const id = setTimeout(() => {
            dispatch(appUpdateState({alertWindow: undefined}))
        }, 3000)

    }, [])

    return (
        <div className={setClasses(styles.container, className)}>
            <div className={setClasses(styles.textWrapper, 'flexCenter')}>
                {
                    text
                }
            </div>
        </div>
    )

})