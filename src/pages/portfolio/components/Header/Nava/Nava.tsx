import React, {useCallback} from 'react';
import styles from './Nava.module.scss'
import {NavLink, useNavigate} from 'react-router-dom';

import {BsFileEarmarkPerson} from "react-icons/bs";
import {AiOutlineContacts, AiOutlineFundProjectionScreen} from "react-icons/ai";
import {GiSkills} from "react-icons/gi";
import {FiLogIn} from "react-icons/fi";
import {app, sections} from "../../../../../app/constants";
import {setClasses} from "../../../../../common/utils/setClasses";
import {routes} from "../../../../../common/constants/routes";
import {useAppContext} from "../../../../../app/app.context";
import {observer} from "mobx-react-lite";

type INava = {
    currentAnchor: string | undefined
}
export const Nava: React.FC<INava> = observer(({currentAnchor}) => {

    const goto = useNavigate()

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
                <NavLink className={setClasses(styles.link, currentAnchor === sections.main && styles.active)}
                         onClick={() => scrollTo(sections.main)}
                         to={`#${sections.main}`}>
                    {
                        appWidth < 1000 ?
                            <BsFileEarmarkPerson/> :
                            app.d.sections.main
                    }
                </NavLink>
                <div className={setClasses(styles.underMenu, currentAnchor === sections.main && styles.underActive)}/>
            </div>
            {/* Skills */}
            <div className={styles.linkContainer}>
                <NavLink className={setClasses(styles.link, currentAnchor === sections.skills && styles.active)}
                         onClick={() => scrollTo(sections.skills)}
                         to={`#${sections.skills}`}>
                    {
                        appWidth < 1000 ?
                            <GiSkills/> : app.d.sections.skills
                    }
                </NavLink>
                <div
                    className={setClasses(styles.underMenu, currentAnchor === sections.skills && styles.underActive)}/>
            </div>
            {/* Projects */}
            <div className={styles.linkContainer}>
                <NavLink className={setClasses(styles.link, currentAnchor === sections.projects && styles.active)}
                         onClick={() => scrollTo(sections.projects)}
                         to={`#${sections.projects}`}>
                    {
                        appWidth < 1000 ?
                            <AiOutlineFundProjectionScreen/> : app.d.sections.projects
                    }
                </NavLink>
                <div
                    className={setClasses(styles.underMenu, currentAnchor === sections.projects && styles.underActive)}/>
            </div>
            {/* Contacts */}
            <div className={styles.linkContainer}>
                <NavLink className={setClasses(styles.link, currentAnchor === sections.contacts && styles.active)}
                         onClick={() => scrollTo(sections.contacts)}
                         to={`#${sections.contacts}`}>
                    {
                        appWidth < 1000 ?
                            <AiOutlineContacts/> :
                            app.d.sections.contacts
                    }
                </NavLink>
                <div
                    className={setClasses(styles.underMenu, currentAnchor === sections.contacts && styles.underActive)}/>
            </div>
            {/* Login */}
            <div className={styles.linkContainer} onClick={() => goto(routes.auth)}>
                <div className={styles.link}>
                    {
                        appWidth < 1000 ? <FiLogIn/> : sections.login
                    }
                </div>
            </div>
        </div>
    )
})