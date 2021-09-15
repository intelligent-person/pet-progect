import React from 'react';
import s from './ProfileInfo.module.css';
import Loader from "../../Common/Preloader/Loader";
import userPhoto from "../../../assets/images/user.png";
import ProfileStatus from "./ProfileStatus";

const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Loader/>
    }
    return (
        <div className={s.container}>
            <div>
                {/*<div>*/}
                {/*    <img*/}
                {/*        src='https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&h=350'/>*/}
                {/*</div>*/}
                <div className={s.descriptionBlock}>
                    <img className={s.ava} src={props.profile.photos.small != null ? props.profile.photos.small : userPhoto}/>
                </div>
                <div><h2>{props.profile.fullName != null ? props.profile.fullName : 'No Name'}</h2></div>
                <div><h4>{props.profile.aboutMe != null ? props.profile.aboutMe : ''}</h4></div>
            </div>
            <div>
                <ProfileStatus status={props.status} updateStatus={props.updateStatus}/>
            </div>
        </div>
    )
}

export default ProfileInfo;