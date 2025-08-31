import React from 'react';
import styles from './Main.module.scss'
import {TypedString} from './typed-string/typed-string';
import {Section} from "@src/pages/portfolio/components/Contacts/Contacts";

export const Main = React.memo(() => {
        return (
            <Section containerClassName={styles.main}>
                <div className={styles.content}>
                    <TypedString/>
                    <span className={styles.keyboardSpan}>|</span>
                </div>
                <div className={styles.photo}>{''}</div>
            </Section>
        )
    }
)

