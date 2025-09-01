import React from 'react';
import styles from './Main.module.scss'
import {TypedString} from './typed-string/typed-string';
import {observer} from "mobx-react-lite";
import {useAppContext} from "@src/app/app.context";
import en from "@src/app/dictionary/en.json";
import {Section} from "@src/pages/portfolio/components/sections/section";
import {useSectionVisibility} from "@src/pages/portfolio/components/sections/section-visibility.context";

export const Main = observer(() => {
        const app = useAppContext();
        const sectionVisibility = useSectionVisibility();
        console.log('main', sectionVisibility.isVisible);
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

