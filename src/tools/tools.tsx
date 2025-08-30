import {observer} from "mobx-react-lite";
import {useAppContext} from "@src/app/app.context";
import React, {useState} from "react";
import {ChoicePlace} from "@src/common/components/app-settings/choice-place";
import {Up} from "@src/tools/up/up";
import {LanguageChoice} from "@src/common/components/app-settings/choices/language/language.choice";
import {ThemeChoice} from "@src/common/components/app-settings/choices/theme/theme.choice";
import {AppController} from "@src/app/app.controller";
import {makeObservable} from "mobx";
import styles from './tools.module.scss';

class ToolsController {
    constructor(public app: AppController) {
        makeObservable(this);
    }

    get withUpBtn() {
        return this.app.scroll.getY() > 100;
    }
}

export const Tools = observer(() => {
    const app = useAppContext();
    const [controller] = useState(() => new ToolsController(app));

    return (
        <div className={styles.container}>
            {
                controller.withUpBtn &&
                <ChoicePlace>
                    <Up/>
                </ChoicePlace>
            }
            <ChoicePlace>
                <LanguageChoice/>
            </ChoicePlace>
            <ChoicePlace>
                <ThemeChoice/>
            </ChoicePlace>
        </div>
    )
});