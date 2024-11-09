import React, {useState} from 'react';
import styles from './Nava.module.scss'
import {NavLink} from 'react-router-dom';

import {BsFileEarmarkPerson} from "react-icons/bs";
import {AiFillSetting, AiOutlineContacts, AiOutlineFundProjectionScreen} from "react-icons/ai";
import {GiSkills} from "react-icons/gi";
import {setClasses} from "../../../../../common/utils/setClasses";
import {observer} from "mobx-react-lite";
import {AppSettings} from "../../../../../common/components/app-settings/app-settings";
import dict from './../../../../../app/infra/dictionary/en.json'
import {useAppContext} from "../../../../../app/app.context";

type INava = {
    currentAnchor: string | undefined
}

export const Nava: React.FC<INava> = observer(({currentAnchor}) => {

    const [controller] = useState(() => {
        class NavigationPanelController {
            scrollTo = (elementId: string) => {
                const elem = document.getElementById(elementId)
                elem && elem.scrollIntoView({
                    behavior: 'smooth'
                })
            }
        }

        return new NavigationPanelController()
    })
    const app = useAppContext()

    const appWidth = app.appDomRect.width

    return (
        <div className={styles.nava}>
            {/* Main */}
            <LinkWrapper isActive={currentAnchor === dict.sections.main}
                         onClick={() => controller.scrollTo(dict.sections.main)}>
                {
                    appWidth < 1000 ?
                        <BsFileEarmarkPerson/> :
                        app.d.sections.main
                }
            </LinkWrapper>

            {/* Skills */}
            <LinkWrapper isActive={currentAnchor === dict.sections.skills}
                         onClick={() => controller.scrollTo(dict.sections.skills)}>
                {
                    appWidth < 1000 ?
                        <GiSkills/> :
                        app.d.sections.skills
                }
            </LinkWrapper>

            {/* Projects */}
            <LinkWrapper isActive={currentAnchor === dict.sections.projects}
                         onClick={() => controller.scrollTo(dict.sections.projects)}>
                {
                    appWidth < 1000 ?
                        <AiOutlineFundProjectionScreen/> :
                        app.d.sections.projects
                }
            </LinkWrapper>

            {/* Contacts */}
            {
                app.isServerAvailable &&
                <LinkWrapper isActive={currentAnchor === dict.sections.contacts}
                             onClick={() => controller.scrollTo(dict.sections.contacts)}>
                    {
                        appWidth < 1000 ?
                            <AiOutlineContacts/> :
                            app.d.sections.contacts
                    }
                </LinkWrapper>
            }

            {/* Settings */}
            {
                app.appDomRect.width <= 1000 &&
                <LinkWrapper onClick={() => app.setWindowContent(<AppSettings/>)}>
                    <AiFillSetting/>
                </LinkWrapper>
            }
        </div>
    )
})

type ILinkWrapper = {
    isActive?: boolean,
    onClick: () => void,
}
export const LinkWrapper: React.FC<React.PropsWithChildren<ILinkWrapper>> = React.memo(({
                                                                                            isActive,
                                                                                            onClick,
                                                                                            children
                                                                                        }) => {
    return (
        <div className={styles.linkContainer}>
            <NavLink
                className={setClasses(styles.link, isActive && styles.active)}
                onClick={onClick}
                to={`#${dict.sections.contacts}`}>
                {
                    children
                }
            </NavLink>
            <div
                className={setClasses(styles.underMenu, isActive && styles.underActive)}/>
        </div>
    )
})