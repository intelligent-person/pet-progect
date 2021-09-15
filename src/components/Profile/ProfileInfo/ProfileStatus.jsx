import React, {useEffect, useState} from "react";

const ProfileStatus = (props) => {
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
        props.updateStatus(props.status)
    }

    const onPostChange = (e) => [
        setStatus(e.target.value)
    ]

    return (
        <>
            {!editMode &&
                <div onDoubleClick={activeEditMode}>{props.status || '-----'}</div>
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