import React from 'react';
import { useTheme } from '@react-navigation/native';
import {
    View,
    Text,
    StyleSheet,
    Pressable,
} from 'react-native';

import Icon from '../../themes/Icons';
import { width } from '../../themes/Theme';
import { formatDate } from '../../utils/functions';

const Message = ({
    scroll,
    onPress,
    heading,
    receiver,
    message,
    date,
    show,
    style
}) => {

    const { colors } = useTheme();

    return (
        <Pressable
            style={({ pressed}) => [
                styles.container,
                { 
                    opacity: pressed ? 0.8 : 1,
                    borderColor: colors.primary,
                    backgroundColor: colors.inbox,
                    marginHorizontal: scroll ? width * 0.02 : '5%',
                    ...style,
                }
            ]}
            onPress={onPress}
        >
            {show &&
                <Icon
                    set='FontAwesome'
                    name='exclamation'
                    size={36}
                    color='#ff0000'
                    style={{ position: 'absolute', top: '-10%', zIndex: 1 }}
                />
            }
            <View style={styles.header}>
                <Icon
                    set='FontAwesome'
                    name='envelope'
                    size={36}
                    color={colors.message}
                />
                <Text
                    numberOfLines={1}
                    style={{ color: colors.title }}
                >
                        {' '}{receiver}
                </Text>
                <Text
                    numberOfLines={1}
                    style={{ color: colors.primary, fontWeight: 'bold', flexShrink: 1 }}
                >
                        {' '}{heading}
                </Text>
            </View>
            <Text numberOfLines={2} style={{ color: colors.title }}>{message || '{ image }'}</Text>
            <View style={styles.date}>
                <Text>{formatDate(date)}</Text>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: width * 0.01,
        marginVertical: width * 0.02,
        elevation: 5,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    date: {
        alignItems: 'flex-end',
    },
});

export default Message;