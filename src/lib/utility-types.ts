/**
 * Все поля объекта приводятся к ?: never, то есть их нельзя указать
 */
export type IRestrictedFields<T extends {}> = {
    [Key in keyof T]?: never
}

/**
 * ИЛИ двух типов, расширяющих объекты, с возможность обратиться к полям любого
 */
export type IRestrictedUnion<TFirst extends {}, TSecond extends {}> =
    (IRestrictedFields<TFirst> & TSecond) | (IRestrictedFields<TSecond> & TFirst)

/**
 * Либо полный первый тип объекта, либо полный второй тип объекта, либо оба полных типа
 */
export type IOneOrBothTypes<TFirst extends {}, TSecond extends {}> =
    IRestrictedUnion<TFirst, TSecond> | (TFirst & TSecond);

/**
 * Приведение объекта со строковыми ключами из вида "ключ:значение" к виду "Ключ:значение"
 */
export type ICapitalizeObject<T extends {}> = {
    [Key in keyof T as Key extends string ? Capitalize<Key> : Key]: T[Key]
}

/**
 * Приводимо к false
 */
export type IFalsable = false | undefined | null | '' | 0