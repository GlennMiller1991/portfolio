import {Dictionary} from "./dictionary/dictionary";
import {TbPlugConnectedX, TbMathSymbols} from "react-icons/tb";
import {
    SiPostgresql,
    SiNodedotjs,
    SiSoundcharts,
    SiBootstrap,
    SiGithub,
    SiMinetest,
    SiPython,
    SiServerless,
    SiHtml5,
    SiTypescript,
    SiJavascript,
    SiRedux,
    SiStylelint
} from "react-icons/si";

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
        icon: SiJavascript,
        description: 'Context, Closures, Event loop, Promises, Classes, Callbacks and more'
    },
    {
        name: 'TypeScript',
        icon: SiTypescript,
        description: 'Types, Interfaces, Generics, Extends, Enums, Mixins, Utility types and more'
    },
    {
        name: 'State management',
        icon: SiRedux,
        description: 'Redux, Mobx, self-writing'
    },
    {
        name: 'Styling',
        icon: SiStylelint,
        description: 'CSS, SASS, SCSS, Responsive Layout, Media queries and more'
    },
    {
        name: 'HTML',
        icon: SiHtml5,
        description: 'Semantic Layout, БЭМ'
    },
    {
        name: 'Requests',
        icon: SiServerless,
        description: 'GraphQL, Restful API, Axios, Fetch, Error Handling and more'
    },
    {
        name: 'Python v3.6.x',
        icon: SiPython,
        description: 'SQLAlchemy, Flask and more'
    },
    {
        name: 'Backend',
        icon: SiNodedotjs,
        description: 'NextJS, NestJS, NodeJS'
    },
    {
        name: 'SQL',
        icon: SiPostgresql,
        description: 'Postgres',
    },
    {
        name: 'Math',
        icon: SiPython,
        description: 'Linear algebra, analytic geometry, 2D, 3D'
    },
    {
        name: 'Testing',
        icon: SiMinetest,
        description: 'TDD, StoryBook, Jest, React-Testing-Library'
    },
    {
        name: 'Git',
        icon: SiGithub,
        description: ''
    },
    {
        name: 'Styling Libraries',
        icon: SiBootstrap,
        description: 'Ant Design, TailwindCSS, MaterialUI, Bootstrap'
    },
    {
        name: 'Data Viz',
        icon: SiSoundcharts,
        description: 'SVG, Canvas, Charts, Maps, D3 and more'
    },
    {
        name: 'Other API',
        icon: TbPlugConnectedX,
        description: 'VK API, 2GIS API and more'
    }

]

export const sections = {
    main: 'main',
    skills: 'skills',
    contacts: 'contacts',
    projects: 'projects'
} as const
