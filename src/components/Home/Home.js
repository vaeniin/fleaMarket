import React, { useState, useEffect } from 'react';
import { useTheme, useIsFocused } from '@react-navigation/native';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Filter from './Filter';
import Scroll from './Scroll';
import CategoryTitle from './CategoryTitle';
import ItemTitle from './ItemTitle';

import { CATEGORIES } from '../../utils/constants';
import { getItems, getItem } from '../../store/actions/itemActions';

const Home = ({ navigation, route }) => {

    const { colors } = useTheme();
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const items = useSelector(state => state.item.items);

    const [searching, setSearching] = useState(false);
    const [location, setLocation] = useState('all');
    const [type, setType] = useState('all');
    const [page, setPage] = useState(0);

    useEffect(() => {
        if (route.params?.search) setSearching(true);
        else setSearching(false);

        setPage(0);

        if (isFocused) {
            dispatch(getItems({
                text: route.params?.search,
                location: location === 'all' ? null : location,
                type: type === 'all' ? null : type,
                page
            }));
        }
    }, [route.params, type, location, isFocused, page]);

    const openCategory = ({ title, color }) => {
        navigation.navigate('Category', { title, color });
    };

    const openDetails = (id) => {
        dispatch(getItem(id, 'home'));
    };

    const renderCategory = ({ item }) => <CategoryTitle item={item} onPress={openCategory} />;
 
    const renderItem = ({ item }) => 
        <ItemTitle
            item={item}
            onPress={openDetails}
            horizontal={!searching}
        />;

    const onEndReached = () => {
        if (searching) setPage(p => p + 1);
    };

    return (
        <View style={styles.container}>
            <Filter
                location={location}
                setLocation={setLocation}
                setType={setType}
                type={type}
            />
            <Scroll
                title={searching ? 'Filtered' : 'Newest'}
                data={items}
                renderItem={renderItem}
                horizontal={!searching}
                color={colors.primary}
                onEnd={onEndReached}
            />
            {!searching &&
                <Scroll
                    title='Categories'
                    data={CATEGORIES}
                    renderItem={renderCategory}
                    horizontal={true}
                    color={colors.primary}
                />
            }
            {searching  && items.length < 1 &&
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
        paddingBottom: '20%'
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
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

export default Home;