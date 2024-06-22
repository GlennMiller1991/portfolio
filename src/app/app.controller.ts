import React from "react";
import {app, sections} from "./constants";
import {makeAutoObservable} from "mobx";
import {commonServerAPI} from "../common/api/commonServerAPI";
import {loginAPI} from "../common/api/loginAPI";

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