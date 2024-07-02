import React, {useState} from "react";
import {observer} from "mobx-react-lite";
import {setClasses} from "../../../../utils/setClasses";
import {app} from "../../../../../app/constants";
import {Operator} from "../../../../../lib/math/operator";
import {Caption, Choicer} from "../../shared/choicer";
import {LanguageChoiceController} from "./language-choice.controller";
import {Variant} from "../../shared/variant";
import {AngleUnits} from "../../../../../lib/math/angle/angle";

export const LanguageChoice: React.FC = observer(() => {

    const [controller] = useState(() => new LanguageChoiceController())

    return (
        <>
            <Choicer angle={controller.chosenIndex * controller.angleStep}
                     unit={AngleUnits.Deg}/>
            <div className={setClasses(
                'transformToCenter',
                'abs',
                'origin',
            )}>
                <Caption>
                    {
                        app.d.settings.language
                    }
                </Caption>
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
        </>
    )
})