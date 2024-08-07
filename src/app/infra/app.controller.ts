import React from "react";
import {makeAutoObservable} from "mobx";
import {commonServerAPI} from "../../common/api/commonServerAPI";
import {loginAPI} from "../../common/api/loginAPI";
import {Dictionary} from "./dictionary/dictionary";
import {Theme} from "./theme";
import {Language} from "./language";
import {LocalStorage} from "./local-storage";
import {Color} from "../../lib/math/colors/color";

type ILanguages = 'en' | 'ru'

type ILocalStorage = {
    theme: string,
    language: ILanguages
}

export class AppController {
    lang = new Language<ILanguages>(['ru', 'en'])
    theme = new Theme()
    dict = new Dictionary()
    ls = new LocalStorage<ILocalStorage>()

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
        return this.dict[this.lang.currentLang]
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
        this.initTheme()
        this.initLanguage()

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


    initLanguage() {
        let lang = this.ls.getItem('language') as ILanguages
        if (lang && this.lang.langs.find((l) => l === lang)) {
            this.setLanguage(lang)
        } else {
            lang = window.navigator.language as ILanguages
            lang = lang.includes('ru') ? 'ru' : 'en'
            this.setLanguage('ru')
        }
    }

    setLanguage(lang: ILanguages) {
        this.lang.switch(lang)
        this.ls.setItem('language', lang)
    }

    initTheme() {
        const theme = this.ls.getItem('theme')
        if (!theme) {
            this.setTheme(this.theme.color)
        } else {
            const color = rgbToColor(theme)
            if (color && this.theme.isColorInRange(color)) {
                this.setTheme(color)
            } else {
                this.setTheme(this.theme.color)
            }
        }
    }

    setTheme(color: Color) {
        this.theme.switchColor(color)
        document.documentElement.style.setProperty('--color-theme', color.toCSS())
        this.ls.setItem('theme', color.toCSS())
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

function rgbToColor(s: string) {
    let r: number
    let g: number
    let b: number

    const res = s.match(/^rgb\((\d*)\s*,\s*(\d*)\s*,\s*(\d*)\)$/)
    if (res) {
        r = +res[1]
        g = +res[2]
        b = +res[3]
        if (!isNaN(r) && !isNaN(g) && !isNaN(b)) {
            return new Color(r, g, b)
        }
    }

}
