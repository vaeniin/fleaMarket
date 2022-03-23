import React from 'react';
import { useTheme } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const Gradient = ({ style, children }) => {
    
    const { colors } = useTheme();

    return (
        <LinearGradient
            colors={colors.gradient}
            style={[{ flex: 1 }, style]}
        >
            {children}
        </LinearGradient>
    );
};

export default Gradient;
