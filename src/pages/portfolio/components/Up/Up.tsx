import React, {useCallback} from "react";
import styles from './Up.module.scss';
import {FaChevronUp} from "react-icons/fa";

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
        <div className={styles.up} onClick={scrollTo}>
            <FaChevronUp/>
        </div>
    )
})