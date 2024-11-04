import React, {useCallback} from 'react';
import styles from './Nava.module.scss'
import {NavLink} from 'react-router-dom';

import {BsFileEarmarkPerson} from "react-icons/bs";
import {AiFillSetting, AiOutlineContacts, AiOutlineFundProjectionScreen} from "react-icons/ai";
import {GiSkills} from "react-icons/gi";
import {app} from "../../../../../app/constants";
import {setClasses} from "../../../../../common/utils/setClasses";
import {observer} from "mobx-react-lite";
import {AppSettings} from "../../../../../common/components/app-settings/app-settings";
import dict from './../../../../../app/infra/dictionary/en.json'

type INava = {
    currentAnchor: string | undefined
}
export const Nava: React.FC<INava> = observer(({currentAnchor}) => {

    const scrollTo = useCallback((elementId: string) => {
        const elem = document.getElementById(elementId)
        elem && elem.scrollIntoView({
            behavior: 'smooth'
        })
    }, [])

    const appWidth = app.appDomRect.width
    return (
        <div className={styles.nava}>
            {/* Main */}
            <div className={styles.linkContainer}>
                <NavLink className={setClasses(styles.link, currentAnchor === dict.sections.main && styles.active)}
                         onClick={() => scrollTo(dict.sections.main)}
                         to={`#${dict.sections.main}`}>
                    {
                        appWidth < 1000 ?
                            <BsFileEarmarkPerson/> :
                            app.d.sections.main
                    }
                </NavLink>
                <div
                    className={setClasses(styles.underMenu, currentAnchor === dict.sections.main && styles.underActive)}/>
            </div>
            {/* Skills */}
            <div className={styles.linkContainer}>
                <NavLink className={setClasses(styles.link, currentAnchor === dict.sections.skills && styles.active)}
                         onClick={() => scrollTo(dict.sections.skills)}
                         to={`#${dict.sections.skills}`}>
                    {
                        appWidth < 1000 ?
                            <GiSkills/> : app.d.sections.skills
                    }
                </NavLink>
                <div
                    className={setClasses(styles.underMenu, currentAnchor === dict.sections.skills && styles.underActive)}/>
            </div>
            {/* Projects */}
            <div className={styles.linkContainer}>
                <NavLink className={setClasses(styles.link, currentAnchor === dict.sections.projects && styles.active)}
                         onClick={() => scrollTo(dict.sections.projects)}
                         to={`#${dict.sections.projects}`}>
                    {
                        appWidth < 1000 ?
                            <AiOutlineFundProjectionScreen/> : app.d.sections.projects
                    }
                </NavLink>
                <div
                    className={setClasses(styles.underMenu, currentAnchor === dict.sections.projects && styles.underActive)}/>
            </div>
            {/* Contacts */}
            <div className={styles.linkContainer}>
                <NavLink className={setClasses(styles.link, currentAnchor === dict.sections.contacts && styles.active)}
                         onClick={() => scrollTo(dict.sections.contacts)}
                         to={`#${dict.sections.contacts}`}>
                    {
                        appWidth < 1000 ?
                            <AiOutlineContacts/> :
                            app.d.sections.contacts
                    }
                </NavLink>
                <div
                    className={setClasses(styles.underMenu, currentAnchor === dict.sections.contacts && styles.underActive)}/>
            </div>

            {/* Settings */}
            {
                app.appDomRect.width <= 1000 &&
                <div className={styles.linkContainer}>
                    <NavLink className={styles.link}
                             onClick={() => app.setWindowContent(<AppSettings/>)}
                             to={''}>
                        {
                            appWidth < 1000 ?
                                <AiFillSetting/> :
                                app.d.sections.settings
                        }
                    </NavLink>
                    <div
                        className={setClasses(styles.underMenu, currentAnchor === dict.sections.contacts && styles.underActive)}/>
                </div>
            }
        </div>
    )
})