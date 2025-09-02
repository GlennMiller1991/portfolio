import {createContext, use} from "react";

type ISectionVisibilityContext = {
    isVisible: boolean;
}

export const SectionVisibilityContext = createContext<ISectionVisibilityContext>({isVisible: false});
export function useSectionVisibility() {
    return use(SectionVisibilityContext);
}