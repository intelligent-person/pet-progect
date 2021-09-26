import {createSelector} from "reselect";
import {AppStateType} from "./redux-store";

export const getDialogsSelector = (state: AppStateType) => {
    return state.dialogsPage.dialogs
}
export const getDialogs = createSelector(getDialogsSelector, (dialogs) => dialogs)

export const getMessagesSelector = (state: AppStateType) => {
    return state.dialogsPage.messages
}
export const getMessages = createSelector(getMessagesSelector, (messages) => messages)
