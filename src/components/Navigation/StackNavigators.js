import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '@react-navigation/native';
import { getGenericPassword } from 'react-native-keychain';
import { useDispatch } from 'react-redux';

import TabNavigator from './TabNavigator';
import Login from '../Login/Login';

import Home from '../Home/Home';
import Category from '../Home/Category';

import Profile from '../Profile/Profile';
import Edit from '../Profile/Edit';
import Listings from '../Profile/Listings';
import Inbox from '../Profile/Inbox';
import ListItem from '../Profile/ListItem';
import ItemPreview from '../Profile/ItemPreview';
import Settings from '../Profile/Settings';

import Chat from '../Profile/Chat/Chat';
import ChatHeader from '../Profile/Chat/ChatHeader';

import Modal from '../Home/Modal';
import Gradient from '../Common/Gradient';
import Header from '../Home/Header';
import Error from '../Error/Error';
import { getUser } from '../../store/actions/userActions';

const RootStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();

export const RootNavigator = () => {

    const dispatch = useDispatch();

    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const credentials = await getGenericPassword();
                if (credentials) {
                    dispatch(getUser(credentials.username));
                    setLoggedIn(true);
                }
            } catch (e) {
                console.log("Keychain couldn't be accessed!", e);
            } 
            setLoading(false);
        })();
    }, []);

    if (loading) return <></>;

    return (
        <RootStack.Navigator
            screenOptions={{ headerShown: false, presentation: 'modal' }}
        >
            {!loggedIn && <RootStack.Screen name='Login' component={Login} />}
            <RootStack.Screen name='Main' component={TabNavigator} />
            <RootStack.Screen name='Details' component={Modal} options={{ presentation: 'transparentModal', animation: 'fade' }} />
            <RootStack.Screen name='Error' component={Error} options={{ presentation: 'transparentModal', animation: 'none' }} />
        </RootStack.Navigator>
    );
};

export const HomeNavigator = () => {

    const { colors } = useTheme();

    return (
        <HomeStack.Navigator
            screenOptions={({ route, navigation }) => ({
                headerTitle: () => 
                    <Header
                        navigation={navigation}
                        title={route.params?.title || 'Home'}
                        color={route.params?.color || colors.primary}
                        search={route.params?.search}
                    />,
                headerTintColor: route.params?.color || colors.primary,
                headerBackground: () => <Gradient />
            })}
        >
            <HomeStack.Screen name='HomeScreen' component={Home} />
            <HomeStack.Screen name='Category' component={Category} />
        </HomeStack.Navigator>
    );
};

export const ProfileNavigator = () => {
    const { colors } = useTheme();

    return (
        <ProfileStack.Navigator
            screenOptions={({ route }) => ({
                headerTitle: route.params?.title || 'Profile',
                headerTintColor: colors.primary,
                headerBackground: () => <Gradient />,
            })}
        >
            <ProfileStack.Screen name='ProfileScreen' component={Profile} />
            <ProfileStack.Screen name='Edit' component={Edit} />
            <ProfileStack.Screen name='Listings' component={Listings} />
            <ProfileStack.Screen name='Inbox' component={Inbox} />
            <ProfileStack.Screen name='ListItem' component={ListItem} />
            <ProfileStack.Screen name='ItemPreview' component={ItemPreview} />
            <ProfileStack.Screen name='Settings' component={Settings} />
            <ProfileStack.Screen
                name='Chat'
                component={Chat}
                options={({ route }) => ({
                    headerTitle: () => 
                        <ChatHeader
                            receiver={route.params.receiver}
                            title={route.params.title}
                            id={route.params.id}
                        />
                })}
            />
        </ProfileStack.Navigator>
    );
};