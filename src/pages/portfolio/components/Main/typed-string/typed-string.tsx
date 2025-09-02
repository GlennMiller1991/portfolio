import React, {useEffect, useState} from "react";
import {TypedStringControllerPortfolio} from "./controller";
import {useAppContext} from "@src/app/app.context";
import {observer} from "mobx-react-lite";
import {TypedStringEventEmitter} from "@src/lib/typed-string";

type ITypedString = {
    eventEmitter: TypedStringEventEmitter;
}
export const TypedString: React.FC<ITypedString> = observer(({
                                                                 eventEmitter,
                                                             }) => {
    const app = useAppContext();
    const [controller] = useState(() => new TypedStringControllerPortfolio(app.d.typedString, eventEmitter))

    useEffect(() => controller.dispose.bind(controller), [])
    return (
        <>
            <span>{controller.currentPart}</span>
            {!controller.isEnd && <span>|</span>}
        </>

    )
})