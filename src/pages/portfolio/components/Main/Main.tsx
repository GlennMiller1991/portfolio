import React, {useEffect, useState} from 'react';
import styles from './Main.module.scss'
import {TypedString} from './typed-string/typed-string';
import {observer} from "mobx-react-lite";
import {useAppContext} from "@src/app/app.context";
import en from "@src/app/dictionary/en.json";
import {Section} from "@src/pages/portfolio/components/sections/section";
import {useSectionVisibility} from "@src/pages/portfolio/components/sections/section-visibility.context";
import EventEmitter from "node:events";
import {TypedStringEventEmitter} from "@src/lib/typed-string";

export const Main = React.memo(() => {
        return (
            <Section id={en.sections.main} containerClassName={styles.main}>
                <MainContent/>
            </Section>
        )
    }
)

export const MainContent = observer(() => {
    const [ee] = useState(() => new EventEmitter() as TypedStringEventEmitter);
    const {isVisible} = useSectionVisibility();
    const app = useAppContext();

    useEffect(() => {
        if (isVisible) ee.emit('run');
        else ee.emit('stop');
    }, [isVisible]);

    useEffect(() => {
        isVisible && ee.emit('run');
    }, [app.lang.currentLang])

    return (
        <>
            <div className={styles.content}>
                <TypedString key={app.lang.currentLang} eventEmitter={ee}/>
            </div>
            <div className={styles.photo}>{''}</div>
        </>
    )
})

