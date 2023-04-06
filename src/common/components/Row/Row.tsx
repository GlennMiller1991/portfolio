import React from 'react'
import styles from './Row.module.scss'
import {setClasses} from "../../utils/setClasses";

type tRow = {
    children: React.ReactNode
    withWrap?: boolean,
}
export const Row: React.FC<tRow> = React.memo(({
    children,
    withWrap,
                                         }) => {
    return (
        <div className={setClasses(
            'flexCenter',
            styles.row,
            withWrap && styles.wrap,
            )}>
            {
                children
            }
        </div>
    )
})