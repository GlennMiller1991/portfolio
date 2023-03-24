import React, {useEffect, useMemo, useState} from "react";
import styles from './Header.module.scss'
import {Nava} from "./Nava/Nava";
import variables from './../../common/styles/Variables.module.scss'

type HeaderPropsType = {
    showUp: boolean
}
export const Header: React.FC<HeaderPropsType> = React.memo((props) => {
        const [showUp, setShowUp] = useState(props.showUp)
        const style = useMemo(() => {
            return showUp ? {backgroundColor: variables.mainColor} : {}
        }, [showUp])

        useEffect(() => {
            setShowUp(props.showUp)
        }, [props.showUp])
        return (
            <div id={'header'} className={styles.header} style={style}>
                <Nava/>
            </div>
        )
    }
)
