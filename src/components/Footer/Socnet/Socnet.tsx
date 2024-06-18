import React from "react";
import styles from "./Socnet.module.scss";
import {IoLogoJavascript} from "react-icons/io5";

type SocnetPropsType = {
    icon: any,
    link: string | undefined
}
export const Socnet: React.FC<SocnetPropsType> = React.memo((props) => {

    return (
        <div className={styles.icon}>
            <a href={props.link}>
                {
                    React.createElement(IoLogoJavascript)
                }
            </a>
        </div>
    )
})