import React from "react";
import {action, makeAutoObservable, makeObservable} from "mobx";
import {commonServerAPI} from "../common/api/commonServerAPI";
import {loginAPI} from "../common/api/loginAPI";
import {Dictionary} from "./dictionary/dictionary";
import {ConicGradient} from "../lib/math/colors/conic.gradient";
import {Color} from "../lib/math/colors/color";

export class Theme extends ConicGradient {
    color: Color

    constructor() {
        super(
            {angle: 0, color: new Color(255, 0, 0)},
            {angle: 0.33, color: new Color(0, 255, 0)},
            {angle: 0.66, color: new Color(0, 0, 255)},
        );

        this.color = this.colors[0].color

        makeObservable(this, {
            color: true,
            switchColor: action,
        })
    }

    switchColor(color: typeof this.color) {
        this.color = color
    }

    get colorAngle() {
        return super.getAngleByColor(this.color)
    }
}

export class Lang {
    langs = ['ru', 'en'] as const
    currentLang: typeof this.langs[number] = 'ru'

    constructor() {
        makeObservable(this, {
            currentLang: true,
            switch: action,
        })
    }

    switch(lang: typeof this.currentLang) {
        this.currentLang = lang
    }
}

export class AppController {
    lang = new Lang()
    theme = new Theme()

    dictionary = new Dictionary()
    server = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://railwayapp-production-3c99.up.railway.app'

    get api() {
        return `${this.server}/api/v1`
    }

    isMobile = window.ontouchstart || window.navigator.userAgent.toLowerCase().includes('mobi')
    isServerAvailable = false
    resizeObserver: ResizeObserver | undefined
    appDomRect = document.body.getBoundingClientRect()
    isUserAuthenticated = false
    windowContent: React.ReactNode | undefined = undefined
    alertMessage: string | undefined = undefined

    get isAppReady() {
        return !!this.appDomRect
    }

    setAlertMessage(msg: typeof this.alertMessage) {
        this.alertMessage = msg
    }

    setWindowContent(content: typeof this.windowContent) {
        this.windowContent = content
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

    get d() {
        return this.dictionary[this.lang.currentLang]
    }

    constructor() {
        this.init()

        makeAutoObservable(this, {
            isServerAvailable: true,
            appDomRect: true,
            isUserAuthenticated: true,
            windowContent: true,
            alertMessage: true,
        })
    }

    async init() {

        setInterval(this.kickTheServer, 60000)
        await this.kickTheServer()
        this.isServerAvailable && this.authenticate()

        document.title = this.d.title

        this.resizeObserver = new ResizeObserver(this.onResize)
        this.resizeObserver.observe(document.body)
    }

    onResize = () => {
        this.setWindowWidth(document.body.getBoundingClientRect())
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