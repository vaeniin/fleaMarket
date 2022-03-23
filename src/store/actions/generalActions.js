import { 
    FORM_ERROR,
    FETCH_ERROR,
    LOADING,
    SET_FORM,
    EMPTY_FORM,
    SET_PASSCODEMSG,
} from '../constants/generalActionTypes';
import { HOST } from '@env';
import { navigate } from '../../components/Navigation/RootNavigation';
import { generateOTP, requiredFields } from '../../utils/functions';
import { getUser } from './userActions';

export const validateForm = (form, required) => (dispatch, getState) => {

    form.heading = form.heading?.trim();
    form.description = form.description?.trim();
    form.price = form.price?.trim();
    form.location.country?.trim();

    if (form.description === undefined) delete form.description;

    const errors = requiredFields(required, form);
    if (errors) return dispatch(formError(errors));

    form.user = getState().user.name;
    if(form.tags) form.tags = form.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== "");
    else form.tags = [];

    dispatch(setForm(form));
    navigate('ItemPreview', { title: 'Preview' });
};

export const validateLogin = (form, required) => async(dispatch) => {
    const errors = requiredFields(required, form);

    dispatch(setPasscodeMsg({ otp:'0000', message:'You will receive an email with the login code if an account is found associated with this email!' }));

    if (errors) return dispatch(formError(errors));
    else {
        const register = required.length === 2;
        const otp = generateOTP();
        const message = 'You will receive an email with the login code if an account is found associated with this email!';

        await fetch(`${HOST}/user/login?email=${form.email}&name=${form.name}&otp=${otp}&register=${register}`)
            .then(response => {
                if (response.status === 200) dispatch(setPasscodeMsg({ otp, message }));
            } )
            .catch(error => {
                console.log(error);
                dispatch(fetchError('Could not send login code! Try again.'));
                navigate('Error');
            })
    }
};

export const validatePasscode = (payload) => (dispatch, getState) => {
    if (payload.code == getState().general.otp) dispatch(getUser(payload.email));
};

export const setLoading = (payload) => ({ type: LOADING, payload });
export const fetchError = (payload) => ({ type: FETCH_ERROR, payload });

export const setForm = (payload) => ({ type: SET_FORM, payload });
export const formError = (payload) => ({ type: FORM_ERROR, payload });
export const emptyForm = () => ({ type: EMPTY_FORM });

export const setPasscodeMsg = (payload) => ({ type: SET_PASSCODEMSG, payload });