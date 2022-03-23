import React from 'react';
import { useTheme } from '@react-navigation/native';
import {
    StyleSheet,
    Pressable,
} from 'react-native';

const Button = ({ onPress, style, children }) => {
    
    const { colors } = useTheme();

    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                { 
                    backgroundColor: pressed ? colors.underlayColor : colors.primary,
                    opacity: pressed ? style?.opacityPressed : 1,
                },
                styles.container,
                style,
            ]}
        >
            {children}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        paddingVertical: '2%',
        marginTop: '3%',
        elevation: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default Button;