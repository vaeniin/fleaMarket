import React from 'react';
import { useTheme } from '@react-navigation/native';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
} from 'react-native';

const Input = ({
    label,
    placeholder,
    keyboardType,
    value,
    onChange,
    error,
    labelStyle,
    inputStyle,
    maxLength,
    multiline,
    textAlignVertical,
    numberOfLines
}) => {

    const { colors } = useTheme();

    return (
        <View style={[styles.container]}>
            <View style={styles.labelContainer}>
                <Text style={[styles.label, { color: colors.primary }, labelStyle]}>{label}:</Text>
                <Text style={styles.error}>{error}</Text>
            </View>
            <TextInput
                placeholder={placeholder}
                value={value}
                onChangeText={onChange}
                keyboardType={keyboardType}
                style={[styles.input, { borderColor: colors.primary, color: colors.title }, inputStyle]}
                maxLength={maxLength}
                multiline={multiline}
                textAlignVertical={textAlignVertical}
                numberOfLines={numberOfLines}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: '1%',
    },
    labelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: '3%',
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        textTransform: 'capitalize',
    },
    error: {
        color: '#ff0000',
        fontWeight: 'bold',
        marginLeft: '2%',
    },
    input: {
        borderWidth: 1,
        borderRadius: 15,
        paddingHorizontal: '4%',
    },
});

export default Input;