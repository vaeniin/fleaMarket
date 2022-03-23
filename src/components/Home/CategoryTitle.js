import React from 'react';
import { useTheme } from '@react-navigation/native';
import {
    Text,
    StyleSheet,
    Pressable,
} from 'react-native';

import { width } from '../../themes/Theme';
import Icon from '../../themes/Icons';

const CategoryTitle = ({ item, onPress }) => {

    const { colors } = useTheme();

    return (
        <Pressable 
            style={({ pressed }) => [styles.container, {
                backgroundColor: item.color,
                borderColor: colors.btn,
                opacity: pressed ? 0.8 : 1,
            }]}
            onPress={() => onPress(item)}
        >
            <Icon
                set={item.set}
                name={item.name}
                size={0.09 * width}
                color={colors.caption}
            />
            <Text style={[styles.caption, { color: colors.caption }]}>
                {item.title}
            </Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 0.3 * width,
        height: 0.3 * width,
        borderWidth: 1,
        borderRadius: 0.03 * width,
        elevation: 5,
        marginHorizontal: 0.014 * width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    caption: {
        fontSize: 15,
    },
});

export default CategoryTitle;