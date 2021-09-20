import {authAPI, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'auth/GET_CAPTCHA_URL_SUCCESS';

let initialState = {
    userId: null,
    login: null,
    email: null,
    isAuth: false,
    captchaURL: null
};

const authReducer = (state = initialState, action) => {
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
export const setAuthUserData = (userId, login, email, isAuth) => ({
    type: SET_USER_DATA,
    payload: {userId, email, login, isAuth}
})
export const getCaptchaUrlSuccess = (captchaURL) => ({type: GET_CAPTCHA_URL_SUCCESS, captchaURL: captchaURL})

// THUNK_____________________________
export const getAuth = () => async (dispatch) => {
    let response = await authAPI.me()

    if (response.data.resultCode === 0) {
        let {id, login, email} = response.data.data;
        dispatch(setAuthUserData(id, login, email, true))
    }

}
export const login = (email, password, rememberMe) => async (dispatch) => {
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
export const logout = () => async (dispatch) => {
    let response = await authAPI.logout()

    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}
export const getCaptchaURL = () => async (dispatch) => {
    let response = await securityAPI.getCaptcha()
    const captchaURL = response.data.url
    dispatch(getCaptchaUrlSuccess(captchaURL))
}


export default authReducer;