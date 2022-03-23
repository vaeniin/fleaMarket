import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import { Dimensions } from 'react-native';

export const width = Dimensions.get('window').width;
export const height = Dimensions.get('window').height;

export const themes = {
    light: {
        dark: false,
        colors: {
            ...DefaultTheme.colors,
            primary: '#ff6347',
            card: '#e8e8e8',
            title: '#000',
            filtervalue: '#3366bb',
            gradient: ['#f5f5f5', '#f5f5f5', '#f5f5f5', '#dcdcdc'],
            underlayColor: '#ff7961',
            btn: '#fff',
            disabled: '#d3d3d3',
            image: '#d2d2cf',
            caption: '#fff',
            message: '#c0c0c0',
            inbox: '#e8e8e8',
        },
    },
    dark: {
        dark: true,
        colors: {
            ...DarkTheme.colors,
            gradient: ['#101010', '#101010', '#101010', '#282828'],
            title: '#c0c0c0',
            filtervalue: '#3366bb',
            underlayColor: '#5ba1fc',
            btn: '#dcdcdc',
            disabled: '#909090',
            image: '#878787',
            caption: '#171717',
            message: '#585858',
            inbox: '#282828',
        }
    },
};
