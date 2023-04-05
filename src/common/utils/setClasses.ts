export const setClasses = (...classes: any[]) => {
    let res = ''
    for (let c of classes) {
        if (c) res += ` ${c}`
    }
    return res
}