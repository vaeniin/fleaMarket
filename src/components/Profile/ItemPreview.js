import React, { useState } from 'react';
import { useTheme } from '@react-navigation/native';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Details from '../Common/Details';
import Button from '../Common/Button';
import Icon from '../../themes/Icons';
import Alert from '../Common/Alert';
import Loading from '../Common/Loading';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { addItem } from '../../store/actions/itemActions';
import { setLoading } from '../../store/actions/generalActions';

const ItemPreview = ({ navigation }) => {

    const { colors } = useTheme();
    const dispatch = useDispatch();
    const details = useSelector(state => state.general.form);
    const loading = useSelector(state => state.general.loading);

    const [showAlert, setShowAlert] = useState(false);

    const openAlert = () => setShowAlert(s => !s);

    const onConfirm = () => {
        dispatch(addItem());
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Details
                    details={details}
                    hideSend={true}
                    opacity={1}
                    visible={true}
                />
                <View style={styles.buttonsContainer}>
                <Button
                        style={{ alignItems: 'stretch', flex: 1, marginHorizontal: '1%' }}
                        onPress={() => navigation.goBack()}
                    >
                        <Icon
                            set='MaterialIcons'
                            size={20}
                            name='navigate-before'
                            color={colors.btn}
                        />
                        <Text style={{ color: colors.btn }}>Back</Text>
                    </Button>
                    <Button
                        style={{ alignItems: 'stretch', flex: 1, marginHorizontal: '1%' }}
                        onPress={openAlert}
                    >
                        <Text style={{ color: colors.btn }}>Confirm</Text>
                        <Icon
                            set='MaterialIcons'
                            size={20}
                            name='navigate-next'
                            color={colors.btn}
                        />
                    </Button>
                </View>
                <Alert
                    visible={showAlert}
                    title='Confirm'
                    subtitle='Are you sure?'
                    buttons={[
                        { content: <Text style={{ color: colors.btn }}>Cancel</Text>, onPress: openAlert },
                        { content: <Text style={{ color: colors.btn }}>OK</Text>, onPress: () => {
                            dispatch(setLoading(true));
                            openAlert();
                        } }
                    ]}
                />
                <Loading
                    loading={loading}
                    after={onConfirm}
                />
            </View>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    buttonsContainer: {
        flexDirection: 'row',
        marginBottom: '1%',
    },
});

export default ItemPreview;