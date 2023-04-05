import React from 'react'
import styles from './Button.module.scss'

type tButton = {
    text: string,
    [key: string]: any,
}
export const Button: React.FC<tButton> = React.memo(({
                                                         text,
                                                         ...props
                                                     }) => {
    return (
        <button className={styles.submitBtn} {...props}>
            {
                text
            }
        </button>
    )
})