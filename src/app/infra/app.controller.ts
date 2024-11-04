import React from "react";
import {makeObservable, autorun} from "mobx";
import {commonServerAPI} from "../../common/api/commonServerAPI";
import {Dictionary} from "./dictionary/dictionary";
import {Theme} from "./theme";
import {Language} from "./language";
import {LocalStorage} from "./local-storage";
import {Color} from "@fbltd/math";

export type ILanguages = 'en' | 'ru'

type ILocalStorage = {
    theme: string,
    language: ILanguages
}

export class AppController {
    lang = new Language<ILanguages>(['ru', 'en'])
    theme = new Theme()
    dict = new Dictionary()
    ls = new LocalStorage<ILocalStorage>()

    server = 'http://localhost:5000'


    isMobile = window.ontouchstart || window.navigator.userAgent.toLowerCase().includes('mobi')
    isServerAvailable = false
    resizeObserver: ResizeObserver | undefined
    appDomRect = document.body.getBoundingClientRect()
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

    get d() {
        return this.dict[this.lang.currentLang]
    }

    constructor() {
        this.init()

        makeObservable(this, {
            isServerAvailable: true,
            appDomRect: true,
            windowContent: true,
            alertMessage: true,
        })
    }

    init() {
        this.initTheme()
        this.initLanguage()
        this.subscribe()
    }

    subscribe() {
        autorun(() => this.applyTheme(this.theme.color))
        autorun(() => this.applyLanguage(this.lang.currentLang))

        this.resizeObserver = new ResizeObserver(this.onResize)
        this.resizeObserver.observe(document.body)

        setInterval(this.kickTheServer, 60000)
    }

    onResize = () => {
        this.setWindowWidth(document.body.getBoundingClientRect())
    }


    // region Language
    initLanguage() {
        let lang = this.ls.getItem('language') as ILanguages
        if (lang && this.lang.langs.find((l) => l === lang)) {
            this.lang.switch(lang)
        } else {
            lang = window.navigator.language as ILanguages
            lang = lang.includes('ru') ? 'ru' : 'en'
            this.lang.switch(lang)
        }
    }

    applyLanguage(lang: ILanguages) {
        this.ls.setItem('language', lang)
    }
    // endregion Language

    // region Theme
    initTheme() {
        const theme = this.ls.getItem('theme')
        if (!theme) return

        const color = rgbToColor(theme)
        if (!color || !this.theme.isColorInRange(color)) return
        this.theme.switchColor(color)
    }

    applyTheme(color: Color) {
        document.documentElement.style.setProperty('--color-theme', color.toString('rgba'))
        this.ls.setItem('theme', color.toString('rgba'))
    }
    // endregion Theme


    kickTheServer = async () => {
        const res = await commonServerAPI.serverAccess()
            .then(() => {
                return true
            })
            .catch((err) => {
                console.warn(err.message)
                return false
            })

        this.setIsServerAvailable(res)
    }


}

function rgbToColor(s: string) {
    let r: number
    let g: number
    let b: number
    let a: number

    const res = s.match(/^rgba\((\d*)\s*,\s*(\d*)\s*,\s*(\d*),\s*(\d*)\)$/)
    if (res) {
        r = +res[1]
        g = +res[2]
        b = +res[3]
        a = +res[4] * 255
        if (!isNaN(r) && !isNaN(g) && !isNaN(b) && !isNaN(a)) {
            return new Color(r, g, b, a)
        }
    }

}
