import React, { useState }from 'react';
import { useTheme, CommonActions } from '@react-navigation/native';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { resetGenericPassword } from 'react-native-keychain';

import Loading from '../Common/Loading';
import Button from '../Common/Button';
import RadioButton from '../Common/RadioButton';
import CustomText from '../Common/CustomText';
import Alert from '../Common/Alert';
import { THEMES } from '../../utils/constants';
import { addUser, logout } from '../../store/actions/userActions';
import { setLoading } from '../../store/actions/generalActions';

const Settings = ({ navigation }) => {

    const { colors } = useTheme();
    const dispatch = useDispatch();
    const theme = useSelector(state => state.user.theme);
    const loading = useSelector(state => state.general.loading);

    const [showAlert, setShowAlert] = useState(false);

    const openAlert = () => setShowAlert(s => !s);

    const onChangeTheme = (selected) => dispatch(addUser({ theme: selected }));

    const reset = async () => {
        try {
            await resetGenericPassword();
            dispatch(logout());
            dispatch(setLoading(false));
            navigation.dispatch(CommonActions.reset({
                index: 1,
                routes: [{ name: 'Login' }],
            }));

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={styles.container}>
            <CustomText style={styles.title}>Theme</CustomText>
            <RadioButton
                options={THEMES}
                selected={theme}
                setSelected={onChangeTheme}
                horizontal={true}
            />
            <Button
                style={{ width: '80%' }}
                onPress={openAlert}
            >
                <Text style={{ color: colors.btn }}>Logout</Text>
            </Button>
            <Alert
                visible={showAlert}
                title='Logout'
                subtitle='Are you sure?'
                buttons={[
                    { content: <Text style={{ color: colors.btn }}>Cancel</Text>, onPress: openAlert},
                    { content: <Text style={{ color: colors.btn }}>OK</Text>, onPress: () => {
                        openAlert();
                        dispatch(setLoading(true));
                    }},
                ]}
            />
            <Loading
                loading={loading}
                after={reset}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: '3%',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: '3%',
    },
});

export default Settings;