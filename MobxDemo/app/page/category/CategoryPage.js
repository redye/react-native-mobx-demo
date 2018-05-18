import React from 'react';

import {
    StyleSheet,
    View,
} from 'react-native';

export default class CategoryPage extends React.Component {
    static navigationOptions = {
        headerTitle: '分类',
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
    }
});