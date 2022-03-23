import React, { useState, useEffect } from 'react';
import { useTheme } from '@react-navigation/native';
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Picker } from '@react-native-picker/picker';
import { GestureDetector, Gesture, GestureHandlerRootView } from 'react-native-gesture-handler';

import Alert from '../Common/Alert';
import Input from '../Common/Input';
import Button from '../Common/Button';
import RadioButton from '../Common/RadioButton';
import CheckBox from '../Common/CheckBox';
import ImagePicker from './ImagePicker';
import Icon from '../../themes/Icons';

import { METHODS, TYPES, LOCATIONS, CONDITIONS, CATEGORIES } from '../../utils/constants';
import { emptyForm, validateForm } from '../../store/actions/generalActions';

const ListItem = ({ navigation }) => {

    const { colors } = useTheme();
    const dispatch = useDispatch();
    const errors = useSelector(state => state.general.formErrors);
    const details = useSelector(state => state.general.form);
    const user = useSelector(state => state.user);


    const [alert, setAlert] = useState();
    const [name, setName] = useState();

    const [type, setType] = useState(details.type);
    const [methods, setMethods] = useState(details.methods || []);
    const [location, setLocation] = useState(details.location || { country: user?.country, region: user?.region, city: user?.city, postalcode: user?.postalcode });
    const [images, setImages] = useState(details.images || []);
    const [heading, setHeading] = useState(details.heading);
    const [description, setDescription] = useState(details.description);
    const [condition, setCondition] = useState(details.condition);
    const [price, setPrice] = useState(details.price);
    const [categories, setCategories] = useState(details.categories || []);
    const [tags, setTags] = useState(details.tags?.map(tag => tag.substring(0)).join(', '));

    useEffect(() => {
        const unsubscribe = navigation.addListener('beforeRemove', () => {
            dispatch(emptyForm());
            unsubscribe();
        });
    });

    const updateLocation = (loc) => {
        const { name, value } = loc;
        setLocation(l => ({ ...l, [name]: value }));
    };

    const setLabel = (value) => value.replace(/(^\w{1})|(\s+\w{1})/g, (match) => match.toUpperCase());

    const removeCategory = () => {
        setCategories(c => c.filter(c => c !== name));
        setAlert();
    }

    const onSubmit = () => {
        const required = ['type', 'heading', 'location.country', 'categories'];
        if (type === 'sell' || type === 'rent') required.push('condition', 'price');
        if (type === 'trade') required.push('condition');

        const form = {
            type,
            methods,
            location,
            images,
            heading,
            description,
            condition,
            price,
            categories,
            tags,
            oldprice: price && details.price,
        };

        if (details.id) {
            form.id = details.id;
            form.date = details.date;
        }

        dispatch(validateForm(form, required));
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ScrollView style={styles.container}>
                <Text style={styles.info}>Fill at least the fields marked with *</Text>
                <View style={styles.titleContainer}>
                    <Text style={[styles.title, { color: colors.primary }]}>Type*:</Text>
                    <Text style={styles.error}>{errors.type}</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <RadioButton
                        options={TYPES.map(t => t.value)}
                        selected={type}
                        setSelected={setType}
                        horizontal={true}
                    />
                </View>
                <Text style={[styles.title, { color: colors.primary, marginTop: '1%' }]}>Methods:</Text>
                <View style={{ alignItems: 'center' }}>
                    <CheckBox
                        options={METHODS}
                        checked={methods}
                        setChecked={setMethods}
                    />
                </View>
                {LOCATIONS.map((name, i) =>
                    <Input
                        key={i}
                        label={name === 'postalcode' ? 'postal code' : name === 'country' ? `${name}*` : name}
                        placeholder={`Add your ${name === 'postalcode' ? 'postal code' : name}`}
                        value={location[name]}
                        onChange={value => updateLocation({ name, value })}
                        error={name === 'country' ? errors.location : ''}
                        labelStyle={{ fontSize: 15 }}
                        inputStyle={{ paddingVertical: '1%' }}
                    />
                )}
                <Text style={styles.info}>Pick up to 3 images!</Text>
                <ImagePicker
                    images={images}
                    setImages={setImages}
                />
                <Input
                    label='Heading*'
                    placeholder='Add title for your listing'
                    value={heading}
                    onChange={setHeading}
                    maxLength={50}
                    labelStyle={{ fontSize: 15 }}
                    inputStyle={{ paddingVertical: '1%' }}
                    error={errors.heading}
                />
                <Input
                    label='Description'
                    placeholder='Add description for your listing'
                    value={description}
                    onChange={setDescription}
                    multiline={true}
                    textAlignVertical='top'
                    numberOfLines={7}
                    labelStyle={{ fontSize: 15 }}
                    inputStyle={{ paddingVertical: '1%' }}
                />
                <View style={styles.titleContainer}>
                    <Text style={[styles.title, { color: colors.primary }]}>Condition{type !== 'buy' && '*'}:</Text>
                    <Text style={styles.error}>{errors.condition}</Text>
                </View>
                <Picker
                    selectedValue={condition}
                    onValueChange={item => item !== '-1' && setCondition(item)}
                    dropdownIconColor={colors.primary}
                >
                    <Picker.Item label='Select an option' value='-1' />
                    {CONDITIONS.map((value, i) =>
                        <Picker.Item key={i} label={setLabel(value)} value={value} />
                    )}
                </Picker>
                <Input
                    label={`Price${(type === 'sell' || type === 'rent') ? '*' : ''}`}
                    placeholder='Add price'
                    value={price}
                    onChange={setPrice}
                    labelStyle={{ fontSize: 15 }}
                    inputStyle={{ paddingVertical: '1%' }}
                    error={errors.price}
                />
                <Text style={styles.info}>Pick at least one category!</Text>
                <View style={styles.titleContainer}>
                    <Text style={[styles.title, { color: colors.primary }]}>Categories*:</Text>
                    <Text style={styles.error}>{errors.categories}</Text>
                </View>
                <Picker
                    selectedValue={categories[categories.length - 1]}
                    onValueChange={item => item !== '-1' && setCategories(c => [...c, item])}
                    dropdownIconColor={colors.primary}
                >
                    <Picker.Item label='Select an option' value='-1' />
                    {CATEGORIES.map((value, i) =>
                        <Picker.Item key={i} label={value.title} value={value.title} />
                    )}
                </Picker>
                <ScrollView horizontal={true}>
                    {categories.map((value, i) =>
                        <GestureDetector
                            key={i}
                            gesture={Gesture.LongPress({ minDuration: 200 }).onEnd((e, success) => {
                                if (success) {
                                    setName(value);
                                    setAlert({ title: 'Remove', subtitle: 'Do you want to remove selected category?'});
                                }
                            })}
                        >
                            <>
                                <Text style={{ textDecorationLine: 'underline', color: colors.primary }}>{value}</Text>
                                <Text>{i < categories.length - 1 ? ', ' : ''}</Text>
                            </>
                        </GestureDetector>
                    )}
                </ScrollView>
                <Text style={styles.info}>Add tags separated by comma!</Text>
                <Input
                    label='Tags'
                    placeholder='e.g skirt, red, ...'
                    value={tags}
                    onChange={setTags}
                    multiline={true}
                    textAlignVertical='top'
                    numberOfLines={3}
                    labelStyle={{ fontSize: 15 }}
                    inputStyle={{ paddingVertical: '1%' }}
                />
                <Button
                    onPress={onSubmit}
                    style={{ alignItems: 'stretch'}}
                >
                    <Text style={{ color: colors.btn }}>Next</Text>
                    <Icon
                        set='MaterialIcons'
                        size={20}
                        name='navigate-next'
                        color={colors.btn}
                    />
                </Button>
            </ScrollView>
            {alert &&
                    <Alert
                        title={alert.title}
                        subtitle={alert.subtitle}
                        buttons={[
                            { content: <Text style={{ color: colors.btn }}>Cancel</Text>, onPress: () => setAlert() },
                            { content: <Text style={{ color: colors.btn }}>OK</Text>, onPress: removeCategory }
                        ]}
                    />
                }
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: '2%',
        paddingHorizontal: '5%',
    },
    error: {
        color: '#ff0000',
        fontWeight: 'bold',
        marginLeft: '2%',
    },
    info: {
        fontSize: 17,
        textAlign: 'center',
        marginVertical: '1%'
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: '1%',
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        marginLeft: '3%',
    },
});

export default ListItem;