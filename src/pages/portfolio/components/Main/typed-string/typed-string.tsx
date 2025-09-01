import React, {useEffect, useState} from "react";
import {TypedStringControllerPortfolio} from "./controller";
import {useAppContext} from "@src/app/app.context";
import {observer} from "mobx-react-lite";

export const TypedString =  observer(() => {
    const app = useAppContext()
    const [controller] = useState(() => new TypedStringControllerPortfolio(app.d.typedString))

    useEffect(() => controller.dispose.bind(controller), [])
    return (
        <span style={{whiteSpace: 'pre-line'}}>
            {
                controller.currentPart
            }
        </span>
    )
})