import React from "react";
import styles from './Footer.module.scss'
import {Socnet} from "./Socnet/Socnet";
import {SlSocialVkontakte, SlPhone} from "react-icons/sl";
import {SiGithub, SiTelegram, SiMaildotru, SiGooglemaps, SiWhatsapp} from "react-icons/si";
import {observer} from "mobx-react-lite";
import {useAppContext} from "@src/app/app.context";
import {Section} from "@src/pages/portfolio/components/sections/section";

export const Footer = observer(() => {
    const app = useAppContext();

    return (
        <Section>
            <div className={styles.container}>
                <div className={styles.socnetsContainer}>
                    <Socnet link={'https://vk.com/id39116637'} icon={SlSocialVkontakte}/>
                    <Socnet link={'https://github.com/GlennMiller1991'} icon={SiGithub}/>
                    <Socnet link={'https://t.me/alexandroBas'} icon={SiTelegram}/>
                    <Socnet link={'mailto:gatesoftommorow91@mail.ru'} icon={SiMaildotru}/>
                    <Socnet link={'tel:+79251811173'} icon={SlPhone}/>
                    <Socnet link={'https://goo.gl/maps/2EVKtNDF57FdoWiKA'} icon={SiGooglemaps}/>
                    <Socnet link={'https://wa.me/89251811173'} icon={SiWhatsapp}/>
                </div>
                <p className={styles.copyright}>
                    {
                        app.dictionary.footer.copyright
                    }
                </p>
            </div>
        </Section>
    )
})

