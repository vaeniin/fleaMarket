import {
    CHATS_RECEIVED,
    MESSAGE_SUCCESS,
    USER_UPDATED,
    MESSAGES_RECEIVED,
    LOGOUT,
} from '../constants/userActionTypes';
import { HOST } from '@env';
import { requiredFields } from '../../utils/functions';
import { emptyForm, formError, setLoading, fetchError } from './generalActions';
import { navigate } from '../../components/Navigation/RootNavigation';

export const getUser = (payload) => async(dispatch) => {
    await fetch(`${HOST}/user/get/${payload}`)
    .then(response => response.json())
    .then(data => {
        if (data) {
            dispatch(userUpdated(data));
            dispatch(getChats());
            dispatch(emptyForm());
            dispatch(setLoading(true));
        }
    })
    .catch(error => {
        console.log(error);
        dispatch(fetchError('Could not get user data!'));
        navigate('Error');
    })
};

export const getChats = () => async(dispatch, getState) => {

    dispatch(setLoading(true));

    await fetch(`${HOST}/chat/getAll/${getState().user.id}`)
        .then( response => response.json() )
        .then( data => {
            dispatch(chatsReceived(data));
        })
        .catch(error => {
            console.log(error);
            dispatch(fetchError('Could not retrieve chats!'));
            navigate('Error');
        });
    
    dispatch(setLoading(false));
};

export const getMessages = (payload) => async(dispatch) => {
    const chatId = payload;

    dispatch(setLoading(true));

    await fetch(`${HOST}/message/getAll/${chatId}`)
    .then( response => response.json() )
    .then( data => {
        dispatch(messagesReceived(data));
    })
    .catch(error => {
        console.log(error);
        dispatch(fetchError('Could not retrieve messages!'));
        navigate('Error');
    });

    dispatch(setLoading(false));
};

export const sendMessage = (file, message) => async(dispatch) => {
    const data = new FormData();
    if (file) {
        data.append('file', {
            uri: file.uri,
            type: file.type,
            name: file.fileName,
        });

        data.append('name', file.fileName);
        data.append('height', file.height);
        data.append('width', file.width );
    }

    const body = { ...message };
    Object.keys(body).forEach(key => data.append(key, body[key]));

    if (!message.content.trim()) delete message.content;

    await fetch(`${HOST}/message/add/`, {
        method: 'POST',
        body: data,
    })
        .then( response => response.json() )
        .then( data => {
            message.date = data.date;
            message.id = data.id;
            dispatch(messageSuccess(message));
            dispatch(getChats());
        })
        .catch(error => {
            console.log(error);
            dispatch(fetchError('Could not send message! Try again.'));
            navigate('Error');
        });
};

export const addChat = (payload) => async(dispatch, getState) => {
    payload.senderId = getState().user.id;
    const data = new FormData();
    Object.keys(payload).forEach(key => data.append(key, payload[key]));

    await fetch(`${HOST}/chat/add`, {
        method: 'POST',
        body: data
    })
        .then( response => {
            if (response.status === 200) dispatch(getChats());
        })
        .catch(error => {
            console.log(error);
            dispatch(fetchError('Could not send message! Try again.'));
            navigate('Error');
        });
};

export const addUser = (payload) => async(dispatch, getState) => {
    
    if (!payload?.theme) {
        const errors = requiredFields(['name', 'email'], payload);
        if (errors) return dispatch(formError(errors));
        
        dispatch(emptyForm());
    }

    Object.keys(payload).forEach(key => {
        if (payload[key] === "") payload[key] = undefined;
    });

    dispatch(userUpdated(payload));

    await fetch(`${HOST}/user/add`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: getState().user.id, ...payload }),
    })
        .then(response => {
            if (response.status === 200) dispatch(userUpdated(payload));
        })
        .catch(error => {
            console.log(error);
            dispatch(fetchError('Could not update data!'));
            navigate('Error');
        });
};

export const logout = () => ({ type: LOGOUT });
export const chatsReceived = (payload) => ({ type: CHATS_RECEIVED, payload });
export const messagesReceived = (payload) => ({ type: MESSAGES_RECEIVED, payload });
export const messageSuccess = (payload) => ({ type: MESSAGE_SUCCESS, payload });
export const userUpdated = (payload) => ({ type: USER_UPDATED, payload });