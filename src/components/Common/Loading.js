import React, { useRef, useEffect } from 'react';
import { useTheme } from '@react-navigation/native';
import {
    Modal,
    View,
    ActivityIndicator,
    StyleSheet,
    Animated,
} from 'react-native';

import { width } from '../../themes/Theme';

const ActivityAnimated = Animated.createAnimatedComponent(ActivityIndicator);

const Loading = ({ after, loading }) => {

    const { dark, colors } = useTheme();

    const opacity = useRef(new Animated.Value(0)).current;

    const fadeIn = () =>
        Animated.timing(opacity, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: false,
        }).start(() => {
            if (after) after();
        });

    useEffect(() => {
        if (loading) fadeIn();
    }, [loading]);

    return (
        <Modal transparent={true} visible={loading}>
            <View style={styles.backdrop} />
            <View style={[styles.container, { backgroundColor: dark ? '#a0a0a0' : colors.background }]}>
                <ActivityAnimated
                    size={70}
                    color={colors.primary}
                    animating={true}
                    style={{
                        opacity: opacity.interpolate({
                            inputRange: [0, 1],
                            outputRange: [1, 0],
                        }),
                    }}
                />
                <Animated.Text style={[styles.check, { opacity: opacity }]}>
                    &#10003;
                </Animated.Text>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        opacity: 0.2,
        backgroundColor: '#000',
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: '25%',
        marginVertical: '50%',
        borderRadius: 0.03 * width,
        padding: '5%',
        elevation: 5,
    },
    check: {
        position: 'absolute',
        top: '40%',
        color: '#90ee90',
        fontSize: 35,
    },
});

export default Loading;
