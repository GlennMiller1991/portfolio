import React from "react";
import styles from './Skills.module.scss'
import {Skill} from "./Skill/Skill";
import { skillsEntities} from "@src/app/constants";
import en from '../../../../app/dictionary/en.json'
import {Section} from "@src/pages/portfolio/components/Contacts/Contacts";
import {useAppContext} from "@src/app/app.context";
import {observer} from "mobx-react-lite";

export const Skills = observer(() => {
    const app = useAppContext();

    return (
        <Section id={en.sections.skills}
                 header={app.dictionary.sections.skills}
                 containerClassName={styles.skills}>
            <div className={styles.skillsContainer}>
                {
                    skillsEntities.map((skill, id) => {
                        return <Skill key={id} {...skill}/>
                    })
                }
            </div>
        </Section>
    )
})