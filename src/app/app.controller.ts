import React from "react";
import {makeObservable, autorun, action} from "mobx";
import {Dictionary} from "./dictionary/dictionary";
import {Theme} from "./theme/theme";
import {Language} from "./language/language";
import {LocalStorage} from "./local-storage/local-storage";
import {Color} from "@fbltd/math";
import {request} from "../lib/network/request";
import {ServerService} from "../services/server.service";

import {NotificationQueue} from "./notification/notification-queue";

export type ILanguages = 'en' | 'ru'

type ILocalStorage = {
    theme: string,
    language: ILanguages
}

export class AppController {
    serverService = new ServerService(this);
    lang = new Language<ILanguages>(['ru', 'en'])
    theme = new Theme()
    dict = new Dictionary()
    ls = new LocalStorage<ILocalStorage>()

    isMobile = window.ontouchstart || window.navigator.userAgent.toLowerCase().includes('mobi')
    isServerAvailable = false
    resizeObserver: ResizeObserver | undefined
    appDomRect = document.body.getBoundingClientRect()
    windowContent: React.ReactNode | undefined = undefined
    notificationsQueue = new NotificationQueue()

    constructor() {
        makeObservable(this, {
            isServerAvailable: true,
            appDomRect: true,
            windowContent: true,

            setIsServerAvailable: action,
            setAppDomRect: action,
            setWindowContent: action,
        })

        this.init()
    }

    get dictionary() {
        return this.dict.actual
    }

    get isAppReady() {
        return !!this.appDomRect
    }

    setAppDomRect(appDomRect: DOMRect) {
        this.appDomRect = appDomRect
    }

    setWindowContent(content: typeof this.windowContent) {
        this.windowContent = content
    }

    setIsServerAvailable = (value: boolean) => {
        this.isServerAvailable = value
    }

    get d() {
        return this.dict[this.lang.currentLang]
    }

    async init() {
        this.initTheme()
        this.initLanguage()
        this.initServerAccessibility()
        this.subscribe()
    }

    subscribe() {
        autorun(() => this.applyTheme(this.theme.color))
        autorun(() => this.applyLanguage(this.lang.currentLang))

        this.resizeObserver = new ResizeObserver(this.onResize)
        this.resizeObserver.observe(document.body)
    }

    onResize = () => {
        this.setAppDomRect(document.body.getBoundingClientRect())
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

    async initServerAccessibility() {
        this.setIsServerAvailable(await this.serverService.isAvailable())
    }

    request: typeof request = (...[src, options]: Parameters<typeof request>) => {
        options = options || {}
        options.headers = options?.headers || {}
        options.headers.language = this.lang.currentLang
        return request(src, options)
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
