import {action, makeObservable} from "mobx";

export class Language {
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