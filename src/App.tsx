import React, {useCallback, useEffect, useMemo, useState} from 'react';
import './App.css';
import './common/styles/variables.css'

import {Header} from './components/Header/Header';
import {Main} from './components/Main/Main';
import {Skills} from './components/Skills/Skills';
import {Projects} from './components/Projects/Projects';
import {Contacts} from './components/Contacts/Contacts';
import {Up} from './components/Up/Up';
import {Footer} from './components/Footer/Footer';
import {anchorType, checkAnchorTC} from './redux/reducer';
import {useDispatch, useSelector} from 'react-redux';
import {stateType} from './redux/store';
import {appUpdateState, tAppState} from './redux/appReducer/appReducer';
import {WindowWrapper} from './components/WindowWrapper/WindowWrapper'
import {loginAPI} from './common/api/loginAPI'

function App() {
    const currentAnchor = useSelector<stateType, anchorType>(state => state.state.currentAnchor)
    const appState = useSelector<stateType, tAppState>(state => state.appState)
    const dispatch = useDispatch()
    const [scrollY, setScrollY] = useState(0)
    const [elements, setElements] = useState<HTMLDivElement[]>([])
    const anchorsId: anchorType[] = useMemo(() => {
        return ['main', 'skills', 'contacts', 'projects']
    }, [])
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
        document.title = 'React developer'
        const elements = []
        for (let i = 0; i < anchorsId.length; i++) {
            const elem = document.getElementById(anchorsId[i])
            if (elem) {
                elements.push(elem)
            }
        }
        window.addEventListener('scroll', onScrollWindow)
        setElements(elements as HTMLDivElement[])

        const observer = new ResizeObserver(() => {
            const element = document.getElementById('app')
            if (element) {
                dispatch(appUpdateState({
                    appWidth: element.getBoundingClientRect().width
                }))
            }
        })

        const element = document.getElementById('app')
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
        <div id={'app'}>
            <Header showUp={showUp}/>
            <Main/>
            <Skills/>
            <Projects/>
            <Contacts/>
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
        </div>
    );
}

export default App;

