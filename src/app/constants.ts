import {Dictionary} from "./dictionary/dictionary";
import {useMemo} from "react";
import {faJs} from "@fortawesome/free-brands-svg-icons/faJs";
import {faTextHeight} from "@fortawesome/free-solid-svg-icons/faTextHeight";
import {faFileCode, faProjectDiagram} from "@fortawesome/free-solid-svg-icons";
import {faCss3Alt} from "@fortawesome/free-brands-svg-icons/faCss3Alt";
import {faHtml5, faSass} from "@fortawesome/free-brands-svg-icons";
import {faPython} from "@fortawesome/free-brands-svg-icons/faPython";
import {faVials} from "@fortawesome/free-solid-svg-icons/faVials";
import {faGithubSquare} from "@fortawesome/free-brands-svg-icons/faGithubSquare";
import {faHighlighter} from "@fortawesome/free-solid-svg-icons/faHighlighter";
import {faEdit} from "@fortawesome/free-solid-svg-icons/faEdit";
import {faChartArea} from "@fortawesome/free-solid-svg-icons/faChartArea";
import {faDigitalTachograph} from "@fortawesome/free-solid-svg-icons/faDigitalTachograph";

export const d = new Dictionary()

export const app = {
    server: process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://railwayapp-production-3c99.up.railway.app',
    get api() {
        return `${this.server}/api/v1`
    },
    get d() {
        return d.actual
    },
}

export const skillsEntities = [
    {
        name: 'JavaScript',
        icon: faJs,
        description: 'Context, Closures, Event loop, Promises, Classes, Callbacks and more'
    },
    {
        name: 'TypeScript',
        icon: faTextHeight,
        description: 'Types, Interfaces, Generics, Extends, Enums, Mixins, Utility types and more'
    },
    {
        name: 'Thunk',
        icon: faFileCode,
        description: 'Redux Middleware'
    },
    {
        name: 'CSS3',
        icon: faCss3Alt,
        description: 'CSS Flex, CSS Grid, Responsive Layout, Media queries and more'
    },
    {
        name: 'SASS',
        icon: faSass,
        description: 'Imports, Mixins, Variables, Functions, Nesting and more'
    },
    {
        name: 'HTML',
        icon: faHtml5,
        description: 'Semantic Layout, БЭМ'
    },
    {
        name: 'Rest API',
        icon: faProjectDiagram,
        description: 'Restful API, Axios, Fetch, Error Handling and more'
    },
    {
        name: 'Python v3.6.x',
        icon: faPython,
        description: 'SQLAlchemy, Flask and more'
    },
    {
        name: 'Unit test',
        icon: faVials,
        description: 'TDD, StoryBook, Jest'
    },
    {
        name: 'Git',
        icon: faGithubSquare,
        description: ''
    },
    {
        name: 'Material UI',
        icon: faHighlighter,
        description: ''
    },
    {
        name: 'Ant Design',
        icon: faEdit,
        description: ''
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

export const sections = {
    main: 'main',
    skills: 'skills',
    contacts: 'contacts',
    projects: 'projects'
} as const
