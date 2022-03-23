import React, { useRef, useEffect } from 'react';
import {
    StyleSheet,
    Animated,
} from 'react-native';

import { width } from '../../themes/Theme';
import Input from './CodeInput';

const Passcode = ({ code, set, start }) => {

    const position = useRef(new Animated.Value(0)).current;
    const i2 = useRef();
    const i3 = useRef();
    const i4 = useRef();
1
    const onChange = ({ value, i }, ref) => {
        if (value.trim()) ref.current.focus();
        set(code => ({
            ...code,
            [i]: value,
        }));
    };

    const slide = () => {
        Animated.spring(position, {
            toValue: 1,
            tension: 30,
            useNativeDriver: false,
        }).start();
    };

    useEffect(() => {
        if (start) slide();
    }, [start]);

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    transform: [
                        {
                            translateX: position.interpolate({
                                inputRange: [0, 1],
                                outputRange: [width, 0],
                            }),
                        },
                    ],
                },
            ]}
        >
            <Input 
                value={code.i1}
                onChange={(value) => onChange({ value, i: 'i1'}, i2)}
            />
            <Input
                value={code.i2}
                onChange={(value) => onChange({ value, i: 'i2'}, i3)}
                ref={i2}
            />
            <Input
                value={code.i3}
                onChange={(value) => onChange({ value, i: 'i3'}, i4)}
                ref={i3}
            />
            <Input
                value={code.i4}
                onChange={(value) => onChange({ value, i: 'i4'}, i4)}
                ref={i4}
            />
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginVertical: '3%',
    },
});

export default Passcode;