export class Color {
    constructor(public red: number, public green: number, public blue: number) {
        this.red = Math.max(Math.min(red, 255), 0)
        this.green = Math.max(Math.min(green, 255), 0)
        this.blue = Math.max(Math.min(blue, 255), 0)
    }

    toCSS() {
        return `rgb(${this.red}, ${this.green}, ${this.blue})`
    }
}