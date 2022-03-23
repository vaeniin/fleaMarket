import React from 'react';
import { useTheme } from '@react-navigation/native';
import {
    Text,
    StyleSheet,
} from 'react-native';

const CustomText = ({ style, children, ...props }) => {
    
    const { colors } = useTheme();

    return (
        <Text
            style={[styles.capitalize, { color: colors.title, ...style }]}
            {...props}
        >
                {children}
        </Text>
    );
};

const styles = StyleSheet.create({
    capitalize: {
        textTransform: 'capitalize',
    },
});

export default CustomText;