import React from "react";
import styles from './Footer.module.scss'
import commonStyles from "../../common/styles/common.module.scss";
import {Socnet} from "./Socnet/Socnet";
import {IoLogoJavascript} from "react-icons/io5";

export const Footer = React.memo(() => {

    return (
        <div className={styles.footer}>
            <div className={`${commonStyles.container} ${styles.container}`}>
                <div className={styles.socnetsContainer}>
                    <Socnet link={'https://vk.com/id39116637'} icon={IoLogoJavascript}/>
                    <Socnet link={'https://github.com/GlennMiller1991'} icon={IoLogoJavascript}/>
                    <Socnet link={'https://t.me/alexandroBas'} icon={IoLogoJavascript}/>
                    <Socnet link={'mailto:gatesoftommorow91@mail.ru'} icon={IoLogoJavascript}/>
                    <Socnet link={'tel:+79251811173'} icon={IoLogoJavascript}/>
                    <Socnet link={'https://goo.gl/maps/2EVKtNDF57FdoWiKA'} icon={IoLogoJavascript}/>
                    <Socnet link={'https://wa.me/89150681485'} icon={IoLogoJavascript}/>
                </div>
                <p className={styles.copyright}>
                    2021© React Developer Resume. Developed and Designed by Alexandr Basalov
                </p>
            </div>
        </div>
    )
})

