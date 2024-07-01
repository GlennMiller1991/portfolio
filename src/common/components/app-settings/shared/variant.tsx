import React from "react";
import {observer} from "mobx-react-lite";
import {setClasses} from "../../../utils/setClasses";
import sharedStyles from "../../../styles/common.module.scss";
import styles from "../settings.module.scss";
import {IPoint2} from "../../../../lib/math/figures";

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
        <div className={setClasses(sharedStyles.transformToCenter, styles.variant, isChosen && styles.chosenVariant)}
             onClick={onChoose}
             style={{
                 left: center[0],
                 top: center[1]
             }}>
            {
                text
            }
        </div>
    )
})