import React, {useContext, useEffect} from 'react'
import styles from './Alert.module.scss'
import {setClasses} from '../../utils/setClasses'

import {AppContext} from "../../../app/app.context";

type tAlert = {
    children: string
}
export const Alert: React.FC<tAlert> = React.memo(({
                                                       children,
                                                   }) => {

    const appController = useContext(AppContext)

    useEffect(() => {
        const id = setTimeout(() => {
            appController.setNotification(undefined)
        }, 3000)

        return () => clearTimeout(id)
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