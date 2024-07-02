import React from "react";
import {LanguageChoice} from "./choices/language/language.choice";
import {ThemeChoice} from "./choices/theme/theme.choice";
import {ChoicePlace} from "./choice-place";

type IAppSettings = {
    factor?: number
}
export const AppSettings: React.FC<IAppSettings> = React.memo(({
                                                                   factor = 1
                                                               }) => {
    return (
        <div className={'flex'}
             style={{
                 transformOrigin: 'left',
                 transform: `scale(${factor})`
             }}
        >
            <ChoicePlace>
                <LanguageChoice/>
            </ChoicePlace>
            <ChoicePlace>
                <ThemeChoice/>
            </ChoicePlace>
        </div>
    )
})