import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import {
    changeReverseActionType,
    changeTypedValueActionType,
    endTypeCycleActionType,
    reducer, setCurrentAnchorActionType,
    testActionType
} from './reducer';
import {appReducer, tAppActions} from './appReducer/appReducer'

const rootReducer = combineReducers({
    state: reducer,
    appState: appReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))
export type stateType = ReturnType<typeof store.getState>
export type actionsType = testActionType
    | changeTypedValueActionType
    | changeReverseActionType
    | endTypeCycleActionType
    | setCurrentAnchorActionType
    | tAppActions
