import React from "react";
import {observer} from "mobx-react-lite";
import {Header} from "./components/Header/Header";
import {Main} from "./components/Main/Main";
import {Skills} from "./components/Skills/Skills";
import {Contacts} from "./components/Contacts/Contacts";
import {Projects} from "./components/Projects/Projects";
import {Footer} from "./components/Footer/Footer";
import {Up} from "./components/Up/Up";
import {useAppContext} from "../../app/app.context";

export const Portfolio: React.FC = observer(() => {
    const appController = useAppContext()
    return (
        <>
            <Header showUp={appController.isUpBtnShown}/>
            <Main/>
            <Skills/>
            <Projects/>
            <Contacts/>
            <Footer/>
            {
                appController.isUpBtnShown && <Up/>
            }
        </>
    )
})