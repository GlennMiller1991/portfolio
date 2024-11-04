import React from "react";
import {observer} from "mobx-react-lite";
import {Header} from "./components/Header/Header";
import {Main} from "./components/Main/Main";
import {Skills} from "./components/Skills/Skills";
import {Contacts} from "./components/Contacts/Contacts";
import {Projects} from "./components/Projects/Projects";
import {Footer} from "./components/Footer/Footer";

export const Portfolio: React.FC = observer(() => {
    return (
        <>
            <Header/>
            <Main/>
            <Skills/>
            <Projects/>
            <Contacts/>
            <Footer/>
        </>
    )
})