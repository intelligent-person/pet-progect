import {profileAPI} from "../api/api";

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
    ],
    profile: null,
    status: ""
};

const profileReducer = (state = initialState, action) => {
    switch(action.type) {
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
            return {...state, posts: state.posts.filter( p => p.id != action.postId)}
        }
        case  SAVE_PHOTO_SUCCESS: {
            return {...state, profile: {...state.profile, photos: action.photos}}
        }
        default:
            return state;
    }
}

// ACTION CREATOR________________________________
export const addPostActionCreator = (newPostText) => ({type: ADD_POST, newPostText})
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})
export const setUserStatus = (status) => ({type: SET_USER_STATUS, status})
export const deletePost = (postId) => ({type: DELETE_STATUS, postId})
export const savePhotoSuccess = (photos) => ({type: SAVE_PHOTO_SUCCESS, photos})

// THUNK_____________________________
export const getUserId = (userId) => async (dispatch) => {
       let response = await profileAPI.getUserId(userId)
           dispatch(setUserProfile(response.data));
}
export const getUserStatus = (userId) => async (dispatch) => {
        let response = await profileAPI.getUserStatus(userId)
            dispatch(setUserStatus(response.data));
}
export const updateStatus = (status) => async (dispatch) => {
        let response = await profileAPI.updateStatus(status)
            if(response.data.resultCode === 0) {
                dispatch(setUserStatus(status))
            }
}
export const savePhoto = (file) => async (dispatch) => {
        let response = await profileAPI.savePhoto(file)
            if(response.data.resultCode === 0) {
                dispatch(savePhotoSuccess(response.data.data.photos))
            }
}

export default profileReducer;