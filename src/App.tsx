import React, {createContext, useEffect, useState} from 'react';
import './index.css'

import {Header} from './components/Header/Header';
import {Main} from './components/Main/Main';
import {Skills} from './components/Skills/Skills';
import {Projects} from './components/Projects/Projects';
import {Contacts} from './components/Contacts/Contacts';
import {Up} from './components/Up/Up';
import {Footer} from './components/Footer/Footer';
import {useSelector} from 'react-redux';
import {stateType, useAppDispatch} from './redux/store';
import {
    appUpdateState,
    tAppState
} from './redux/appReducer/appReducer';
import {WindowWrapper} from './common/components/WindowWrapper/WindowWrapper'
import {loginAPI} from './common/api/loginAPI'
import {appContainer, pageTitle} from './common/constants/ids';
import {Alert} from './common/components/Alert/Alert'
import {commonServerAPI} from "./common/api/commonServerAPI";
import {makeAutoObservable} from "mobx"
import {observer} from "mobx-react-lite";

export const WindowViewContext = createContext<AppController>(null as any)

export class AppController {
    isUpBtnShown = false
    isMobile = window.ontouchstart || window.navigator.userAgent.toLowerCase().includes('mobi')
    isServerAvailable = false
    resizeObserver: ResizeObserver | undefined
    appDomRect!: DOMRect

    get isAppReady() {
        return !!this.appDomRect
    }

    setIsUpBtnShown = (value: boolean) => {
        this.isUpBtnShown = value
    }

    setIsServerAvailable = (value: boolean) => {
        this.isServerAvailable = value
    }

    setWindowWidth = (rect: DOMRect) => {
        this.appDomRect = rect
    }

    constructor() {
        this.init()

        makeAutoObservable(this, {
            isUpBtnShown: true,
            isServerAvailable: true,
            appDomRect: true
        })
    }

    init() {
        document.addEventListener('scroll', this.onWindowScroll)

        setInterval(this.kickTheServer, 60000)
        this.kickTheServer()

        document.title = pageTitle


        const body = document.querySelector('body')
        if (body) {
            this.resizeObserver = new ResizeObserver(() => {
                this.setWindowWidth(body.getBoundingClientRect())
            })

            this.resizeObserver.observe(body)
        }
    }

    onWindowScroll = () => {
        const header = document.getElementById('header')
        if (!header) return

        const currentY = document.documentElement.scrollTop
        const headerHeight = header.offsetHeight
        this.setIsUpBtnShown(currentY > headerHeight)
    }

    async kickTheServer() {
        const res = await commonServerAPI.serverAccess()
            .then((res) => {
                return true
            })
            .catch((err) => {
                console.warn(err.message)
                return false
            })

        this.setIsServerAvailable(res)
    }

    dispose() {
        document.removeEventListener('scroll', this.onWindowScroll)
        this.resizeObserver?.disconnect()
    }

}

export const App = observer(() => {
    const [viewController] = useState(() => new AppController())

    const appState = useSelector<stateType, tAppState>(state => state.appState)
    const dispatch = useAppDispatch()

    //get elements and add event listener
    useEffect(() => {
        loginAPI.authenticate()
            .then(() => {
                dispatch(appUpdateState({authenticated: true}))
            })
            .catch(err => {
                console.log(err.message)
            })

        return viewController.dispose.bind(viewController)
    }, [])

    if (!viewController.isAppReady) return null
    return (
        <WindowViewContext.Provider value={viewController}>
            <div id={appContainer}>
                <Header showUp={viewController.isUpBtnShown}/>
                <Main/>
                <Skills/>
                <Projects/>
                {
                    viewController.isServerAvailable &&
                    <Contacts/>
                }
                <Footer/>
                {
                    viewController.isUpBtnShown && <Up/>
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
        </WindowViewContext.Provider>
    );
})
