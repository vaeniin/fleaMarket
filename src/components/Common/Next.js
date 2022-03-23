import React from 'react';
import {
    Pressable,
    StyleSheet,
} from 'react-native';
import Icon from '../../themes/Icons';

const Next = ({ onPress, color, icon, right }) => {
    return (
        <Pressable
            onPress={onPress}
            style={[styles.container, { right: right ? right : 0 }]}
        >
            <Icon
                set='MaterialCommunityIcons'
                name={icon}
                size={52}
                color='#fff'
                style={{ opacity: 0.7, position: 'absolute' }}
            />
            <Icon
                set='MaterialCommunityIcons'
                name={icon}
                size={50}
                color={color}
                style={{ opacity: 0.5 }}
            />
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
    }
});

export default Next;