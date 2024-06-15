import React from 'react';
import styles from './Main.module.scss'
import commonStyles from '../../common/styles/common.module.scss'
import {ChangableSpan} from './ChangableSpan/ChangableSpan';
import {useSelector} from 'react-redux'
import {stateType} from '../../redux/store'

export const Main = React.memo(() => {
        const appWidth = useSelector<stateType, number>(state => state.appState.appWidth)

        return (
            <div id={'main'} className={styles.main}>
                <div className={commonStyles.container + ' ' + styles.container}>
                    <div className={styles.greeting}>
                        <h2 className={styles.rest}>Hi There! I am</h2>
                        <h1 className={styles.name}>ALEXANDR BASALOV</h1>
                        <p>
                            {
                                <ChangableSpan/>
                            }
                            <span className={styles.keyboardSpan}>|</span>
                            {
                                appWidth < 700 &&
                                <br/>
                            }
                            <span className={styles.developer}>developer.</span></p>
                    </div>
                    <div className={styles.photo}>{''}</div>
                </div>
            </div>
        )
    }
)

