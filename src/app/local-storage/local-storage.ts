export class LocalStorage<T extends Record<string, any> = {}> {
    isForbidden: boolean = false

    getItem<TKey extends keyof T>(key: TKey) {
        if (this.isForbidden) return undefined
        try {
            const s = localStorage.getItem(key as string)
            if (s) {
                try {
                    return JSON.parse(s) as T[TKey]
                } catch (err) {
                }
            }
        } catch (err) {
            this.isForbidden = true
        }

        return undefined
    }

    setItem(key: keyof T, value: T[typeof key]) {
        if (this.isForbidden) return undefined
        try {
            localStorage.setItem(key as string, JSON.stringify(value))
        } catch (err) {
            this.isForbidden = true
        }
        return undefined
    }


}