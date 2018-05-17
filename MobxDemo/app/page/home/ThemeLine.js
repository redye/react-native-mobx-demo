import React from 'react';
import {
    View, 
    Text,
} from 'react-native';
import {
    THEME_COLOR,
    SCREEN_WIDTH,
} from 'mb-react-native-common';

export default ({name,textStyle,lineStyle}) => {
    return (
        <View style={[styles.lineStyle,lineStyle]}>
            <Text style={[styles.textStyle,textStyle]}>{name}</Text>
        </View>
    )
}

const styles = {
    lineStyle: {
        flex: 1,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle: {
        color: THEME_COLOR,
    }
}