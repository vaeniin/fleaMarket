import React from 'react';
import { useTheme } from '@react-navigation/native';
import {
    View,
    Text,
    StyleSheet,
    Pressable,
} from 'react-native';

import Icon from '../../themes/Icons';
import CustomImage from '../Common/CustomImage';

const ItemTitle = ({ item, onPress, horizontal }) => {
    
    const { colors } = useTheme();

    return (
        <Pressable 
            style={({ pressed }) => [styles.container, {
                backgroundColor: colors.image,
                borderColor: colors.btn,
                opacity: pressed ? 0.8 : 1,
                marginHorizontal: horizontal ? 5 : '3%',
                marginBottom: horizontal ? 5 : '3%',
            }]}
            onPress={() => onPress(item.id)}
        >
            {item.images?.length > 0 ?
                <CustomImage
                    file={item.images[0]}
                    style={{...styles.image, borderColor: colors.btn, resizeMode: 'cover' }}
                    userId={item.userId}
                />
            :
                <Icon
                    set='Foundation'
                    name='prohibited'
                    size={100}
                    color='#bdbdba'
                    style={{ textAlign: 'center' }}
                />
            }
            <View style={styles.captionContainer}>
                <Text style={[styles.caption, { color: colors.caption }]} numberOfLines={1}>
                            {item.heading}
                    </Text>
                <Text style={[styles.caption, { color: colors.caption }]}>
                    {item.price}
                </Text>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 150,
        height: 150,
        borderWidth: 1,
        borderRadius: 10,
        elevation: 5,
        justifyContent: 'flex-end',
    },
    captionContainer: {
        paddingHorizontal: '2%',
        paddingBottom: '2%',
        backgroundColor: '#000',
        opacity: 0.5,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    caption: {
        fontSize: 17,
    },
    image: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: 10,
        borderWidth: 1,
    },
});

export default ItemTitle;