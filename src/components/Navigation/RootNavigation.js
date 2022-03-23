import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export const navigate = (name, params) => {
    if (navigationRef.isReady()) navigationRef.navigate(name, params);
};

export const navDispatch = (action) => {
    if (navigationRef.isReady()) navigationRef.dispatch(action);
};