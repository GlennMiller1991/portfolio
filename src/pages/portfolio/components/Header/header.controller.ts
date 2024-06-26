import {app, sections} from "../../../../app/constants";
import {action, makeObservable} from "mobx";

export class HeaderController {
    isUpBtnShown = false
    nearestSection: keyof typeof sections | undefined = sections.main

    setIsUpBtnShown(value: typeof this.isUpBtnShown) {
        this.isUpBtnShown = value
    }

    setNearestSection(value: typeof this.nearestSection) {
        this.nearestSection = value
    }

    constructor() {
        makeObservable(this, {
            isUpBtnShown: true,
            setIsUpBtnShown: action,
            nearestSection: true,
            setNearestSection: action,
        })

        this.init()
    }

    private init() {
        document.addEventListener('scroll', this.onWindowScroll)

    }

    private onWindowScroll = () => {
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
        console.log(nearestElement)
        this.setNearestSection(nearestElement as typeof this.nearestSection)
    }

    dispose() {
        document.removeEventListener('scroll', this.onWindowScroll)
    }

}