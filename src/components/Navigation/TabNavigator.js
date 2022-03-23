import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';

import { HomeNavigator, ProfileNavigator } from './StackNavigators';
import Icon from '../../themes/Icons';
import { compareDates } from '../../utils/functions';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {

    const chats = useSelector(state => state.user.chats);
    const id = useSelector(state => state.user.id);

    const notif = chats.filter(c => {
        if (id === c.message.senderId) return false;
        return compareDates(c.lastOpened, c.message.date)
    }).length;

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                    }

                    return (
                        <Icon
                            set='Ionicons'
                            name={iconName}
                            size={size}
                            color={color}
                        />
                    );
                },
                tabBarStyle: {
                    borderTopWidth: 1,
                },
                headerShown: false,
            })}
        >
            <Tab.Screen name='Home' component={HomeNavigator} />
            <Tab.Screen
                name='Profile'
                component={ProfileNavigator}
                options={{ tabBarBadge: notif || null }}
            />
        </Tab.Navigator>
    );
};

export default TabNavigator;