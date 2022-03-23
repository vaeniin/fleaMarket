import React, { useEffect } from 'react';
import { useTheme } from '@react-navigation/native';
import {
    View,
    StyleSheet,
    FlatList,
    RefreshControl,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { getChats, getMessages } from '../../store/actions/userActions';
import { compareDates  } from '../../utils/functions';
import Message from '../Common/Message';

const Inbox = ({ navigation }) => {

    const { colors } = useTheme();
    const dispatch = useDispatch();
    const chats = useSelector(state => state.user.chats);
    const id = useSelector(state => state.user.id);
    const loading = useSelector(state => state.general.loading);

    const navigate = ({ id, itemId, heading, name}) => {
        dispatch(getMessages(id));
        navigation.navigate('Chat', { receiver: name, title: heading, id: itemId });
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('beforeRemove', () => {
            dispatch(getChats());
            unsubscribe();
        });
    });

    const renderItem = ({ item }) => {
        const senderId = item.message?.senderId;
        const date = item.message?.date; 
        const show = senderId === id ? false : compareDates(item.lastOpened, date);
        return <Message
            onPress={() => navigate(item)}
            heading={item.heading}
            receiver={item.name}
            message={item.message?.content}
            date={item.message?.date}
            show={show}
        />
    };

    const refreshControl =
        <RefreshControl
            colors={[colors.primary]}
            refreshing={loading}
            onRefresh={() => dispatch(getChats())}
        />;

    return (
        <View style={styles.container}>
            <FlatList
                data={chats}
                renderItem={renderItem}
                refreshControl={refreshControl}
                keyExtractor={item => item.id}
                decelerationRate={0.1}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Inbox;