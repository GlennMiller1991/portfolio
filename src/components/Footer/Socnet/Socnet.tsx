import React from "react";
import styles from "./Socnet.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

type SocnetPropsType = {
    icon: any,
    link: string | undefined
}
export const Socnet: React.FC<SocnetPropsType> = React.memo((props) => {

    return (
        <div className={styles.icon}>
            <a href={props.link}>
                <FontAwesomeIcon icon={props.icon} size={'xs'}/>
            </a>
        </div>
    )
})