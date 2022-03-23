import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';

import store from '../store/store';
import Navigation from './Navigation/Navigation';

const App = () => {
    return (
        <Provider store={store}>
            <Navigation />
        </Provider>
    );
};

export default App;