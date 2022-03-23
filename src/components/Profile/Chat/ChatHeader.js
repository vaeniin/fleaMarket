import React from 'react';
import { useTheme } from '@react-navigation/native';
import {
    View,
    Text,
    StyleSheet,
    Pressable,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { getItem } from '../../../store/actions/itemActions';

const ChatHeader = ({ id, title, receiver }) => {

    const { colors } = useTheme();
    const dispatch = useDispatch();

    const openDetails = () => {
        dispatch(getItem(id, 'home'));
    };

    return (
        <View style={styles.container}>
            <Text style={[styles.user, { color: colors.title }]}>{receiver}</Text>
            <Pressable
                style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}
                onPress={openDetails}
            >
                <Text
                    numberOfLines={1}
                    style={[styles.title, { color: colors.primary }]}
                >
                    {title}
                </Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '95%',
        marginLeft: '-5%',
    },
    user: {
        fontSize: 17,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ChatHeader;