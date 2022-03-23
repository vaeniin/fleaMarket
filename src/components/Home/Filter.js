import React, { useEffect, useState } from 'react';
import { useTheme } from '@react-navigation/native';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    TextInput,
} from 'react-native';

import Button from '../Common/Button';
import RadioButton from '../Common/RadioButton';
import { TYPES } from '../../utils/constants';

const Filter = ({ location, setLocation, setType, type }) => {

    const { colors } = useTheme();

    const [input, setInput] = useState();
    const [selected, setSelected] = useState('all');
    const [visible, setVisible] = useState(false);

    const closeModal = () => {
        setType(selected);
        if (input && input.trim()) setLocation(input.trim());
        else setLocation('all');
        setVisible(false);
    };

    const openModal = () => setVisible(true);

    useEffect(() => {
        location !== 'all' && setInput(location);
    }, [location]);

    return (
        <View style={styles.filterValuesContainer}>
            <View style={styles.filterValueContainer}>
                <Text style={[styles.title, { color: colors.title }]}>Type: </Text>
                <Text
                    style={[styles.filterValue, { color: colors.filtervalue }]}
                    onPress={openModal}
                >
                    {type}{' '}
                </Text>
            </View>
            <View style={styles.filterValueContainer}>
                <Text style={[styles.title, { color: colors.title }]}>Location: </Text>
                <Text
                    style={[styles.filterValue, { color: colors.filtervalue }]}
                    onPress={openModal}
                    numberOfLines={1}
                >
                    {location}
                </Text>
            </View>
            <Modal
                animationType='fade'
                visible={visible}
                transparent
            >
                <View style={styles.modal}>
                    <View style={[styles.container, { backgroundColor: colors.background }]}>
                        <Text style={[styles.label, { color: colors.primary }]}>Location</Text>
                        <TextInput
                            style={[styles.filter, { borderColor: colors.primary, color: colors.title }]}
                            value={input}
                            placeholder='Write a country, city, region or postal code...'
                            onChangeText={setInput}
                        />
                        <Text style={[styles.label, { color: colors.primary }]}>Listing's type</Text>
                        <RadioButton
                            options={['all', ...TYPES.map(t => t.value)]}
                            selected={selected}
                            setSelected={setSelected}
                            horizontal={true}
                        />
                        <Button onPress={closeModal}>
                            <Text style={{ color: colors.btn }}>Save</Text>
                        </Button>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        padding: '3%',
        borderRadius: 10,
        elevation: 5,
    },
    filterValuesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: '3%',
    },
    filterValueContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    filterValue: {
        fontWeight: 'bold',
        fontSize: 17,
        textTransform: 'capitalize',
    },
    label: {
        fontWeight: 'bold',
        fontSize: 18,
        marginVertical: '1%',
    },
    filter: {
        paddingHorizontal: '3%',
        borderRadius: 10,
        borderWidth: 1,
    },
});

export default Filter;