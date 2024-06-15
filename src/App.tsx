import React, {useCallback, useEffect, useState} from 'react';
import './App.css';
import './index.css'

import {Header} from './components/Header/Header';
import {Main} from './components/Main/Main';
import {Skills} from './components/Skills/Skills';
import {Projects} from './components/Projects/Projects';
import {Contacts} from './components/Contacts/Contacts';
import {Up} from './components/Up/Up';
import {Footer} from './components/Footer/Footer';
import {anchorType, checkAnchorTC} from './redux/reducer';
import {useSelector} from 'react-redux';
import {stateType, useAppDispatch} from './redux/store';
import {
    appStateUpdateServerAvailableness,
    appUpdateState,
    tAppState
} from './redux/appReducer/appReducer';
import {WindowWrapper} from './common/components/WindowWrapper/WindowWrapper'
import {loginAPI} from './common/api/loginAPI'
import {appContainer, pageTitle} from './common/constants/ids';
import {Alert} from './common/components/Alert/Alert'
import {commonServerAPI} from "./common/api/commonServerAPI";
import {app} from "./app/constants";

function App() {
    const currentAnchor = useSelector<stateType, anchorType>(state => state.state.currentAnchor)
    const appState = useSelector<stateType, tAppState>(state => state.appState)
    const dispatch = useAppDispatch()
    const [scrollY, setScrollY] = useState(0)
    const [elements, setElements] = useState<HTMLDivElement[]>([])
    const serverIsAvailable = useSelector<stateType, boolean>(state => state.appState.serverIsAvailable)

    const [showUp, setShowUp] = useState(false)
    const onScrollWindow = useCallback(() => {
        setScrollY(window.scrollY)
    }, [])

    //on scrolling execute
    useEffect(() => {
        const header = document.getElementById('header')
        if (header) {
            const currentY = document.documentElement.scrollTop
            const headerHeight = header.offsetHeight
            if (currentY <= headerHeight) {
                if (showUp) setShowUp(false)
            } else {
                if (!showUp) setShowUp(true)
            }
        }
        // @ts-ignore
        dispatch(checkAnchorTC(elements, currentAnchor))
    }, [scrollY, showUp])

    //get elements and add event listener
    useEffect(() => {
        setInterval(() => {
            let res: boolean = false
            commonServerAPI.serverAccess()
                .then((res) => {
                    res = true
                })
                .finally(() => {
                    dispatch(appStateUpdateServerAvailableness(res))
                })
        }, 60000)


        const isMobile = window.ontouchstart || window.navigator.userAgent.toLowerCase().includes('mobi')
        dispatch(appUpdateState({
            isMobile: !!isMobile
        }))

        document.title = pageTitle
        const elements = []
        for (let i = 0; i < app.d.sections.length; i++) {
            const elem = document.getElementById(app.d.sections[i])
            if (elem) {
                elements.push(elem)
            }
        }
        window.addEventListener('scroll', onScrollWindow)
        setElements(elements as HTMLDivElement[])

        const observer = new ResizeObserver(() => {
            const element = document.getElementById(appContainer)
            if (element) {
                dispatch(appUpdateState({
                    appWidth: element.getBoundingClientRect().width,
                    appHeight: window.innerHeight,
                }))
            }
        })

        const element = document.getElementById(appContainer)
        if (element) {
            observer.observe(element)
        }

        loginAPI.authenticate()
            .then(() => {
                dispatch(appUpdateState({authenticated: true}))
            })
            .catch(err => {
                console.log(err.message)
            })

        return () => {
            element && observer && observer.unobserve(element)
            window.removeEventListener('scroll', onScrollWindow)
        }
    }, [])

    return (
        <div id={appContainer}>
            <Header showUp={showUp}/>
            <Main/>
            <Skills/>
            <Projects/>
            {
                serverIsAvailable &&
                <Contacts/>
            }
            <Footer/>
            {
                showUp && <Up/>
            }
            {
                appState.windowWrapper &&
                <WindowWrapper containerClass={appState.windowWrapper.containerClass}>
                    {
                        appState.windowWrapper.element
                    }
                </WindowWrapper>
            }
            {
                appState.alertWindow &&
                <Alert text={appState.alertWindow.text} className={appState.alertWindow.className}/>
            }
        </div>
    );
}

export default App;

