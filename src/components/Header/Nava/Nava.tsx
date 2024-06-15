import React, {useCallback} from 'react';
import styles from './Nava.module.scss'
import {NavLink} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {stateType} from '../../../redux/store';
import {anchorType} from '../../../redux/reducer';


import {serverUrl} from "../../../common/constants/baseUrl";
import {BsFileEarmarkPerson} from "react-icons/bs";
import {AiOutlineContacts, AiOutlineFundProjectionScreen} from "react-icons/ai";
import {GiSkills} from "react-icons/gi";
import {FiLogIn} from "react-icons/fi";

export const Nava = React.memo(() => {
        const currentAnchor = useSelector<stateType, anchorType>(state => state.state.currentAnchor)
        const appWidth = useSelector<stateType, number>(state => state.appState.appWidth)
        const serverIsAvailable = useSelector<stateType, boolean>(state => state.appState.serverIsAvailable)

        const linkStyle = useCallback((elementId: string) => {
            return `${styles.link} ${currentAnchor === elementId ? styles.active : ''}`
        }, [currentAnchor])
        const divStyle = useCallback((elementId: string) => {
            return `${styles.underMenu} ${currentAnchor === elementId ? styles.underActive : ''}`
        }, [currentAnchor])
        const scrollTo = useCallback((elementId: string) => {
            const elem = document.getElementById(elementId)
            if (elem) {
                const yOffset = 85
                const y = elem.getBoundingClientRect().top - yOffset + window.pageYOffset
                window.scrollTo({top: y, behavior: 'smooth'})
            }
        }, [])

        return (
            <div className={styles.nava}>
                <div className={styles.linkContainer}>
                    <NavLink className={() => linkStyle('main')}
                             onClick={() => scrollTo('main')}
                             to={'#main'}>
                        {
                            appWidth < 1000 ?
                                <BsFileEarmarkPerson/> : 'Common'
                        }
                    </NavLink>
                    <div className={divStyle('main')}>{''}</div>
                </div>
                <div className={styles.linkContainer}>
                    <NavLink className={() => linkStyle('projects')}
                             onClick={() => scrollTo('projects')}
                             to={'#projects'}>
                        {
                            appWidth < 1000 ?
                                <AiOutlineFundProjectionScreen/> : 'Projects'
                        }
                    </NavLink>
                    <div className={divStyle('projects')}>{''}</div>
                </div>
                <div className={styles.linkContainer}>
                    <NavLink className={() => linkStyle('skills')}
                             onClick={() => scrollTo('skills')}
                             to={'#skills'}>
                        {
                            appWidth < 1000 ?
                                <GiSkills/> : 'Experience'
                        }
                    </NavLink>
                    <div className={divStyle('skills')}>{''}</div>
                </div>
                {
                    serverIsAvailable &&
                    <>
                        <div className={styles.linkContainer}>
                            <NavLink className={() => linkStyle('contacts')}
                                     onClick={() => scrollTo('contacts')}
                                     to={'#contacts'}>
                                {
                                    appWidth < 1000 ?
                                        <AiOutlineContacts/> :
                                        'Contacts'
                                }
                            </NavLink>
                            <div className={divStyle('contacts')}>{''}</div>
                        </div>

                    <div className={styles.linkContainer} onClick={() => {
                        window.location.replace(`${serverUrl}/login`)
                    }}>
                        <div className={styles.link}>
                            {
                                appWidth < 1000 ? <FiLogIn/> : 'Login'
                            }
                        </div>
                    </div>
                        </>
                }
            </div>
        )
    }
)