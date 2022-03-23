import React from 'react';
import { useTheme } from '@react-navigation/native';
import {
    View,
    Pressable,
    StyleSheet,
} from 'react-native';

import CustomText from '../Common/CustomText';

const CheckBox = ({ options, checked, setChecked }) => {

    const { colors } = useTheme();

    const updateChecked = (option) => {
        if (checked.includes(option)) setChecked(c => c.filter(c => c !== option));
        else setChecked(c => [...c, option]);
    };

    return (
        <View style={{ flexDirection: 'row' }}>
            {options.map((option, i) => (
                <View key={i} style={styles.container}>
                    <CustomText>{option}</CustomText>
                    <Pressable
                        style={[styles.square, { borderColor: colors.primary }]}
                        onPress={() => updateChecked(option)}
                    >
                        {checked.includes(option) && <View style={[styles.selected, { backgroundColor: colors.primary }]} />}
                    </Pressable>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: '5%',
    },
    square: {
        height: 15,
        width: 15,
        borderRadius: 3,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 2,
    },
    selected: {
        width: 10,
        height: 10,
        borderRadius: 2,
    },
});

export default CheckBox;