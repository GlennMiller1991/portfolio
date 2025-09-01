import React from 'react';
import styles from './Main.module.scss'
import {TypedString} from './typed-string/typed-string';
import {Section} from "@src/pages/portfolio/components/Contacts/Contacts";
import {observer} from "mobx-react-lite";
import {useAppContext} from "@src/app/app.context";
import en from "@src/app/dictionary/en.json";

export const Main = observer(() => {
        const app = useAppContext();
        return (
            <Section id={en.sections.main} containerClassName={styles.main}>
                <div className={styles.content}>
                    <TypedString key={app.lang.currentLang}/>
                    <span className={styles.keyboardSpan}>|</span>
                </div>
                <div className={styles.photo}>{''}</div>
            </Section>
        )
    }
)

