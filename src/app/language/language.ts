import {action, makeObservable} from "mobx";
import {ILanguages} from "../app.controller";

export class Language<T extends string = ILanguages> {
    currentLang: T

    constructor(public langs: Array<T>, initial?: T) {
        makeObservable(this, {
            currentLang: true,
            switch: action,
        })
        this.currentLang = initial || langs[0]
    }

    switch(lang: T) {
        this.currentLang = lang
    }
}