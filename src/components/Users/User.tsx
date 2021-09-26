import React from "react";
import styles from "./Users.module.css";
import {NavLink} from "react-router-dom";
import userPhoto from "../../assets/images/user.png";
import {UsersType} from "../../Types/types";

type PropsType = {
    user: UsersType
    followingInProgress: Array<number>
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}
const User: React.FC<PropsType> = ({user, followingInProgress, unfollow, follow}) => {
    return (
        <div key={user.id}>
            <div className={styles.ava}>
                <NavLink to={'/profile/' + user.id}><img
                    src={user.photos.small != null ? user.photos.small : userPhoto} alt={'ava'}/></NavLink></div>
            <div>{user.followed
                ? <button disabled={followingInProgress.some(id => id === user.id)}
                          onClick={() => {
                              unfollow(user.id)
                          }}>Unfollow</button>
                : <button disabled={followingInProgress.some(id => id === user.id)}
                          onClick={() => {
                              follow(user.id)
                          }}>Follow</button>}</div>
            <div>{user.name}</div>
            <div>{user.status}</div>
            {/*<span>{u.location.country}</span>*/}
            {/*<span>  {u.location.city}</span>*/}
        </div>
    )
}
export default User