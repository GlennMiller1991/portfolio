import React from "react";
import {LanguageChoice} from "./choices/language/language.choice";
import {ThemeChoice} from "./choices/theme/theme.choice";

export const AppSettings: React.FC = React.memo(() => {
    return (
        <div className={'flex'}>
            <LanguageChoice/>
            <ThemeChoice/>
        </div>
    )
})