
import {getAuth} from "./auth-reducer";

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

type InitializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
}

// ACTION CREATOR________________________________
export const initializedSuccess = ():InitializedSuccessActionType => ({type: INITIALIZED_SUCCESS})

// THUNK_____________________________
export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuth())
    Promise.all([promise]).then( () => {dispatch(initializedSuccess())})
}

export default appReducer;