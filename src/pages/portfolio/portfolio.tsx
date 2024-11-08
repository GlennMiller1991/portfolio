import React from "react";
import {observer} from "mobx-react-lite";
import {Header} from "./components/Header/Header";
import {Main} from "./components/Main/Main";
import {Skills} from "./components/Skills/Skills";
import {Contacts} from "./components/Contacts/Contacts";
import {Projects} from "./components/Projects/Projects";
import {Footer} from "./components/Footer/Footer";
import {useAppContext} from "../../app/app.context";

export const Portfolio: React.FC = observer(() => {
    const app = useAppContext()

    return (
        <>
            <Header/>
            <Main/>
            <Skills/>
            <Projects/>
            {
                app.isServerAvailable &&
                <Contacts/>
            }
            <Footer/>
        </>
    )
})