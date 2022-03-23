import React, { Fragment, useState } from 'react';
import { useTheme } from '@react-navigation/native';
import {
    View,
    StyleSheet,
    Pressable,
    ScrollView,
    Text,
    Animated
} from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';

import Button from './Button';
import CustomText from './CustomText';
import CustomImage from './CustomImage';
import Next from './Next';
import Icon from '../../themes/Icons';
import { TYPES } from '../../utils/constants';
import { formatDate, setLocation } from '../../utils/functions';
import Zoom from './Zoom';
import { HOST } from '@env';

const Details = ({
    details,
    openMessage,
    visible,
    opacity,
    navigate,
    search,
    hideSend,
}) => {

    const { colors } = useTheme();

    const [index, setIndex] = useState(0);
    const [zoom, setZoom] = useState(false);

    const nextImage = () => {
        let next = index + 1;
        if (next > details.images.length - 1) next = 0;
        setIndex(next);
    }

    const longPressGesture = Gesture.LongPress({ minDuration: 200 }).onEnd((e, success) => {
        if (success) setZoom(true);
    });

    const setUri = () => {
        let uri = `${HOST}/images/${details.userId}/${details.images[index].name}`;
        if (details.images[index].uri) uri = details.images[index].uri;
        return uri;
    };

    return (
        <View style={styles.container}>
            {zoom &&
                <Zoom
                    file={{...details.images[index], uri: setUri()}}
                    close={() => setZoom(false)}
                >
                    {details.images.length > 1 && 
                        <Next
                            onPress={nextImage}
                            color='#fff'
                            icon='forward'
                        />
                    }
                </Zoom>
            }
            {details.images?.length > 0 ?
                <View style={{ backgroundColor: colors.image, borderTopLeftRadius: 5, borderTopRightRadius: 5 }}>
                    <GestureDetector gesture={longPressGesture}>
                        <CustomImage
                            file={details.images[index]}
                            style={{ alignSelf: 'center' }}
                            userId={details.userId}
                        />
                    </GestureDetector>
                    {details.images.length > 1 && 
                        <Next
                            onPress={nextImage}
                            color='#000'
                            icon='forward'
                        />
                    }
                </View>
            :
                <Icon
                    set='Foundation'
                    name='prohibited'
                    size={120}
                    color='#bdbdba'
                    style={[styles.icon, { backgroundColor: colors.image }]}
                />
            }
            <View style={styles.info}>
                <CustomText numberOfLines={2} style={styles.title}>{details.heading}</CustomText>
                <View style={styles.prices}>
                    <CustomText style={styles.title}>{details.price}</CustomText>
                    <CustomText style={{ ...styles.title, ...styles.oldPrice }}>{details.oldprice}</CustomText>
                </View>
            </View>
            <View style={styles.info}>
                <CustomText>Type: {TYPES.filter(t => t.value === details.type)[0]?.title}</CustomText>
                <CustomText style={{ textTransform: 'none' }}>Listed on {formatDate(details.date)}</CustomText>
            </View>
            <View style={styles.info}>
                <View style={{ flexDirection: 'row' }}>
                    <CustomText>Lister: </CustomText>
                    <Pressable>
                        <CustomText onPress={() => navigate && navigate({ title: details.user, user: details.userId })}>{details.user}</CustomText>
                    </Pressable>
                </View>
                <CustomText>Location: {setLocation(details.location)}</CustomText>
            </View>
            <View style={styles.info}>
                <CustomText>Methods: {details.methods?.join(', ') || '-'}</CustomText>
                <CustomText>Condition: {details.condition || '-'}</CustomText>
            </View>
            <ScrollView style={styles.indent} showsVerticalScrollIndicator={true}>
                <CustomText style={{ textTransform: 'none' }}>{details.description}</CustomText>
            </ScrollView>
            <View style={styles.indent}>
                {visible &&
                    <Animated.View style={{ opacity }}>
                        <View style={styles.tagsContainer}>
                            <CustomText>Categories: </CustomText>
                            {details.categories?.map((value, i) =>
                                <Fragment key={i}>
                                    <Pressable onPress={() => navigate && navigate({ title: value })}>
                                        <Text style={styles.category}>{value}</Text>
                                    </Pressable>
                                    <CustomText>{i < details.categories?.length - 1 ? ', ' : ''}</CustomText>
                                </Fragment>
                            )}
                        </View>
                        <View style={styles.tagsContainer}>
                            <CustomText>Tags: {!details.tags?.length && '-'}</CustomText>
                            {details.tags?.map((value, i) =>
                                <Pressable
                                    key={i}
                                    style={styles.tagContainer}
                                    onPress={() => search && search(value)}
                                >
                                    <Text style={styles.tag}>{value}</Text>
                                </Pressable>
                            )}
                        </View>
                    </Animated.View>
                }
                {!hideSend &&
                    <Button onPress={openMessage}>
                        <Text style={{ color: colors.btn, paddingRight: '2%' }}>Send message</Text>
                        <Icon
                            set='FontAwesome'
                            name='envelope'
                            size={20}
                            color={colors.btn}
                        />
                    </Button>
                }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    icon: {
        textAlign: 'center',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    info: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: '2%',
    },
    prices: {
        flex: 1,
        justifyContent: 'flex-end',
        flexDirection: 'row'
    },
    title: {
        fontSize: 20,
        maxWidth: '70%',
        textTransform: 'none',
    },
    oldPrice: {
        textDecorationLine: 'line-through',
        color: '#ff0000',
        paddingLeft: '1%',
    },
    indent: {
        padding: '3%'
    },
    tagsContainer: {
        flexDirection: 'row',
    },
    tagContainer: {
        backgroundColor: '#c1e1ec',
        borderColor: '#c1e1ec',
        borderRadius: 5,
        borderWidth: 1,
        paddingHorizontal: '2.5%',
        marginRight: '1.5%',
        elevation: 2,
    },
    category: {
        textDecorationLine: 'underline',
        color: '#3366bb',
        fontWeight: 'bold',
        marginBottom: '5%',
    },
    tag: {
        color: '#3366bb',
    },
});

export default Details;