import React from 'react';
import { useTheme } from '@react-navigation/native';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
} from 'react-native';

import Icon from '../../themes/Icons';

const Header = ({ title, color, search, navigation }) => {

    const { colors } = useTheme();
    
    return (
        <View style={styles.container}>
            <Text style={[styles.title, { color }]} numberOfLines={1}>{title}</Text>
            <TextInput
                value={search}
                style={[styles.input, { borderColor: color, color: colors.title }, { flex: title !== 'Home' ? 1 : 2}]}
                placeholder='Search'
                onChangeText={(value) => navigation.setParams({ search: value })}
            />
            <Icon set='Ionicons' name='search' size={30} color={color} style={styles.icon} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        flex: 1,
        fontSize: 20,
        fontWeight: 'bold',
    },
    input: {
        borderBottomWidth: 1,
        padding: '1%',
    },
    icon: {
        flex: 1,
    },
});

export default Header;