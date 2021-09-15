import React from "react";
import styles from "./Users.module.css";
import userPhoto from "../../assets/images/user.png";
import {NavLink} from "react-router-dom";
import Paginator from "../Common/Paginator";

let Users = (props) => {
    // let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    //
    // let pages = [];
    // for (let i = 1; i <pagesCount; i++) {
    //     pages.push(i);
    // }

    return (
        <div>
            {/*<div>{pages.map(p => {*/}
            {/*    return <span className={props.currentPage === p && styles.selectedPage} onClick={(e) => {*/}
            {/*        props.onPageChanged(p)*/}
            {/*    }*/}
            {/*    }>{p}</span>*/}
            {/*})}</div>*/}

            <Paginator totalItemsCount={props.totalUsersCount} pageSize={props.pageSize} currentPage={props.currentPage}
                        onPageChanged={props.onPageChanged}/>
            {props.users.map(u => <div key={u.id}>
                <div className={styles.ava}>
                    <NavLink to={'/profile/' + u.id}><img
                        src={u.photos.small != null ? u.photos.small : userPhoto}/></NavLink></div>
                <div>{u.followed
                    ? <button disabled={props.followingInProgress.some( id => id === u.id )}
                              onClick={() => {props.unfollow(u.id)}}>Unfollow</button>
                    : <button disabled={props.followingInProgress.some( id => id === u.id )}
                              onClick={() => {props.follow(u.id)}}>Follow</button>}</div>
                <div>{u.name}</div>
                <div>{u.status}</div>
                {/*<span>{u.location.country}</span>*/}
                {/*<span>  {u.location.city}</span>*/}
            </div>)}
        </div>
    )
}

export default Users;