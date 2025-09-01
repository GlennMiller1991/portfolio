import React, {useState} from "react";
import commonStyles from "@src/common/styles/common.module.scss";
import {IntersectionController} from "@src/pages/portfolio/components/sections/intersection.controller";
import {observer} from "mobx-react-lite";
import {SectionVisibilityContext} from "@src/pages/portfolio/components/sections/section-visibility.context";

type ISection = {
    id?: string,
    containerClassName?: string,
    header?: string,
}
export const Section: React.FC<React.PropsWithChildren<ISection>> = observer(({
                                                                          children,
                                                                          id,
                                                                          containerClassName,
                                                                          header,
                                                                      }) => {

    const [controller] = useState(() => new IntersectionController());

    return (
        <div id={id} ref={controller.didComponentMount} className={containerClassName}>
            <div className={commonStyles.container}>
                {
                    header &&
                    <h2 className={commonStyles.title}>
                        <span className={commonStyles.upperThenHeader}>{header}</span>
                        {header}
                    </h2>
                }
                <SectionVisibilityContext value={controller.context}>
                    {
                        children
                    }
                </SectionVisibilityContext>
            </div>
        </div>
    )
})