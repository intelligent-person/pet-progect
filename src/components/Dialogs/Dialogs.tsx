import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../Common/FormControls/FormControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import {AppStateType} from "../../Redux/redux-store";
import {DialogType, MessageType} from '../../Types/types';

type DialogsPropsType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>

    sendMessage: (newMessageBody: string) => void
}
const Dialogs: React.FC<DialogsPropsType> = ({dialogs, messages, sendMessage}) => {

    let dialogsElements = dialogs.map( d => <DialogItem key={d.id} name={d.name} id={d.id} />  );
    let messagesElements = messages.map( m => <Message key={m.id} message={m.message} /> );

    let addNewMessage = (values: any) => {
        sendMessage(values.newMessageBody);
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                { dialogsElements }
            </div>
            <div className={s.messages}>
                <div>{ messagesElements }</div>
                <AddMessageFormRedux onSubmit={addNewMessage}/>
            </div>
        </div>
    )
}

const maxLength100 = maxLengthCreator(100)

// @ts-ignore
export const AddMessageForm = ({handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div><Field component={Textarea} name={'newMessageBody'} placeholder='Enter your message'
            validate={[required, maxLength100]}/></div>
            <div><button>Send</button></div>
        </form>
    )
}

const AddMessageFormRedux = reduxForm({form: 'dialogAddMessageForm'})(AddMessageForm)

export default Dialogs;