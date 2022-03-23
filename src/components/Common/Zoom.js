import React from 'react';
import {
    StyleSheet,
    Pressable,
    Image
} from 'react-native';

import { width, height } from '../../themes/Theme';

const Zoom = ({ file, close, children }) => {
    return (
        <Pressable
            style={styles.container}
            onPress={close}
        >
            <Image 
                source={{ uri: file.uri }}
                style={{
                    width: Math.min(file.width, width),
                    height: Math.min(file.height, height * 0.6),
                    resizeMode: 'contain'
                }}
            />
            {children}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#000',
        opacity: 0.9,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Zoom;