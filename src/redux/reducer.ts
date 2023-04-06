import {actionsType} from "./store";
import {Dispatch} from "redux";

//constants
const TEST = 'TEST'
const CHANGE_TYPED_VALUE = 'CHANGE-TYPED-VALUE'
const REVERSE = 'REVERSE'
const END_TYPE_CYCLE = 'END_TYPE_CYCLE'
const SET_CURRENT_ANCHOR = 'SET_CURRENT_ANCHOR'

export type anchorType = 'main' | 'skills' | 'projects' | 'contacts'
export type baseType = {
    mainSpans: string[],
    typed: string,
    reverse: boolean,
    count: number,
    currentAnchor: anchorType,
}

//actions types
export type testActionType = ReturnType<typeof testAC>
export type changeTypedValueActionType = ReturnType<typeof changeTypedValue>
export type changeReverseActionType = ReturnType<typeof changeReverse>
export type endTypeCycleActionType = ReturnType<typeof endTypeCycle>
export type setCurrentAnchorActionType = ReturnType<typeof setCurrentAnchor>

//action creators
export const endTypeCycle = (count: number) => {
    return {
        type: END_TYPE_CYCLE,
        payload: {
            typed: '',
            reverse: false,
            count,
        }
    } as const
}
export const changeReverse = (reverse: boolean) => {
    return {
        type: REVERSE,
        payload: {
            reverse,
        }
    } as const
}
export const testAC = () => {
    return {
        type: TEST,
        payload: {}
    } as const
}
export const changeTypedValue = (typed: string) => {
    return {
        type: CHANGE_TYPED_VALUE,
        payload: {
            typed,
        }
    } as const
}
export const setCurrentAnchor = (currentAnchor: anchorType) => {
    return {
        type: SET_CURRENT_ANCHOR,
        payload: {
            currentAnchor,
        }
    }
}

const initialState: baseType = {
    mainSpans: ['Frontend', 'React', 'Redux', 'TypeScript', 'JavaScript'],
    typed: '',
    reverse: false,
    count: 0,
    currentAnchor: 'main',
}

export const reducer = (state: baseType = initialState, action: actionsType) => {
    switch (action.type) {
        case END_TYPE_CYCLE:
        case REVERSE:
        case CHANGE_TYPED_VALUE:
        case SET_CURRENT_ANCHOR:
            return {
                ...state,
                ...action.payload,
            }
        case TEST:
        default:
            return state
    }
}

//thunks
export const checkAnchorTC = (elements: HTMLDivElement[], currentAnchor: anchorType) => (dispatch: Dispatch) => {
    for (let elem of elements) {
        let rect = elem.getBoundingClientRect()
        if (((rect.top >= 85 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)) ||
                (rect.top < 200 && rect.bottom >= (window.innerHeight || document.documentElement.clientHeight)- 100)) &&
            currentAnchor !== elem.id) {
            dispatch(setCurrentAnchor(elem.id as anchorType))
        }
    }
}