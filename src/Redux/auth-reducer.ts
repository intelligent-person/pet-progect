import {authAPI, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";

const SET_USER_DATA = 'auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'auth/GET_CAPTCHA_URL_SUCCESS';

let initialState = {
    userId: null as number | null,
    login: null as string | null,
    email: null as string | null,
    isAuth: false,
    captchaURL: null as string | null
};
export type InitialStateType = typeof initialState

const authReducer = (state = initialState, action: any):InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            }
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.captchaURL
            }
        default:
            return state;
    }
}
// ACTION CREATOR________________________________
type ActionTypes = SetAuthUserDataActionType | GetCaptchaUrlSuccessActionType
type _SetAuthUserDataActionPayloadType = {
    userId: number | null
    login: string | null
    email: string | null
    isAuth: boolean | null
}
type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA
    payload: _SetAuthUserDataActionPayloadType
}
type GetCaptchaUrlSuccessActionType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS
    captchaURL: string
}

export const setAuthUserData =
    (userId: number | null, login: string | null, email: string | null, isAuth: boolean | null):SetAuthUserDataActionType => ({
    type: SET_USER_DATA,
    payload: {userId, login, email, isAuth}
})
export const getCaptchaUrlSuccess = (captchaURL: string): GetCaptchaUrlSuccessActionType => ({type: GET_CAPTCHA_URL_SUCCESS, captchaURL: captchaURL})

// THUNK_____________________________

type ThunkType = ThunkAction<void, AppStateType, unknown, ActionTypes>
export const getAuth = (): ThunkType => async (dispatch) => {
    let response = await authAPI.me()

    if (response.data.resultCode === 0) {
        let {id, login, email} = response.data.data;
        dispatch(setAuthUserData(id, login, email, true))
    }

}
export const login = (email: string, password: string, rememberMe: boolean): ThunkType => async (dispatch: any) => {
    let response = await authAPI.login(email, password, rememberMe)

    if (response.data.resultCode === 0) {
        //success get auth data
        dispatch(getAuth())
    } else {
        if (response.data.resultCode === 10) {
            dispatch(getCaptchaURL())
        }
        let messages = response.data.messages.length > 0 ? response.data.messages : "Some error"
        dispatch(stopSubmit('login', {_error: messages}))
    }
}
export const logout = (): ThunkType => async (dispatch) => {
    let response = await authAPI.logout()

    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}
export const getCaptchaURL = (): ThunkType => async (dispatch) => {
    let response = await securityAPI.getCaptcha()
    const captchaURL = response.data.url
    dispatch(getCaptchaUrlSuccess(captchaURL))
}


export default authReducer;