import React, { useState } from 'react';
import { useTheme } from '@react-navigation/native';
import {
    View,
    Text,
    TextInput,
    ScrollView,
    StyleSheet,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Button from '../Common/Button';
import { addChat } from '../../store/actions/userActions';

const MessageBox = ({ close }) => {

    const { colors } = useTheme();
    const dispatch = useDispatch();
    const details = useSelector(state => state.item.details);

    const [message, setMessage] = useState();

    const onSubmit = () => {
        if (message) {
            dispatch(addChat({ getterId: details.userId, itemId: details.id, content: message }));
            close();
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={[styles.rowContainer, { alignItems: 'center' }]}>
                    <Text style={{ color: colors.primary, fontWeight: 'bold' }}>To:</Text>
                    <TextInput
                        value={details.user}
                        editable={false}
                        style={{ color: colors.primary }}
                    />
                </View>
                <TextInput
                    value={message}
                    onChangeText={setMessage}
                    multiline={true}
                    numberOfLines={8}
                    textAlignVertical='top'
                    placeholder='Write a message'
                    style={[styles.input, { borderColor: colors.primary, color: colors.title }]}
                />
                <View style={styles.rowContainer}>
                    <Button
                        onPress={close}
                        style={{ flex: 1, marginHorizontal: '1%' }}
                    >
                        <Text style={{ color: colors.btn }}>Close</Text>
                    </Button>
                    <Button
                        onPress={onSubmit}
                        style={{ flex: 1, marginHorizontal: '1%' }}
                    >
                        <Text style={{ color: colors.btn }}>Send</Text>
                    </Button>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: '2%',
        paddingVertical: '3%',
    },
    input: {
        borderWidth: 1,
        borderRadius: 10,
        paddingTop: '2%',
        paddingLeft: '2%',
        paddingRight: '2%',
        paddingBottom: '2%',
    },
    rowContainer: {
        flexDirection: 'row',
    },
});

export default MessageBox;