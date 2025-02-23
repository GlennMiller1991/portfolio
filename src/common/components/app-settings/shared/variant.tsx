import React from "react";
import {observer} from "mobx-react-lite";
import {setClasses} from "../../../../lib/common/set-classes";
import styles from "../settings.module.scss";
import {s} from "../../../../app/constants";
import {IPoint2} from "@fbltd/math";

type IVariant = {
    center: IPoint2,
    text: string,
    isChosen: boolean,
    onChoose(): void,
}
export const Variant: React.FC<IVariant> = observer(({
                                                         center,
                                                         text,
                                                         isChosen,
                                                         onChoose,
                                                     }) => {

    return (
        <span className={setClasses(
            s.transformToCenter,
            s.abs,
            s.pointer,
            s.transition,
            s.maxContent,
            styles.variant,
            isChosen && styles.chosenVariant)}
             onClick={onChoose}
             style={{
                 left: center[0],
                 top: center[1]
             }}>
            {
                text
            }
        </span>
    )
})