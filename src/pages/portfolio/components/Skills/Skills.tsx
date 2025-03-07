import React from "react";
import styles from './Skills.module.scss'
import commonStyles from '../../../../common/styles/common.module.scss'
import {Skill} from "./Skill/Skill";
import { skillsEntities} from "../../../../app/constants";
import en from '../../../../app/dictionary/en.json'

export const Skills = React.memo(() => {
    return (
        <div id={en.sections.skills} className={styles.skills}>
            <div className={`${commonStyles.container} ${styles.container}`}>
                <h2 className={commonStyles.title}>
                    <span className={commonStyles.upperThenHeader}>EXPERIENCE</span>
                    EXPERIENCE
                </h2>
                <div className={styles.skillsContainer}>
                    {
                        skillsEntities.map((skill, id) => {
                            return <Skill key={id} {...skill}/>
                        })
                    }
                </div>
            </div>
        </div>
    )
})