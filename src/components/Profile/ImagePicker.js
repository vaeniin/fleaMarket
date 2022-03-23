import React, { useState } from 'react';
import { useTheme } from '@react-navigation/native';
import {
    Text,
    View,
    Image,
    ScrollView,
    Pressable,
    StyleSheet,
} from 'react-native';
import { useSelector } from 'react-redux';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { GestureDetector, Gesture, GestureHandlerRootView } from 'react-native-gesture-handler';

import { HOST } from '@env';
import Alert from '../Common/Alert';
import Button from '../Common/Button';
import Icon from '../../themes/Icons';

const ImagePicker = ({ images, setImages }) => {

    const { colors } = useTheme();
    const id = useSelector(state => state.user.id);

    const [alert, setAlert] = useState();
    const [name, setName] = useState();

    const onCamera = () => {
        const options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
            mediaType: 'photo',
        };

        launchCamera(options, (response) => {
            if (response.didCancel) return;
            else if (response.errorCode == 'camera_unavailable') {
                setAlert({ title: 'Error', subtitle: 'Camera not available on device'});
                return;
            } else if (response.errorCode == 'permission') {
                setAlert({ title: 'Error', subtitle: 'Permission not satisfied'});
                return;
            } else if (response.errorCode == 'others') {
                setAlert({ title: 'Error', subtitle: response.errorMessage});
                return;
            }

            if (images.length < 3) {
                const files = response.assets.map((asset) => ({
                    uri: asset.uri,
                    name: new Date().getTime() + '.jpg',
                    type: asset.type,
                    width: asset.width,
                    height: asset.height,
                }));
                setImages(i => [...i, ...files]);
            } else {
                setAlert({title: 'Limit', subtitle: 'Only up to 3 images allowed! Long press to remove image.'});
            }
        });
    };

    const onGallery = () => {
        const options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
            mediaType: 'photo',
            selectionLimit: 3,
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) return;
            else if (response.errorCode == 'camera_unavailable') {
                setAlert({ title: 'Error', subtitle: 'Camera not available on device'});
                return;
            } else if (response.errorCode == 'permission') {
                setAlert({ title: 'Error', subtitle: 'Permission not satisfied'});
                return;
            } else if (response.errorCode == 'others') {
                setAlert({ title: 'Error', subtitle: response.errorMessage});
                return;
            }

            if (
                response.assets.length < 3 &&
                images.length < 3 &&
                response.assets.length + images.length < 4
            ) {
                const files = response.assets.map((asset, i) => ({
                    uri: asset.uri,
                    name: new Date().getTime() + i + '.jpg',
                    type: asset.type,
                    width: asset.width,
                    height: asset.height,
                }));
                setImages(i => [...i, ...files]);
            } else if (response.assets.length === 3) {
                const files = response.assets.map((asset, i) => ({
                    uri: asset.uri,
                    name: new Date().getTime() + i + '.jpg',
                    type: asset.type,
                    width: asset.width,
                    height: asset.height,
                }));
                setImages(files);
            } else {
                setAlert({title: 'Limit', subtitle: 'Only up to 3 images allowed! Long press to remove image.'});
            }
        });
    };

    const removeImage = () => {
        setImages(i => i.filter(i => i.name !== name));
        setAlert();
    }

    const setUri = (image) => {
        if (image.uri) return image.uri;
        else return `${HOST}/images/${id}/${image.name}`;
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={styles.container}>
                <ScrollView horizontal={true}>
                    {images.map((image, i) =>
                        <GestureDetector
                            key={i}
                            gesture={Gesture.LongPress({ minDuration: 200 }).onEnd((e, success) => {
                                if (success) {
                                    setName(image.name);
                                    setAlert({ title: 'Remove Image', subtitle: 'Do you want to remove selected image?'});
                                };
                            })}
                        >
                            <Pressable onPress={() => setName(image.name)}>
                                <Image
                                    source={{ uri: setUri(image) }}
                                    style={styles.image}
                                />
                            </Pressable>
                        </GestureDetector>
                    )}
                </ScrollView>
                <View style={styles.buttonsContainer}>
                    <Button
                        style={{ flex: 1, marginHorizontal: '1%' }}
                        onPress={onGallery}
                    >
                        <Icon
                            set='MaterialCommunityIcons'
                            size={20}
                            name='upload'
                            color={colors.btn}
                        />
                    </Button>
                    <Button
                        style={{ flex: 1, marginHorizontal: '1%' }}
                        onPress={onCamera}
                    >
                        <Icon
                            set='MaterialCommunityIcons'
                            size={20}
                            name='camera'
                            color={colors.btn}
                        />
                    </Button>
                </View>
                {alert &&
                    <Alert
                        title={alert.title}
                        subtitle={alert.subtitle}
                        buttons={[
                            alert.title === 'Error' || alert.title === 'Limit' ? { content: <Text style={{ color: colors.btn }}>OK</Text>, onPress: () => setAlert() }
                            :
                            { content: <Text style={{ color: colors.btn }}>Cancel</Text>, onPress: () => setAlert() },
                            { content: <Text style={{ color: colors.btn }}>OK</Text>, onPress: removeImage }
                        ]}
                    />
                }
            </View>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginBottom: '3%',
    },
    buttonsContainer: {
        flexDirection: 'row',
    },
    image: {
        width: 150,
        height: 150,
        marginHorizontal: 2,
    },
});

export default ImagePicker;