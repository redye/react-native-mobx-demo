import React from 'react';

import {
    StyleSheet,
    View,
} from 'react-native';

export default class MinePage extends React.Component {
    static navigationOptions = {
        headerTitle: '我的',
    }

    render() {
        return (
            <View style={styles.container}></View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});