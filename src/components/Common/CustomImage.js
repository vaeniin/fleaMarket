import React from 'react';
import {
    Image,
} from 'react-native';

import { width, height } from '../../themes/Theme';
import { HOST } from '@env';

const CustomImage = ({ file, style, userId }) => {

    let uri = `${HOST}/images/${userId}/${file.name}`;
    if (file.uri) uri = file.uri

    return (
        <Image
            source={{ uri: uri }}
            style={[
                {
                    width: Math.min(file.width, width * 0.7),
                    height: Math.min(file.height, height * 0.2),
                    resizeMode: 'contain',
                },
                style
            ]}
        />
    );
};

export default CustomImage;