import React from "react";

import styles from './Skill.module.scss'
import {IconType} from "react-icons";

type SkillPropsType = {
    name: string,
    icon: IconType,
    description: string,
}
export const Skill: React.FC<SkillPropsType> = React.memo((props) => {
    return (
        <div className={styles.skill}>
            <div className={styles.skillContainer}>
                <div className={styles.icon}>
                    {
                        React.createElement(props.icon)
                    }
                </div>
                <h3>{props.name}</h3>
                <p className={styles.description}>{props.description}</p>
            </div>
        </div>
    )
})