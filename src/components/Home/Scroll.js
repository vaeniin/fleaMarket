import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
} from 'react-native';

const Scroll = ({
    data,
    renderItem,
    horizontal,
    title,
    color,
    onEnd,
}) => {

    return (
        <View style={styles.container}>
            {title && <Text style={[styles.title, { color: color }]}>{title}</Text>}
            <FlatList
                key={horizontal ? 'h' : 'v'}
                data={data}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                horizontal={horizontal}
                showsHorizontalScrollIndicator={false}
                automaticallyAdjustContentInsets={false}
                numColumns={horizontal ? 0 : 2}
                decelerationRate={0.1}
                onEndReached={({ distanceFromEnd }) => {
                    if (distanceFromEnd < 0) return;
                    else if (onEnd) onEnd();
                }}
                onEndReachedThreshold={0.5}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: '3%',
    },
    title: {
        marginHorizontal: '3%',
        marginBottom: '2%',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default Scroll;