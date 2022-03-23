import React, { useEffect, useState } from 'react';
import { useTheme } from '@react-navigation/native';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TextInput,
    Image,
    Pressable,
    RefreshControl,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { launchImageLibrary } from 'react-native-image-picker';

import { width, height } from '../../../themes/Theme';
import { formatDate } from '../../../utils/functions';
import { sendMessage, getMessages, getChats } from '../../../store/actions/userActions';

import Button from '../../Common/Button';
import Icon from '../../../themes/Icons';
import Alert from '../../Common/Alert';
import Zoom from '../../Common/Zoom';
import CustomImage from '../../Common/CustomImage';
import { HOST } from '@env';

const Chat = () => {

    const { colors } = useTheme();
    const dispatch = useDispatch();
    const messages = useSelector(state => state.user.messages);
    const id = useSelector(state => state.user.id);
    const loading = useSelector(state => state.general.loading);

    const [input, setInput] = useState('');
    const [file, setFile] = useState(null);
    const [alert, setAlert] = useState();
    const [zoom, setZoom] = useState();

    const onSend = () => {
        if (input.trim() || file) {
            dispatch(sendMessage(file, { senderId: id, content: input, chatId: messages[0].chatId }));
            setFile();
            setInput('');
        }
    };

    const onCamera = () => {
        const options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
            mediaType: 'photo',
            selectionLimit: 1,
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) return;
            else if (response.errorCode == 'camera_unavailable') {
                setAlert('Camera not available on device');
                return;
            } else if (response.errorCode == 'permission') {
                setAlert('Permission not satisfied');
                return;
            } else if (response.errorCode == 'others') {
                setAlert(response.errorMessage);
                return;
            }

            const file = response.assets[0];
            setFile(file);
        });
    };

    const renderItem = ({ item }) => {
        const result = item.senderId === id;

        return (
            <View style={[
                styles.message,
                {
                    borderBottomRightRadius: result ? 0 : 10,
                    borderBottomLeftRadius: result ? 10 : 0,
                    marginRight: result ? '3%' : '14%',
                    marginLeft: result ? '14%' : '3%',
                    backgroundColor: result ? colors.primary : colors.message,
                }
            ]}>
                {item.image &&
                    <Pressable onPress={() => setZoom({...item.image, uri: `${HOST}/images/${item.senderId}/${item.image.name}`})}>
                        <CustomImage
                            file={item.image}
                            userId={item.senderId}
                        />
                    </Pressable>
                }
                <Text style={{ color: colors.title }}>{item.content}</Text>
                <Text style={styles.date}>{formatDate(item.date)}</Text>
            </View>
        );
    };

    const refreshControl =
        <RefreshControl
            colors={[colors.primary]}
            refreshing={loading}
            onRefresh={() => dispatch(getMessages(messages[0].chatId))}
        />;

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {zoom && 
                <Zoom
                    file={zoom}
                    close={() => setZoom()}
                />
            }
            <FlatList
                data={messages}
                renderItem={renderItem}
                refreshControl={refreshControl}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
                inverted
            />
            {file &&
                <Pressable onPress={() => setZoom(file)}>
                    <Image
                        source={{ uri: file.uri }}
                        style={{
                            width: Math.min(file.width, width * 0.7),
                            height: Math.min(file.height, 0.2 * height),
                            resizeMode: 'contain'
                        }}
                    />
                </Pressable>
            }
            <View style={styles.inputContainer}>
                <TextInput
                    style={[styles.input, { borderTopColor: colors.primary, color: colors.title }]}
                    placeholder='Write a message here...'
                    value={input}
                    onChangeText={setInput}
                />
                <Button
                    style={{ flex: 1, borderRadius: 0, elevation: 0 }}
                    onPress={onSend}
                >
                    <Text style={{ color: colors.btn }}>Send</Text>
                </Button>
                <Button
                    onPress={onCamera}
                    style={{ flex: 1, borderRadius: 0, elevation: 0 }}
                >
                    <Icon
                        set='MaterialCommunityIcons'
                        size={25}
                        name='camera'
                        color={colors.btn}
                    />
                </Button>
            </View>
            {alert && 
                <Alert
                    title='Problem'
                    subtitle={alert}
                    buttons={[{ content: <Text style={{ color: colors.btn }}>OK</Text>, onPress: () => setAlert() }]}
                />
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flexGrow: 1,
        justifyContent: 'flex-end'
    },
    message: {
        marginVertical: '3%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        padding: '3%',
        elevation: 2,
    },
    date: {
        textAlign: 'right',
        color: '#fff',
    },
    inputContainer: {
        flexDirection: 'row',
    },
    input: {
        flex: 4,
        borderTopWidth: 1,
        marginTop: '3%',
        paddingHorizontal: '3%'
    },
});

export default Chat;