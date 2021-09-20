import React from "react";
import {CreateField, Input, Textarea} from "../../Common/FormControls/FormControls";
import {reduxForm} from "redux-form";
import s from './ProfileInfo.module.css';
import style from "../../Common/FormControls/FormControls.module.css";

const ProfileDataForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div><button>Save</button></div>
            { props.error && <div className={style.formSummaryError}>{props.error}</div>}
            <div>
                <b>Full name: </b>{CreateField("Full name...", "fullName", [], Input)}
            </div>
            <div><b>Looking for a job: </b>
                {CreateField('', "lookingForAJob", [], Input, {type: 'checkbox'})}
            </div>
            <div>
                <b>My professional skills:</b>
                {CreateField("My professional skills...", "lookingForAJobDescription", [], Textarea)}
            </div>}
            <div>
                <b>About me:</b>
                {CreateField("About me...", "aboutMe", [], Textarea)}
            </div>
            <div><b>Contacts: </b>{Object.keys(props.profile.contacts).map(key => {
                return <div key={key} className={s.contact}>
                    <b>{key}: {CreateField(key + "...", "contacts." + key, [], Input)}</b>
                </div>
            })}</div>
        </form>
    )
}
const ProfileDataReduxForm = reduxForm({form: "editProfile"})(ProfileDataForm)

export default ProfileDataReduxForm