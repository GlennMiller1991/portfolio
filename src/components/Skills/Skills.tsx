import React, {useMemo} from "react";
import styles from './Skills.module.scss'
import commonStyles from '../../common/styles/common.module.scss'
import {Skill} from "./Skill/Skill";
import {faJs} from "@fortawesome/free-brands-svg-icons/faJs";
import {faFileCode, faProjectDiagram} from "@fortawesome/free-solid-svg-icons";
import {faCss3Alt} from "@fortawesome/free-brands-svg-icons/faCss3Alt";
import {faHtml5, faSass} from "@fortawesome/free-brands-svg-icons";
import {faVials} from "@fortawesome/free-solid-svg-icons/faVials";
import {faGithubSquare} from "@fortawesome/free-brands-svg-icons/faGithubSquare";
import {faHighlighter} from "@fortawesome/free-solid-svg-icons/faHighlighter";
import {faEdit} from "@fortawesome/free-solid-svg-icons/faEdit";
import {faTextHeight} from "@fortawesome/free-solid-svg-icons/faTextHeight";
import {faPython} from "@fortawesome/free-brands-svg-icons/faPython";
import {faChartArea} from "@fortawesome/free-solid-svg-icons/faChartArea";
import {faDigitalTachograph} from "@fortawesome/free-solid-svg-icons/faDigitalTachograph";


export const Skills = React.memo(() => {
    const skillsEntities = useMemo(() => {
        return [
            {
                name:'JavaScript',
                icon:faJs,
                description:'Context, Closures, Event loop, Promises, Classes, Callbacks and more'
            },
            {
                name:'TypeScript',
                icon:faTextHeight,
                description:'Types, Interfaces, Generics, Extends, Enums, Mixins, Utility types and more'},
            {
                name:'Thunk',
                icon:faFileCode,
                description:'Redux Middleware'},
            {
                name:'CSS3',
                icon:faCss3Alt,
                description:'CSS Flex, CSS Grid, Responsive Layout, Media queries and more'},
            {
                name:'SASS',
                icon:faSass,
                description:'Imports, Mixins, Variables, Functions, Nesting and more'},
            {
                name:'HTML',
                icon:faHtml5,
                description:'Semantic Layout, БЭМ'},
            {
                name:'Rest API',
                icon:faProjectDiagram,
                description:'Restful API, Axios, Fetch, Error Handling and more'},
            {
                name:'Python v3.6.x',
                icon:faPython,
                description:'SQLAlchemy, Flask and more'
            },
            {
                name:'Unit test',
                icon:faVials,
                description:'TDD, StoryBook, Jest'},
            {
                name:'Git',
                icon:faGithubSquare,
                description:''},
            {
                name:'Material UI',
                icon:faHighlighter,
                description:''
            },
            {
                name:'Ant Design',
                icon:faEdit,
                description:''
            },
            {
                name: 'Data Viz',
                icon: faChartArea,
                description: 'SVG, D3'
            },
            {
                name: 'Other API',
                icon: faDigitalTachograph,
                description: 'VK API, 2GIS API'
            }

        ]
    }, [])
    return (
        <div id={'skills'} className={styles.skills}>
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