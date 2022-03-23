import React, { memo } from 'react';
import MaterialIconsI from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIconsI from 'react-native-vector-icons/MaterialCommunityIcons';
import IoniconsI from 'react-native-vector-icons/Ionicons';
import FoundationI from 'react-native-vector-icons/Foundation';
import FontAwesomeI from 'react-native-vector-icons/FontAwesome';

export const Sets = {
    MaterialCommunityIcons: 'MaterialCommunityIcons',
    MaterialIcons: 'MaterialIcons',
    Ionicons: 'Ionicons',
    Foundation: 'Foundation',
    FontAwesome: 'FontAwesome',
};

const Icons = ({ set, ...others }) => {
    switch (set) {
        case Sets.MaterialCommunityIcons:
            return <MaterialCommunityIconsI {...others} />;
        case Sets.MaterialIcons:
            return <MaterialIconsI {...others} />;
        case Sets.Ionicons:
            return <IoniconsI {...others} />;
        case Sets.Foundation:
            return <FoundationI {...others} />;
        case Sets.FontAwesome:
            return <FontAwesomeI {...others} />;
        default:
            return <MaterialCommunityIconsI {...others} />;
    }
};

export default memo(Icons);
