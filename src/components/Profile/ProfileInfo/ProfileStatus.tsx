import React, {ChangeEvent, useEffect, useState} from "react";

type PropsType = {
    status: string
    updateStatus: (status: string) => void
}
const ProfileStatus: React.FC<PropsType> = (props) => {
    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)

    useEffect( () => {
        setStatus(props.status)
    }, [props.status])

    const activeEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }

    const onPostChange = (e: ChangeEvent<HTMLInputElement>) => [
        setStatus(e.target.value)
    ]

    return (
        <>
            {!editMode &&
                <div onDoubleClick={activeEditMode}><b>Status: </b>{props.status || '-----'}</div>
            }
            {editMode &&
            <div>
                <input onChange={onPostChange} autoFocus={true} onBlur={deactivateEditMode}  value={status}/>
            </div>
            }
        </>

    )

}

export default ProfileStatus;