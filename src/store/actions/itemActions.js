import {
    DETAILS_RECEIVED,
    ITEMS_RECEIVED,
} from '../constants/itemActionTypes';
import { navigate, navDispatch } from '../../components/Navigation/RootNavigation';
import { setForm, fetchError, emptyForm, setLoading } from './generalActions';
import { HOST } from '@env';

export const getItems = (payload = {}) => async(dispatch, getState) => {

    const { category, action, text, type, location, user, page } = payload;

    await fetch(`${HOST}/item/getAll`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ type: type || null, category: user ? null : (category || null), text: text || "", location: location || "", user: user || null, page })
    })
        .then( response => response.json() )
        .then( data => {
            const items = getState().item.items || [];
            if (page > 0) data = [...items, ...data];
            dispatch(itemsReceived(data));
        })
        .catch(error => {
            console.log(error);
            dispatch(fetchError('Could not retrieve any data'));
            navigate('Error');
        });

    if (action) navDispatch(action);
};

export const getItem = (payload, screen) => async(dispatch) => {
    await fetch(`${HOST}/item/get/${payload}`)
        .then( response => response.json() )
        .then( data => {
            dispatch(detailsReceived(data));
            navigate('Details', { screen });
        })
        .catch(error => {
            console.log(error);
            dispatch(fetchError('Could not retrieve item details'));
            navigate('Error');
        })
};

export const addItem = () => async(dispatch, getState) => {
    const item = getState().general.form;

    const data = new FormData();

    let images = [];
    item.images.forEach(file => {
        if (file.uri) {
            data.append('files', {
                uri: file.uri,
                type: file.type,
                name: file.name + '/' + file.height + '/' + file.width,
            });
        } else images.push(file);
    });

    item.userId = getState().user.id;
    if (images.length > 0) {
        images.forEach((value) => {
            data.append('images', value.name + '/' + value.height + '/' + value.width);
        });
    }
    
    const body = { ...item };
    delete body.images;

    Object.keys(body).forEach(key => {
        if (!Array.isArray(body[key]) && key !== 'location') {
            if (body[key]) data.append(key, body[key]);
        }
        else if (Array.isArray(body[key]) && key !== 'images') {
            body[key].forEach(value => data.append(`${key}`, value));
        } else if (key !== 'images') {
            data.append('country', body[key].country);
            if (body[key].region) data.append('region', body[key].region);
            if (body[key].city) data.append('city', body[key].city);
            if (body[key].postalcode) data.append('postalcode', body[key].postalcode);
        }
    });

    await fetch(`${HOST}/item/add/`, {
        method: 'POST',
        body: data,
    })
        .then( response =>  {
            if (response.status === 200) {
                dispatch(emptyForm());
                navigate('ProfileScreen');
            }
        })
        .catch(error => {
            console.log(error);
            dispatch(fetchError('Could not add item! Try again.'));
            navigate('Error');
        });

    dispatch(setLoading(false));
};

export const deleteItem = (payload) => async(dispatch, getState) => {
    await fetch(`${HOST}/item/delete/${payload}`, {
        method: 'DELETE',
    })
        .then( response => {
            if (response.status === 200) dispatch(getItems({ user: getState().user.id }));
        })
        .catch(error => {
            console.log(error);
            dispatch(fetchError('Could not delete item! Try again.'));
            navigate('Error');
        });
}; 

export const editItem = (payload) => async(dispatch) => {
    await fetch(`${HOST}/item/get/${payload}`)
    .then( response => response.json() )
    .then( data => {
        dispatch(setForm(data));
        navigate('ListItem', { title: 'Edit Listing' });
    })
    .catch(error => {
        console.log(error);
        dispatch(fetchError('Could not retrieve item details'));
        navigate('Error');
    })
};

export const itemsReceived = (payload) => ({ type: ITEMS_RECEIVED, payload });
export const detailsReceived = (payload) => ({ type: DETAILS_RECEIVED, payload });
