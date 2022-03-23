import React from 'react';
import { useTheme } from '@react-navigation/native';
import {
    View,
    StyleSheet,
    Pressable,
} from 'react-native';

import CustomText from './CustomText';

const RadioButton = ({ options, selected, setSelected, horizontal }) => {

    const { colors } = useTheme();

    return (
        <View style={{ flexDirection: horizontal ? 'row' : 'column' }}>
            {options.map((option, i) => (
                <View key={i} style={styles.container}>
                    <CustomText>{option}</CustomText>
                    <Pressable
                        style={[styles.circle, { borderColor: colors.primary }]}
                        onPress={() => setSelected(option)}
                    >
                        {selected === option && (
                            <View style={[styles.selected, { backgroundColor: colors.primary }]} />
                        )}
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
    circle: {
        height: 15,
        width: 15,
        borderRadius: 10,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 2,
    },
    selected: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
});

export default RadioButton;