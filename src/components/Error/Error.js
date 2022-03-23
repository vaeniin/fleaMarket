import React, { useEffect, useRef } from 'react';
import { useTheme } from '@react-navigation/native';
import {
    Text,
    Animated,
    StyleSheet,
} from 'react-native';
import { useSelector } from 'react-redux';

import { height } from '../../themes/Theme';

const Error = ({ navigation }) => {

    const { colors } = useTheme();
    const error = useSelector(state => state.general.dataError);
    const position = useRef(new Animated.Value(0)).current;

    const slide = (toValue) => Animated.timing(position, {
        toValue,
        duration: 1000,
        useNativeDriver: false,
    }).start(() => {
        if (!toValue) navigation.goBack();
    });

    useEffect(() => {
        slide(1);

        const timer = setTimeout(() => {
            slide(0);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <Animated.View style={[styles.container, {
            backgroundColor: colors.background,
            borderBottomColor: colors.primary,
            transform: [{ 
                translateY: position.interpolate({ inputRange: [0,1], outputRange: [-height * 0.2, height * 0.1 ] })
            }]
        }]}>
            <Text style={{ color: colors.primary }}>{error}</Text>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '60%',
        alignItems: 'center',
        alignSelf: 'center',
        padding: '3%',
        borderRadius: 10,
        borderBottomWidth: 1,
        elevation: 5,
    },
});

export default Error;