import React from 'react'
import {setClasses} from '../../utils/setClasses'
import styles from './Input.module.scss'

type tInput = {
    name: string,
    asTextArea?: boolean,
    containerClass?: string,
    [key: string]: any
}
export const Input: React.FC<tInput> = React.memo(({
                                                       name,
                                                       asTextArea,
                                                       containerClass = '',
                                                       ...props
                                                   }) => {
    return (
        <div className={setClasses(styles.fieldContainer, containerClass)}>
            {
                asTextArea ?
                    <textarea className={setClasses(styles.input, styles.field, styles.textarea)}
                              {...props}
                    /> :
                    <input className={setClasses(styles.input, styles.field)}
                           {...props}
                    />
            }
            <div className={setClasses(styles.underField, props.value && styles.focusedDiv)}/>
            <div className={setClasses(styles.text, props.value && styles.focusedText)}>
                {name}
            </div>
        </div>
    )
})