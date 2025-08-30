import React from 'react';
import styles from './Main.module.scss'
import commonStyles from '../../../../common/styles/common.module.scss'
import {TypedString} from './typed-string/typed-string';
import {useAppContext} from "@src/app/app.context";
import en from '../../../../app/dictionary/en.json'

export const Main = React.memo(() => {
        const appController = useAppContext()

        return (
            <div id={en.sections.main} className={styles.main}>
                <div className={commonStyles.container + ' ' + styles.container}>
                    <div className={styles.greeting}>
                        <p style={{position: 'absolute', inset: 0}}>
                            {
                                <TypedString/>
                            }
                            <span className={styles.keyboardSpan}>|</span>
                        </p>
                    </div>
                    <div className={styles.photo}>{''}</div>
                </div>
            </div>
        )
    }
)

