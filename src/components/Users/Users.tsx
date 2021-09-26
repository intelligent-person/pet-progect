import React from "react";
import Paginator from "../Common/Paginator";
import {UsersType} from "../../Types/types";
import User from "./User";


type PropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    users: Array<UsersType>
    followingInProgress: Array<number>
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}
let Users: React.FC<PropsType> = ({
                                      totalUsersCount, pageSize, currentPage,
                                      onPageChanged, users, ...props
                                  }) => {
    return (
        <div>
            <Paginator totalItemsCount={totalUsersCount} pageSize={pageSize} currentPage={currentPage}
                       onPageChanged={onPageChanged}/>
            {
                users.map(u => <User user={u} followingInProgress={props.followingInProgress} key={u.id}
                follow={props.follow} unfollow={props.unfollow}/>)
            }
        </div>
    )
}

export default Users;