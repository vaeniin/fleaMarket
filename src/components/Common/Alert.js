import React from 'react';
import { useTheme } from '@react-navigation/native';
import {
    View,
    Text,
    Modal,
    StyleSheet,
} from 'react-native';

import Button from './Button';
import CustomText from './CustomText';

const Alert = ({ visible, title, subtitle, buttons }) => {

    const { dark, colors } = useTheme();

    return (
        <Modal visible={visible} transparent>
            <View style={styles.modal}>
                <View style={[styles.container, { backgroundColor: dark ? '#a0a0a0' : colors.background }]}>
                    <CustomText style={styles.title}>{title}</CustomText>
                    <Text>{subtitle}</Text>
                    <View style={styles.buttonContainer}>
                        {buttons.map((btn, i) =>
                            <Button
                                key={i}
                                style={{ flex: 1, marginHorizontal: '1%' }}
                                onPress={btn.onPress}
                            >
                                {btn.content}
                            </Button>
                        )}
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        borderRadius: 5,
        padding: '3%',
        elevation: 5,
        width: '50%',
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 17,
        marginBottom: '1%',
    },
});

export default Alert;