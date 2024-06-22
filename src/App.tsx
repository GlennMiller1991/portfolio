import React, {createContext, useContext, useState} from 'react';
import './index.css'

import {Header} from './components/Header/Header';
import {Main} from './components/Main/Main';
import {Skills} from './components/Skills/Skills';
import {Projects} from './components/Projects/Projects';
import {Contacts} from './components/Contacts/Contacts';
import {Up} from './components/Up/Up';
import {Footer} from './components/Footer/Footer';
import {WindowWrapper} from './common/components/WindowWrapper/WindowWrapper'
import {loginAPI} from './common/api/loginAPI'
import {Alert} from './common/components/Alert/Alert'
import {commonServerAPI} from "./common/api/commonServerAPI";
import {makeAutoObservable} from "mobx"
import {observer} from "mobx-react-lite";
import {app, sections} from "./app/constants";
import {Routes, Route} from "react-router-dom";
import {Login} from "./components/Login/Login";

export const AppContext = createContext<AppController>(null as any)
const useAppContext = () => {
    return useContext(AppContext)
}

export class AppController {
    isUpBtnShown = false
    isMobile = window.ontouchstart || window.navigator.userAgent.toLowerCase().includes('mobi')
    isServerAvailable = false
    resizeObserver: ResizeObserver | undefined
    appDomRect = document.body.getBoundingClientRect()
    isUserAuthenticated = false
    windowContent: React.ReactNode | undefined = undefined
    alertMessage: string | undefined = undefined
    nearestSection: keyof typeof sections | undefined = sections.main

    get isAppReady() {
        return !!this.appDomRect
    }

    setAlertMessage(msg: typeof this.alertMessage) {
        this.alertMessage = msg
    }

    setWindowContent(content: typeof this.windowContent) {
        this.windowContent = content
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

    setNearestSection(section: typeof this.nearestSection) {
        this.nearestSection = section
    }

    constructor() {
        this.init()

        makeAutoObservable(this, {
            isUpBtnShown: true,
            isServerAvailable: true,
            appDomRect: true,
            isUserAuthenticated: true,
            windowContent: true,
            alertMessage: true,
            nearestSection: true
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
        let topDistance = Infinity
        let currentDistance: number
        let element: HTMLElement | null
        let nearestElement: string | undefined = undefined
        for (let section of app.d.sections) {
            element = document.getElementById(section)
            if (!element) continue
            currentDistance = Math.abs(element.getBoundingClientRect().top)
            if (currentDistance < topDistance) {
                nearestElement = section
                topDistance = currentDistance
            }
        }
        this.setNearestSection(nearestElement as typeof this.nearestSection)
    }

    kickTheServer = async () => {
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

    authenticate = () => {
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

    if (!appController.isAppReady) return null
    return (
        <AppContext.Provider value={appController}>
            <div>
                <Routes>
                    <Route path={'/auth'} element={<Login/>}/>
                    <Route path={'/*'} element={<Portfolio/>}/>
                </Routes>
            </div>
            {
                appController.windowContent &&
                <WindowWrapper>
                    {
                        appController.windowContent
                    }
                </WindowWrapper>
            }
            {
                appController.alertMessage &&
                <Alert>
                    {
                        appController.alertMessage
                    }
                </Alert>
            }
        </AppContext.Provider>
    );
})


export const Portfolio: React.FC = observer(() => {
    const appController = useAppContext()
    return (
        <>
            <Header showUp={appController.isUpBtnShown}/>
            <Main/>
            <Skills/>
            <Projects/>
            <Contacts/>
            <Footer/>
            {
                appController.isUpBtnShown && <Up/>
            }
        </>
    )
})
