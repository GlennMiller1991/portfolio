import React, {createContext, useContext, useEffect, useState} from 'react';
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
import {makeAutoObservable} from "mobx"
import {observer} from "mobx-react-lite";

export const WindowViewContext = createContext<WindowViewController>(null as any)
export class WindowViewController {
    isUpBtnShown = false
    isMobile = window.ontouchstart || window.navigator.userAgent.toLowerCase().includes('mobi')

    setIsUpBtnShown = (value: boolean) => {
        this.isUpBtnShown = value
    }

    constructor() {
        this.init()

        makeAutoObservable(this, {
            isUpBtnShown: true
        })
    }

    init() {
        document.addEventListener('scroll', this.onWindowScroll)
    }

    onWindowScroll = () => {
        const header = document.getElementById('header')
        if (!header) return

        const currentY = document.documentElement.scrollTop
        const headerHeight = header.offsetHeight
        this.setIsUpBtnShown(currentY > headerHeight)
    }

    dispose() {
        document.removeEventListener('scroll', this.onWindowScroll)
    }

}

export const App = observer(() => {
    const [viewController] = useState(() => new WindowViewController())

    const appState = useSelector<stateType, tAppState>(state => state.appState)
    const dispatch = useAppDispatch()
    const [elements, setElements] = useState<HTMLDivElement[]>([])
    const serverIsAvailable = useSelector<stateType, boolean>(state => state.appState.serverIsAvailable)

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


        document.title = pageTitle
        const elements = []
        for (let i = 0; i < app.d.sections.length; i++) {
            const elem = document.getElementById(app.d.sections[i])
            if (elem) {
                elements.push(elem)
            }
        }
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
            viewController.dispose()
        }
    }, [])

    return (
        <WindowViewContext.Provider value={viewController}>
            <div id={appContainer}>
                <Header showUp={viewController.isUpBtnShown}/>
                <Main/>
                <Skills/>
                <Projects/>
                {
                    serverIsAvailable &&
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
