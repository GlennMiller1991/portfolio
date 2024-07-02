import React from "react";
import styles from './Footer.module.scss'
import commonStyles from "../../../../common/styles/common.module.scss";
import {Socnet} from "./Socnet/Socnet";
import {SlSocialVkontakte, SlPhone} from "react-icons/sl";
import {SiGithub, SiTelegram, SiMaildotru, SiGooglemaps, SiWhatsapp} from "react-icons/si";

export const Footer = React.memo(() => {

    return (
        <div className={styles.footer}>
            <div className={`${commonStyles.container} ${styles.container}`}>
                <div className={styles.socnetsContainer}>
                    <Socnet link={'https://vk.com/id39116637'} icon={SlSocialVkontakte}/>
                    <Socnet link={'https://github.com/GlennMiller1991'} icon={SiGithub}/>
                    <Socnet link={'https://t.me/alexandroBas'} icon={SiTelegram}/>
                    <Socnet link={'mailto:gatesoftommorow91@mail.ru'} icon={SiMaildotru}/>
                    <Socnet link={'tel:+79251811173'} icon={SlPhone}/>
                    <Socnet link={'https://goo.gl/maps/2EVKtNDF57FdoWiKA'} icon={SiGooglemaps}/>
                    <Socnet link={'https://wa.me/89150681485'} icon={SiWhatsapp}/>
                </div>
                <p className={styles.copyright}>
                    2024© React Developer Resume. Developed and Designed by Alexandr Basalov
                </p>
            </div>
        </div>
    )
})

