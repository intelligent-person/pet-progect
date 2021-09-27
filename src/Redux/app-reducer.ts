
import {getAuth} from "./auth-reducer";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

export type InitialStateType = {
    initialized: boolean
}

let initialState: InitialStateType = {
    initialized: false
};

const appReducer = (state = initialState, action: any):InitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        default:
            return state;
    }
}



// ACTION CREATOR________________________________
type ActionTypes = InitializedSuccessActionType
type InitializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
}
export const initializedSuccess = ():InitializedSuccessActionType => ({type: INITIALIZED_SUCCESS})

// THUNK_____________________________
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionTypes>
export const initializeApp = (): ThunkType => (dispatch) => {
    let promise = dispatch(getAuth())
    Promise.all([promise]).then( () => {dispatch(initializedSuccess())})
}

export default appReducer;