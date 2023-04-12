// action type
import {updateErrors} from '../../common/utils/updateErrors'
import {tErrors} from '../../common/types/types'

export type tAppActions =
    tAppUpdateState |
    tAppUpdateErrors |
    tAppStateUpdateServerAvailableness

// const
const APP_UPDATE_STATE = 'APP_UPDATE_STATE'
const APP_UPDATE_ERRORS = 'APP_UPDATE_ERRORS'
const APP_UPDATE_SERVER_AVAILABLENESS = 'APP_UPDATE_SERVER_AVAILABLENESS'

// actions

type tAppStateUpdateServerAvailableness = ReturnType<typeof appStateUpdateServerAvailableness>
export const appStateUpdateServerAvailableness = (value: boolean) => {
    return {
        type: APP_UPDATE_SERVER_AVAILABLENESS,
        payload: value
    } as const
}

type tAppUpdateErrors = ReturnType<typeof appUpdateErrors>
export const appUpdateErrors = (errors: { [key: string]: string | undefined }) => {
    return {
        type: APP_UPDATE_ERRORS,
        payload: {
            errors
        }
    } as const
}

export const appUpdateState = (payload: Partial<tAppState>) => {
    return {
        type: APP_UPDATE_STATE,
        payload,
    } as const
}
type tAppUpdateState = ReturnType<typeof appUpdateState>

export type tWindowWrapper = {
    element: JSX.Element,
    containerClass?: string,
}

export type tAlertWindow = {
    text: string,
    className?: string,
}

export type tAppState = typeof appState
const appState = {
    windowWrapper: undefined as tWindowWrapper | undefined,
    errors: undefined as tErrors,
    appWidth: 0 as number,
    appHeight: 0 as number,
    authenticated: false as boolean,
    isMobile: false as boolean,
    alertWindow: undefined as undefined | tAlertWindow,
    serverIsAvailable: false as boolean,
}

export const appReducer = (state: tAppState = appState, action: tAppActions) => {
    switch (action.type) {
        case APP_UPDATE_SERVER_AVAILABLENESS:
            if (state.serverIsAvailable === action.payload) return state
            return {
                ...state,
                serverIsAvailable: action.payload
            }
        case APP_UPDATE_STATE:
            return {
                ...state,
                ...action.payload,
            }
        case APP_UPDATE_ERRORS:
            return {
                ...state,
                errors: {...updateErrors(state.errors, action.payload.errors)}
            }
        default:
            return state
    }
}