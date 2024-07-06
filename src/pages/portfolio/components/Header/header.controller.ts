import {action, makeObservable} from "mobx";
import en from '../../../../../src/app/infra/dictionary/en.json'

export class HeaderController {
    isUpBtnShown = false
    nearestSection: typeof en.sections[keyof typeof en.sections] | undefined = en.sections.main

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
        for (let section of Object.values(en.sections)) {
            element = document.getElementById(section as any)
            if (!element) continue
            currentDistance = Math.abs(element.getBoundingClientRect().top)
            if (currentDistance < topDistance) {
                nearestElement = section as any
                topDistance = currentDistance
            }
        }
        this.setNearestSection(nearestElement as typeof this.nearestSection)
    }

    dispose() {
        document.removeEventListener('scroll', this.onWindowScroll)
    }

}