import React, {useMemo} from "react";
import styles from './Projects.module.scss'
import {Project} from "./Project/Project";
import portfolioPic from './../../../../assets/pic/portfolio.png'
import bookPic from './../../../../assets/pic/book.png'
import socnet from './../../../../assets/pic/socnet.png'
import testJob from './../../../../assets/pic/testJob.png'
import pythonPortfolio from './../../../../assets/pic/pythonPortfolio.webp'
import map from './../../../../assets/pic/map.webp'
import graph from './../../../../assets/pic/graph.webp'
import en from '../../../../app/dictionary/en.json'
import {useAppContext} from "@src/app/app.context";
import {observer} from "mobx-react-lite";
import {Section} from "@src/pages/portfolio/components/sections/section";

export const Projects = observer(() => {
    const projectEntities = useMemo(() => {
        return [
            {
                title: 'TypeScript Portfolio',
                style: {backgroundImage: `url(${portfolioPic})`},
                link: 'https://github.com/GlennMiller1991/portfolio',
                tags: [
                    'TypeScript', 'MobX', 'SCSS', 'HTML', 'CSS3', 'Hooks'
                ],
            },
            {
                title: 'Looking for Book',
                style: {backgroundImage: `url(${bookPic})`},
                link: 'https://glennmiller1991.github.io/looking_for_book/#/',
                tags: [
                    'TypeScript', 'HTML', 'Redux', 'CSS3', 'Google Books API', 'Thunk', 'Hooks'
                ]
            },
            {
                title: 'Python Blog',
                style: {backgroundImage: `url(${pythonPortfolio})`},
                link: 'https://github.com/GlennMiller1991/PythonPortfolio',
                tags: [
                    'Python', 'JavaScript', 'Flask', 'HTML', 'CSS3', 'SQLAlchemy', 'MySQL',
                ]
            },
            {
                title: 'Social Network',
                style: {backgroundImage: `url(${socnet})`},
                link: 'https://glennmiller1991.github.io/social_network/#/',
                tags: [
                    'TypeScript', 'Redux', 'HTML', 'CSS3', 'Hooks', 'Thunk', 'StoryBook', 'VK Open API', 'REST API',
                ]
            },
            {
                title: 'Test Job',
                style: {backgroundImage: `url(${testJob})`},
                link: 'https://glennmiller1991.github.io/test_job/#/',
                tags: [
                    'TypeScript', 'Redux', 'HTML', 'CSS3', 'Hooks'
                ]
            },
            {
                title: 'Map Object Management',
                style: {backgroundImage: `url(${map})`},
                link: 'https://glennmiller1991.github.io/map/',
                tags: [
                    'TypeScript, JavaScript, HTML, SCSS, Hooks, 2GIS API',
                ]
            },
            {
                title: 'Graph Builder',
                style: {backgroundImage: `url(${graph})`},
                link: "https://GlennMiller1991.github.io/graph",
                tags: [
                    'TypeScript, JavaScript, HTML, SCSS, Hooks, SVG'
                ]
            }
        ]
    }, [])
    const app = useAppContext();
    return (
        <Section header={app.dictionary.sections.projects}
                 containerClassName={styles.projects}
                 id={en.sections.projects}>
            <div className={styles.projectsContainer}>
                {
                    projectEntities.map((project, id) => {
                        return <Project key={id} {...project}/>
                    })
                }
            </div>
        </Section>
    )
})