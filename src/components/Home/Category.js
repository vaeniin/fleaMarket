import React, { useEffect, useState } from 'react';
import { useTheme } from '@react-navigation/native';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Filter from './Filter';
import Scroll from './Scroll';
import ItemTitle from './ItemTitle';

import { getItems, getItem } from '../../store/actions/itemActions';

const Category = ({ navigation, route }) => {

    const { colors } = useTheme();
    const dispatch = useDispatch();
    const items = useSelector(state => state.item.items);
    
    const [location, setLocation] = useState('all');
    const [type, setType] = useState('all');
    const [page, setPage] = useState(0);

    useEffect(() => {
        navigation.addListener('beforeRemove', (e) => {
            dispatch(getItems({ action: e.data.action }));
        });
    }, []);

    useEffect(() => {
        setPage(0);

        dispatch(getItems({
            category: route.params.title,
            text: route.params?.search,
            user: route.params?.user,
            location: location === 'all' ? null : location,
            type: type === 'all' ? null : type,
            page,
        }));
    }, [route.params, type, location, page]);

    const openDetails = (id) => {
        dispatch(getItem(id, 'category'));
    };

    const renderItem = ({ item }) => 
        <ItemTitle
            item={item}
            onPress={openDetails}
        />;

    const onEndReached = () => {
        setPage(p => p + 1);
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Filter
                location={location}
                setLocation={setLocation}
                setType={setType}
                type={type}
            />
            <Scroll
                data={items}
                renderItem={renderItem}
                onEnd={onEndReached}
            />
            {items.length < 1 &&
                <View style={styles.notfound}>
                    <Text style={[styles.notfoundText, { color: colors.title }]}>
                        No listings found!
                    </Text>
                    <Text style={[styles.notfoundSubtext, { color: colors.title }]}>
                        Maybe try something else.
                    </Text>
                </View>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    notfound: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    notfoundText: {
        fontSize: 20,
        opacity: 0.6,
    },
    notfoundSubtext: {
        fontSize: 15,
        opacity: 0.6,
    },
});

export default Category;