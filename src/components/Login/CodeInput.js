import React, { forwardRef } from 'react';
import { useTheme } from '@react-navigation/native';
import {
    StyleSheet,
    TextInput,
} from 'react-native';

import { width } from '../../themes/Theme';

const Input = forwardRef(({ value, onChange }, ref) => {

    const { colors } = useTheme();

    return (
        <TextInput
            style={[styles.container, { borderColor: colors.primary, color: colors.title }]}
            maxLength={1}
            autoCapitalize='none'
            onChangeText={value => onChange(value)}
            selectTextOnFocus={true}
            value={value}
            ref={ref}
        />   
    );
});

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderRadius: 0.03 * width,
        paddingHorizontal: '4.5%',
        textAlign: 'center',
    },
});

export default Input;