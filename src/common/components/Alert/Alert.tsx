import React, {useContext, useEffect} from 'react'
import styles from './Alert.module.scss'
import {setClasses} from '../../utils/setClasses'
import {AppContext} from "../../../App";

type tAlert = {
    children: string
}
export const Alert: React.FC<tAlert> = React.memo(({
                                                       children,
                                                   }) => {

    const appController = useContext(AppContext)

    useEffect(() => {
        const id = setTimeout(() => {
            appController.setAlertMessage(undefined)
        }, 3000)

    }, [])

    return (
        <div className={styles.container}>
            <div className={setClasses(styles.textWrapper, 'flexCenter')}>
                {
                    children
                }
            </div>
        </div>
    )

})