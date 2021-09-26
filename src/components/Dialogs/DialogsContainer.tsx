import React from 'react';
import {sendMessage} from "../../Redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {WithAuthRedirect} from "../Hoc/WithAuthRedirect";
import {compose} from "redux";
import {AppStateType} from "../../Redux/redux-store";
import {getDialogs, getMessages} from '../../Redux/dialogs-selectors';
import {DialogType, MessageType} from "../../Types/types";

type MapStateToPropsType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
}
type MapDispatchToPropsType = {
    sendMessage: (newMessageText: string) => void
}
type OwnPropsType = {

}
let mapStateToProps = (state: AppStateType) => {
    return {
        dialogs: getDialogs(state),
        messages: getMessages(state),
    }
};
export default compose(
    connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(mapStateToProps, {sendMessage}),
    WithAuthRedirect
)(Dialogs)