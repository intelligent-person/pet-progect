import {profileAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {PhotosType, PostsType, ProfileType} from "../Types/types";

const ADD_POST = 'ADD-POST';
const DELETE_STATUS = 'DELETE_STATUS';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_USER_STATUS = 'SET_USER_STATUS';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';

let initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: 'It\'s my first post', likesCount: 11},
        {id: 3, message: 'Blabla', likesCount: 11},
        {id: 4, message: 'Dada', likesCount: 11}
    ] as Array<PostsType>,
    profile: null as ProfileType | null,
    status: "" as string,
    newPostText: '' as string
};
type InitialStateType = typeof initialState
const profileReducer = (state = initialState, action: any):InitialStateType => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 5,
                message: action.newPostText,
                likesCount: 0
            };
            return {...state, posts: [...state.posts, newPost], newPostText: ''};
        case SET_USER_PROFILE: {
            return {...state, profile: action.profile};
        }
        case SET_USER_STATUS: {
            return {...state, status: action.status};
        }
        case  DELETE_STATUS: {
            return {...state, posts: state.posts.filter(p => p.id != action.postId)}
        }
        case  SAVE_PHOTO_SUCCESS: {
            return {...state, profile: {...state.profile, photos: action.photos} as ProfileType}
        }
        default:
            return state;
    }
}

// ACTION CREATOR________________________________

type AddPostActionCreatorActionType = {
    type: typeof ADD_POST
    newPostText: string
}
export const addPostActionCreator = (newPostText: string): AddPostActionCreatorActionType => ({type: ADD_POST, newPostText})

type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}
export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({type: SET_USER_PROFILE, profile})

type SetUserStatusActionType = {
    type: typeof SET_USER_STATUS
    status: string
}
export const setUserStatus = (status: string): SetUserStatusActionType => ({type: SET_USER_STATUS, status})

type DeletePostActionType = {
    type: typeof DELETE_STATUS
    postId: number

}
export const deletePost = (postId: number): DeletePostActionType => ({type: DELETE_STATUS, postId})

type SavePhotoSuccessActionType = {
    type: typeof SAVE_PHOTO_SUCCESS
    photos: PhotosType
}
export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessActionType => ({type: SAVE_PHOTO_SUCCESS, photos})

// THUNK_____________________________
export const getUserId = (userId: number) => async (dispatch: any) => {
    let response = await profileAPI.getUserId(userId)
    dispatch(setUserProfile(response.data));
}
export const getUserStatus = (userId: number) => async (dispatch: any) => {
    let response = await profileAPI.getUserStatus(userId)
    dispatch(setUserStatus(response.data));
}
export const updateStatus = (status: string) => async (dispatch: any) => {
    let response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setUserStatus(status))
    }
}
export const savePhoto = (file: any) => async (dispatch: any) => {
    let response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos))
    }
}
export const saveProfile = (profileData: any) => async (dispatch: any, getState: any) => {
    const userId = getState().auth.userId
    const response = await profileAPI.saveProfile(profileData)
    if (response.data.resultCode === 0) {
        dispatch(getUserId(userId))
    } else {
        dispatch(stopSubmit('editProfile', {_error: response.data.messages[0]}))
        return Promise.reject(response.data.messages[0])
    }
}

export default profileReducer;