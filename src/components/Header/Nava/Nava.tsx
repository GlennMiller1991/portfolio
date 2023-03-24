import React, {useCallback} from 'react';
import styles from './Nava.module.scss'
import {NavLink} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {stateType} from '../../../redux/store';
import {anchorType} from '../../../redux/reducer';
import {appUpdateState} from '../../../redux/appReducer/appReducer'
import {Login} from '../../Login/Login'
import {
    AiOutlineContacts,
    AiOutlineFundProjectionScreen,
    AiOutlineLogin,
    AiOutlineLogout, BsFileEarmarkPerson,
    FiLogIn, FiLogOut,
    GiSkills,
    GrProjects
} from 'react-icons/all'
import {setClasses} from '../../../common/utils/setClasses'

export const Nava = React.memo(() => {
        const dispatch = useDispatch()
        const currentAnchor = useSelector<stateType, anchorType>(state => state.state.currentAnchor)
        const appWidth = useSelector<stateType, number>(state => state.appState.appWidth)
        const authenticated = useSelector<stateType, boolean>(state => state.appState.authenticated)


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
                    if (authenticated) {

                    } else {
                        dispatch(appUpdateState({
                            windowWrapper: {element: <Login/>, containerClass: styles.loginContainer}
                        }))
                    }
                }}>
                    <div className={styles.link}>
                        {
                            appWidth < 1000 ? authenticated ? <FiLogOut/> : <FiLogIn/> :
                                authenticated ? 'Logout' : 'Login'
                        }
                    </div>
                </div>
            </div>
        )
    }
)