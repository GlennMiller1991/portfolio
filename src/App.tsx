import React, {createContext, useState} from 'react';
import './index.css'

import {Header} from './components/Header/Header';
import {Main} from './components/Main/Main';
import {Skills} from './components/Skills/Skills';
import {Projects} from './components/Projects/Projects';
import {Contacts} from './components/Contacts/Contacts';
import {Up} from './components/Up/Up';
import {Footer} from './components/Footer/Footer';
import {useSelector} from 'react-redux';
import {stateType} from './redux/store';
import {
    tAppState
} from './redux/appReducer/appReducer';
import {WindowWrapper} from './common/components/WindowWrapper/WindowWrapper'
import {loginAPI} from './common/api/loginAPI'
import {Alert} from './common/components/Alert/Alert'
import {commonServerAPI} from "./common/api/commonServerAPI";
import {makeAutoObservable} from "mobx"
import {observer} from "mobx-react-lite";
import {app} from "./app/constants";

export const WindowViewContext = createContext<AppController>(null as any)

export class AppController {
    isUpBtnShown = false
    isMobile = window.ontouchstart || window.navigator.userAgent.toLowerCase().includes('mobi')
    isServerAvailable = false
    resizeObserver: ResizeObserver | undefined
    appDomRect = document.body.getBoundingClientRect()
    isUserAuthenticated = false

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

    setIsAuthenticated(value: boolean) {
        this.isUserAuthenticated = value
    }

    constructor() {
        this.init()

        makeAutoObservable(this, {
            isUpBtnShown: true,
            isServerAvailable: true,
            appDomRect: true,
            isUserAuthenticated: true
        })
    }

    async init() {
        document.addEventListener('scroll', this.onWindowScroll)

        setInterval(this.kickTheServer, 60000)
        await this.kickTheServer()
        this.isServerAvailable && this.authenticate()

        document.title = app.d.title


        this.resizeObserver = new ResizeObserver(this.onResize)
        this.resizeObserver.observe(document.body)
    }

    onResize = () => {
        this.setWindowWidth(document.body.getBoundingClientRect())
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

    authenticate() {
        loginAPI.authenticate()
            .then(() => {
                this.setIsAuthenticated(true)
            })
            .catch(err => {
                this.setIsAuthenticated(false)
            })
    }

    dispose() {
        // App will disappear from browser so there is no need to clear state or smth else
    }

}

export const App = observer(() => {
    const [appController] = useState(() => new AppController())

    const appState = useSelector<stateType, tAppState>(state => state.appState)

    if (!appController.isAppReady) return null
    return (
        <WindowViewContext.Provider value={appController}>
            <div>
                <Header showUp={appController.isUpBtnShown}/>
                <Main/>
                <Skills/>
                <Projects/>
                {
                    appController.isServerAvailable &&
                    <Contacts/>
                }
                <Footer/>
                {
                    appController.isUpBtnShown && <Up/>
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
