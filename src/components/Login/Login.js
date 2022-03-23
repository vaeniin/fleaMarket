import React, { useState, useRef } from 'react';
import { useTheme, CommonActions } from '@react-navigation/native';
import {
    View,
    Text,
    StyleSheet,
    Animated,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Passcode from './Passcode';
import Loading from '../Common/Loading';
import Button from '../Common/Button';
import Input from '../Common/Input';
import { height } from '../../themes/Theme';
import { setGenericPassword } from 'react-native-keychain';
import { emptyForm, validateLogin, validatePasscode } from '../../store/actions/generalActions';

const Login = ({ navigation }) => {

    const { colors } = useTheme();

    const dispatch = useDispatch();
    const errors = useSelector(state => state.general.formErrors);
    const message = useSelector(state => state.general.passcodeMsg);
    const loading = useSelector(state => state.general.loading);

    const position = useRef(new Animated.Value(0)).current;

    const [passcode, setPasscode] = useState({});
    const [register, setRegister] = useState(false);
    const [email, setEmail] = useState('');
    const [name, setName] = useState();

    const onSubmit = () => {
        const required = register ? ['email', 'name'] : ['email'];
        const form = { email, name };
        if (!message) dispatch(validateLogin(form, required));
        else dispatch(validatePasscode({ code: Object.values(passcode).join(''), email }));
    };

    const slide = (toValue) => {
        Animated.spring(position, {
            toValue,
            duration: 1000,
            tension: 30,
            useNativeDriver: false,
        }).start(() => {
            if (toValue === 1) {
                setRegister(r => !r);
                slide(0);
            }
        });
    };

    const changeForm = () => {
        if (!message) slide(1);
        else setPasscode({});

        dispatch(emptyForm());
    };

    const storeCredentials = async () => {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';
        await setGenericPassword(email, token);
        navigation.dispatch(CommonActions.reset({
            index: 1,
            routes: [{ name: 'Main' }],
        }));
    };

    return (
        <View style={styles.container}>
            <Animated.View style={
                {
                    transform: [
                        {
                            translateY: position.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, height - height / 4],
                            }),
                        },
                    ],
                }
            }>
                <Text style={[styles.title, { color: colors.primary }]}>
                    {register ? 'Register' : 'Login'}
                </Text>
                {message ?
                    <>
                        <Text style={styles.message}>{message}</Text>
                        <Passcode
                            code={passcode}
                            set={setPasscode}
                            start={true}
                        />
                    </>
                :
                    <>
                        <Input
                            label='Email'
                            placeholder='Write your email here'
                            value={email}
                            onChange={setEmail}
                            keyboardType='email-address'
                            error={errors.email}
                        />
                        {register &&
                            <Input
                                label='Name'
                                placeholder='Write your name here'
                                value={name}
                                onChange={setName}
                                error={errors.name}
                            />
                        }
                    </>
                }
                <Button onPress={onSubmit}>
                    <Text style={{ color: colors.btn, fontSize: 15 }}>{register ? 'Register' : 'Login'}</Text>
                </Button>
                <Button 
                    onPress={changeForm}
                    style={{ backgroundColor: 'transparent', elevation: 0, opacityPressed: 0.5 }}
                >
                    <Text style={{ color: colors.primary, fontSize: 14 }}>{message ? 'Go Back' : register ? 'Login' : 'Register'}</Text>
                </Button>
            </Animated.View>
            <Loading
                loading={loading}
                after={storeCredentials}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: '6%',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    message: {
        textAlign: 'center',
    },
});

export default Login;