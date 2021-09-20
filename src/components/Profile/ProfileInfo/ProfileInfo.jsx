import React, {useState} from 'react';
import s from './ProfileInfo.module.css';
import Loader from "../../Common/Preloader/Loader";
import userPhoto from "../../../assets/images/user.png";
import ProfileStatus from "./ProfileStatus";
import ProfileDataReduxForm from "./ProfileDataForm";

const ProfileInfo = (props) => {

    const[editMode, setEditMode] = useState(false)

    if (!props.profile) {
        return <Loader/>
    }

    const onMainPhotoSelector = (e) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0])
        }
    }

    const onSubmit = (formData) => {
        props.saveProfile(formData).then(() => setEditMode(false))
    }

    return (
        <div className={s.container}>
            <div>
                {/*<div>*/}
                {/*    <img*/}
                {/*        src='https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&h=350'/>*/}
                {/*</div>*/}
                <div className={s.descriptionBlock}>
                    <img className={s.ava} src={props.profile.photos.large != null ? props.profile.photos.large : userPhoto}/>
                    {props.isOwner && <input type={"file"} onChange={onMainPhotoSelector}/>}
                </div>
            </div>
            <div>
                {editMode
                    ? <ProfileDataReduxForm initialValues={props.profile} profile={props.profile} onSubmit={onSubmit}/>
                    : <ProfileData profile={props.profile} isOwner={props.isOwner} goToEditMode={() => {setEditMode(true)}}/>
                }
                <ProfileStatus status={props.status} updateStatus={props.updateStatus}/>
            </div>
        </div>
    )
}

const ProfileData = (props) => {
    return (
        <div>
            {props.isOwner && <div><button onClick={props.goToEditMode}>Edit</button></div>}
            <div>{props.profile.fullName != null ? props.profile.fullName : 'No Name'}</div>
            <div><b>Looking for a job:</b> {props.profile.lookingForAJob ? "Yes" : "No"}</div>
            {props.profile.lookingForAJob &&
            <div><b>My professional skills:</b> {props.profile.lookingForAJobDescription}</div>}
            <div><b>About me:</b> {props.profile.aboutMe}</div>
            <div>Contacts: {Object.keys(props.profile.contacts).map(key => {
                    return <Contact key={key} contactTitle={key} contactValue={props.profile.contacts[key]}/>
            })}</div>
        </div>
    )
}

const Contact = ({contactTitle, contactValue}) => {
     return <div><b>{contactTitle}</b>: <a href={contactValue}>{contactValue}</a></div>}

export default ProfileInfo;