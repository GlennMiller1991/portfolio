import React from "react";
import styles from './Footer.module.scss'
import {faVk, faGit, faTelegram, faWhatsapp} from "@fortawesome/free-brands-svg-icons";
import {faAt, faMapMarked, faPhone} from "@fortawesome/free-solid-svg-icons";
import commonStyles from "../../common/styles/CommonStyles.module.scss";
import {Socnet} from "./Socnet/Socnet";

export const Footer = React.memo(() => {

    return (
        <div className={styles.footer}>
            <div className={`${commonStyles.container} ${styles.container}`}>
                <div className={styles.socnetsContainer}>
                    <Socnet link={'https://vk.com/id39116637'} icon={faVk}/>
                    <Socnet link={'https://github.com/GlennMiller1991'} icon={faGit}/>
                    <Socnet link={'https://t.me/alexandroBas'} icon={faTelegram}/>
                    <Socnet link={'mailto:gatesoftommorow91@mail.ru'} icon={faAt}/>
                    <Socnet link={'tel:+79251811173'} icon={faPhone}/>
                    <Socnet link={'https://goo.gl/maps/2EVKtNDF57FdoWiKA'} icon={faMapMarked}/>
                    <Socnet link={'https://wa.me/89150681485'} icon={faWhatsapp}/>
                </div>
                <p className={styles.copyright}>
                    2021© React Developer Resume. Developed and Designed by Alexandr Basalov
                </p>
            </div>
        </div>
    )
})

