import React, {useState} from 'react';
import styles from './Nava.module.scss'

import {BsFileEarmarkPerson} from "react-icons/bs";
import {AiOutlineContacts, AiOutlineFundProjectionScreen} from "react-icons/ai";
import {GiSkills} from "react-icons/gi";
import {setClasses} from "@src/lib/common/set-classes";
import {observer} from "mobx-react-lite";
import dict from '../../../../../app/dictionary/en.json'
import {useAppContext} from "@src/app/app.context";

type INava = {
    currentAnchor: string | undefined
}

export class NavigationPanelController {
    scrollTo = (elementId: string) => {
        const elem = document.getElementById(elementId)
        elem && elem.scrollIntoView({
            behavior: 'smooth'
        })
    }
}

export const Nava: React.FC<INava> = observer(({currentAnchor}) => {

    const [controller] = useState(() => new NavigationPanelController())
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
                                                                                            children,
                                                                                        }) => {
    return (
        <div className={styles.linkContainer}>
            <a
                className={setClasses(styles.link, isActive && styles.active)}
                onClick={onClick}>
                {
                    children
                }
            </a>
            <div
                className={setClasses(styles.underMenu, isActive && styles.underActive)}/>
        </div>
    )
})