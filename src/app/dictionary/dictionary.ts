import en from './en.json'
import ru from './ru.json'

export class Dictionary {
    get ru(): typeof en {
        return ru
    }

    get en(): typeof en {
        return en
    }
}
