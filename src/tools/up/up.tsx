import React, {useCallback} from "react";
import {FaChevronUp} from "react-icons/fa";
import {Caption} from "@src/common/components/app-settings/shared/choicer";
import styles from './up.module.scss';

export const Up = React.memo(() => {
    const scrollTo = useCallback(() => {
        const elem = document.getElementById('main')
        if (elem) {
            const yOffset = 85
            const y = elem.getBoundingClientRect().top - yOffset + window.pageYOffset
            window.scrollTo({top: y, behavior: 'smooth'})
        }
    }, [])
    return (
        <div onClick={scrollTo} className={styles.up}>
            <FaChevronUp/>
            <Caption>Up</Caption>
        </div>
        // <div className={styles.up} onClick={scrollTo}>
        // </div>
    )
})