import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import { themes } from '../../themes/Theme';
import { RootNavigator } from './StackNavigators';
import { navigationRef } from './RootNavigation';

const Navigation = () => {

    const theme = useSelector(state => state.user.theme);

    return (
        <NavigationContainer theme={themes[theme] || themes.light} ref={navigationRef}>
            <RootNavigator />
        </NavigationContainer>
    );
};

export default Navigation;