import React, { useEffect, useState } from 'react';
import { useTheme, useIsFocused } from '@react-navigation/native';
import {
    Text,
    View,
    StyleSheet,
    FlatList,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Icon from '../../themes/Icons';
import Button from '../Common/Button';
import Alert from '../Common/Alert';
import { formatDate } from '../../utils/functions';
import { deleteItem, editItem, getItems } from '../../store/actions/itemActions';

const Listings = ({ navigation }) => {

    const { colors } = useTheme();
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const items = useSelector(state => state.item.items);
    const id = useSelector(state => state.user.id);

    const [alert, setAlert] = useState();

    useEffect(() => {
        if (isFocused) dispatch(getItems({ user: id }));
    }, [isFocused]);

    const onRemove = (item) => setAlert({
        subtitle: `Are you sure you want to remove "${item.heading}"?`,
        btns: [
            { content: <Text style={{ color: colors.btn }}>Cancel</Text>, onPress: () => setAlert()},
            { content: <Text style={{ color: colors.btn }}>Yes</Text>, onPress: () => {
                dispatch(deleteItem(item.id));
                setAlert();
            }},
        ]
    });

    const onEdit = (item) => {
        dispatch(editItem(item.id));
    };

    const renderItem = ({ item }) =>
        <View style={[styles.itemContainer, { borderColor: colors.primary }]}>
            <View style={styles.header}>
                <Text
                    numberOfLines={1}
                    style={[styles.title, { color: colors.title }]}
                >
                    {item.heading}
                </Text>
                <View style={styles.buttons}>
                    <Button
                        style={{ backgroundColor: 'transparent', elevation: 0 }}
                        onPress={() => onEdit(item)}
                    >
                        <Icon
                            set='MaterialIcons'
                            name='edit'
                            size={20}
                            color={colors.primary}
                        />
                    </Button>
                    <Button
                        style={{ backgroundColor: 'transparent', elevation: 0 }}
                        onPress={() => onRemove(item)}
                    >
                        <Icon
                            set='MaterialIcons'
                            name='delete'
                            size={20}
                            color={colors.title}
                        />
                    </Button>
                </View>
            </View>
            <Text style={{ textAlign: 'right' }}>Created on {formatDate(item.date)}</Text>
        </View>;

    return (
        <View style={styles.container}>
            <FlatList
                data={items}
                keyExtractor={item => item.id}
                renderItem={renderItem}
            />
            {alert && <Alert
                title='Remove'
                subtitle={alert.subtitle}
                buttons={alert.btns}
            />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    itemContainer: {
        borderWidth: 1,
        borderRadius: 8,
        marginHorizontal: '8%',
        marginVertical: '5%',
        paddingHorizontal: '3%',
        paddingVertical: '2%',
    },
    title: {
        fontSize: 20,
        maxWidth: '80%',
    },
    buttons: {
        flexDirection: 'row',
    }
});

export default Listings;