import React from "react";
import {setClasses} from "@src/lib/common/set-classes";
import styles from "./settings.module.scss";

export const ChoicePlace: React.FC<React.PropsWithChildren> = React.memo(({
                                                                              children
                                                                          }) => {
    return (
        <div className={setClasses(
            'rel',
            'flexCenter',
            styles.field
        )}
             tabIndex={1}>
            {
                children
            }
        </div>
    )
})