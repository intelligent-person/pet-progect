import {profileAPI} from "../api/api";

const ADD_POST = 'ADD-POST';
const DELETE_STATUS = 'DELETE_STATUS';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_USER_STATUS = 'SET_USER_STATUS';

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
        default:
            return state;
    }
}

// ACTION CREATOR________________________________
export const addPostActionCreator = (newPostText) => ({type: ADD_POST, newPostText})
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})
export const setUserStatus = (status) => ({type: SET_USER_STATUS, status})
export const deletePost = (postId) => ({type: DELETE_STATUS, postId})

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

export default profileReducer;