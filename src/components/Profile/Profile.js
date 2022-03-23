import React,{ useEffect } from 'react';
import { useTheme } from '@react-navigation/native';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import CustomText from '../Common/CustomText';
import Button from '../Common/Button';
import Message from '../Common/Message';
import { LABELS, PROFILESPAGES } from '../../utils/constants';
import { getChats, getMessages } from '../../store/actions/userActions';
import { compareDates } from '../../utils/functions';

const Profile = ({ navigation }) => {

    const { colors } = useTheme();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const chats = useSelector(state => state.user.chats);

    useEffect(() => {
        dispatch(getChats());
    }, []);

    const navigate = (route, title) => navigation.navigate(route, { title }); 

    const navigateToChat = (receiver, title, id, itemId) => {
        dispatch(getMessages(id));
        navigation.navigate('Chat', { receiver, title, id: itemId });
    }

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentContainerStyle}
            style={[styles.container, { backgroundColor: colors.background }]}
        >
            <View style={[styles.userInfoContainer, { backgroundColor: colors.inbox, borderColor: colors.primary }]}>
                <CustomText style={{...styles.title, textAlign: 'center' }}>Account info</CustomText>
                {LABELS.map((label, i) => 
                    <View key={i} style={styles.labelContainer}>
                        <CustomText style={{ fontWeight: 'bold' }}>{label}: </CustomText>
                        <CustomText numberOfLines={1} style={{ flex: 1, textTransform: 'none' }}>{user[`${label.replace(/\s/g,'')}`] || '-'}</CustomText>
                    </View>
                )}
                <Button onPress={() => navigate('Edit', { title: 'Edit' })}>
                    <Text style={{ color: colors.btn }}>Edit</Text>
                </Button>
            </View>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >
                {chats.map(chat => {
                    const senderId = chat.message?.senderId;
                    const date = chat.message?.date; 
                    const show = senderId === user.id ? false : compareDates(chat.lastOpened, date);

                    if (show) return (
                        <Message
                            key={chat.id}
                            scroll={true}
                            onPress={() => navigateToChat(chat.name, chat.heading, chat.id, chat.itemId)}
                            heading={chat.heading}
                            receiver={chat.name}
                            message={chat.message?.content}
                            date={date}
                            show={show}
                            style={{ width: 200 }}
                        />
                    )}
                )}
            </ScrollView>
            {PROFILESPAGES.map((p, i) => 
                <Button
                    key={i}
                    style={{ width: '90%' }}
                    onPress={() => navigate(p.to, p.title)}
                >
                    <Text style={{ color: colors.btn }}>{p.title}</Text>
                </Button>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainerStyle: {
        alignItems: 'center',
        paddingBottom: '2%',
    },
    userInfoContainer: {
        width: '80%',
        borderWidth: 1,
        borderRadius: 5,
        padding: '3%',
        marginVertical: '3%',
        elevation: 5,
    },
    labelContainer: {
        flexDirection: 'row',
    },
    title: {
        fontWeight: 'bold',
        marginBottom: '2%',
    }
});

export default Profile;