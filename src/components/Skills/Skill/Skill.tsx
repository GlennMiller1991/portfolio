import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import styles from './Skill.module.scss'

type SkillPropsType = {
    name: string,
    icon: any,
    description: string,
}
export const Skill: React.FC<SkillPropsType> = React.memo((props) => {
    return (
        <div className={styles.skill}>
            <div className={styles.skillContainer}>
                <div className={styles.icon}>
                    <FontAwesomeIcon icon={props.icon}/>
                </div>
                <h3>{props.name}</h3>
                <p className={styles.description}>{props.description}</p>
            </div>
        </div>
    )
})