import React, { useState, useEffect } from 'react';
import { useTheme } from '@react-navigation/native';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { LABELS } from '../../utils/constants';
import Button from '../Common/Button';
import Input from '../Common/Input';
import { addUser } from '../../store/actions/userActions';
import { emptyForm } from '../../store/actions/generalActions';

const Edit = ({ navigation }) => {

    const { colors } = useTheme();
    const dispatch = useDispatch();
    const errors = useSelector(state => state.general.formErrors);
    const user = useSelector(state => state.user);

    const [form, setForm] = useState({
        name: user?.name,
        email: user?.email,
        country: user?.country,
        region: user?.region,
        city: user?.city,
        postalcode: user?.postalcode,
    });
    
    useEffect(() => {
        const unsubscribe = navigation.addListener('beforeRemove', () => {
            dispatch(emptyForm());
            unsubscribe();
        });
    });

    const updateForm = (label, value) => setForm(prevState => ({...prevState, [`${label.replace(/\s/g,'')}`]: value.trim() }));

    const onSubmit = () => {
        dispatch(addUser(form));
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                <Text style={[styles.title, { color: colors.primary }]}>Account Info</Text>
                {LABELS.map((label, i) => 
                    <Input
                        key={i}
                        label={label}
                        keyboardType={label === 'email' ? 'email-address' : 'default'}
                        error={errors[label]}
                        labelStyle={{ fontSize: 15 }}
                        inputStyle={{ paddingVertical: '1%' }}
                        value={form[`${label.replace(/\s/g,'')}`]}
                        onChange={(value) => updateForm(label, value)}
                    />
                )}
                <Button
                    onPress={onSubmit}
                >
                    <Text style={{ color: colors.btn }}>Save</Text>
                </Button>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: '5%',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: '2%',
        textAlign: 'center',
    },
});

export default Edit;