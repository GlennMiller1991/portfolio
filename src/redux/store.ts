import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import {
    changeReverseActionType,
    changeTypedValueActionType,
    endTypeCycleActionType,
    reducer, setCurrentAnchorActionType,
    testActionType
} from './reducer';

const rootReducer = combineReducers({
    state: reducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))
export type stateType = ReturnType<typeof store.getState>
export type actionsType = testActionType
    | changeTypedValueActionType
    | changeReverseActionType
    | endTypeCycleActionType
    | setCurrentAnchorActionType