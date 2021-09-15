import React from "react";
import profileReducer, {addPostActionCreator, deletePost} from "./profile-reducer";

let state = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: 'It\'s my first post', likesCount: 11},
        {id: 3, message: 'Blabla', likesCount: 11},
        {id: 4, message: 'Dada', likesCount: 11}
    ]
}

it('should be incremented', () => {
    // test data
    let action = addPostActionCreator('kamasytra')

    // action
    let newState = profileReducer(state, action)

    //expectation
    expect(newState.posts.length).toBe(5)
});

it('should be messages', () => {
    // test data
    let action = addPostActionCreator('kamasytra')

    // action
    let newState = profileReducer(state, action)

    //expectation
    expect(newState.posts[4].message).toBe('kamasytra')
});

it('after deleted', () => {
    // test data
    let action = deletePost(1)

    // action
    let newState = profileReducer(state, action)

    //expectation
    expect(newState.posts.length).toBe(3)
});
