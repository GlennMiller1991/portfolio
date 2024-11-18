import React from 'react';
import styles from './Main.module.scss'
import commonStyles from '../../../../common/styles/common.module.scss'
import {TypedString} from './typed-string/typed-string';
import {useAppContext} from "../../../../app/app.context";
import en from '../../../../app/dictionary/en.json'

export const Main = React.memo(() => {
        const appController = useAppContext()
        const appWidth = appController.appDomRect.width

        return (
            <div id={en.sections.main} className={styles.main}>
                <div className={commonStyles.container + ' ' + styles.container}>
                    <div className={styles.greeting}>
                        <h2 className={styles.rest}>Hi There! I am</h2>
                        <h1 className={styles.name}>ALEXANDR BASALOV</h1>
                        <p>
                            {
                                <TypedString/>
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

