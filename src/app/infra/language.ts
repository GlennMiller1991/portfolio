import {action, makeObservable} from "mobx";

export class Language<T extends string> {
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