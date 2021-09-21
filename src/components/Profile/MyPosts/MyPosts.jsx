import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, minLengthCreator, required} from "../../../utils/validators/validators";
import {Textarea} from "../../Common/FormControls/FormControls";

const MyPosts = (props) => {
    let postsElements =
        props.posts.map(p => <Post key={p.id} message={p.message} likesCount={p.likesCount}/>);

    let addNewPost = (values) => {
        props.addPost(values.newPostText);
    }

    return (
        <div className={s.postsBlock}>
            <AddPostReduxForm onSubmit={addNewPost}/>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
}

const maxLength10 = maxLengthCreator(10)
const minLength4 = minLengthCreator(4)

const AddPostForm = (props) => {
    return (
        <div>
            <h3>My posts</h3>
            <form onSubmit={props.handleSubmit}>
                <div>
                    <Field component={Textarea} name={'newPostText'} placeholder={'Add new post'}
                           validate={[required, maxLength10, minLength4]}/>
                </div>
                <div>
                    <button>Add post</button>
                </div>
            </form>
        </div>
    )
}

const AddPostReduxForm = reduxForm({form: 'profileAddPostForm'})(AddPostForm)

export default MyPosts;