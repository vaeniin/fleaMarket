import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '@react-navigation/native';
import {
    View,
    StyleSheet,
    Pressable,
    Animated,
    Easing,
} from 'react-native';
import { useSelector } from 'react-redux';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';

import Details from '../Common/Details';
import MessageBox from './MessageBox';

import { CATEGORIES } from '../../utils/constants';

const Modal = ({ navigation, route }) => {

    const { dark, colors } = useTheme();
    const details = useSelector(state => state.item.details);

    const height = useRef(new Animated.Value(0)).current;

    const [showMessage, setShowMessage] = useState(false);
    const [visibleDetails, setVisibleDetails] = useState(false);

    const openMessage = () => setShowMessage(s => !s);

    const slide = (toValue, after) => {
        return Animated.timing(height, {
            toValue: toValue,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start(() => {
            if (after) after();
        });
    };

    useEffect(() => {
        slide(0.6);
    }, []);

    const onClose = () => {
        slide(0, navigation.goBack);
    };

    const navigate = ({ title, user }) => {
        const color = user ? dark ? '#909090' : '#000' : CATEGORIES.find(c => c.title === title).color;
        navigation.navigate('Category', { title, color, user });
    };

    const searchTag = (tag) => {
        if (route.params.screen === 'home') navigation.navigate('HomeScreen', { search: tag });
        else if (route.params.screen === 'category') {
            navigation.navigate({ name: 'Category', params: { search: tag }, merge: true });
        }
    };

    const gesture = Gesture.Pan({ minDistance: 100 }).onStart((event) => {
        if (event.velocityY > 0) return slide(0.6, setVisibleDetails(false));
        else return slide(1, setVisibleDetails(true));
    });

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Pressable style={styles.backdrop} onPress={onClose} />
                    <GestureDetector gesture={gesture}>
                        <Animated.View style={[
                            styles.content,
                            { 
                                backgroundColor: colors.background,
                                height: height.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: ['0%', '100%']
                                })
                            }
                        ]}>
                            {showMessage ?
                                <MessageBox
                                    close={openMessage}
                                />
                            : 
                                <Details
                                    details={details}
                                    openMessage={openMessage}
                                    visible={visibleDetails}
                                    opacity={height.interpolate({ inputRange: [0, 0.6, 1], outputRange: [0, 0, 1] })}
                                    navigate={navigate}
                                    search={searchTag}
                                />
                            }
                        </Animated.View>
                    </GestureDetector>
            </View>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        opacity: 0.5,
        backgroundColor: '#000',
    },
    content: {
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
});

export default Modal;