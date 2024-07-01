import React, {useState} from "react";
import {observer} from "mobx-react-lite";
import styles from '../../settings.module.scss';
import {setClasses} from "../../../../utils/setClasses";
import sharedStyles from "../../../../styles/common.module.scss";
import {app} from "../../../../../app/constants";
import {Operator} from "../../../../../lib/math/operator";
import {Choicer} from "../../shared/choicer";
import {LanguageChoiceController} from "./language-choice.controller";
import {Variant} from "../../shared/variant";

export const LanguageChoice: React.FC = observer(() => {

    const [controller] = useState(() => new LanguageChoiceController())

    return (
        <div className={styles.field}
             tabIndex={1}>
            <Choicer angle={controller.chosenIndex * controller.angleStep}/>
            <div className={setClasses(styles.variants, sharedStyles.transformToCenter)}>
                {
                    app.lang.langs.map((variant, i) => {
                        let line = controller.line.transform(Operator.rotateIdentity(i && controller.angleStep))
                        return (
                            <Variant key={variant} center={line.p2}
                                     onChoose={() => controller.switchVariant(variant)}
                                     text={variant}
                                     isChosen={variant === app.lang.currentLang}/>
                        )
                    })
                }
            </div>
        </div>
    )
})