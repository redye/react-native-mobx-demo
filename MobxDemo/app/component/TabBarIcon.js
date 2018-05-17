import React from 'react';

import {
    StyleSheet,
    View,
    Text,
    Image,
} from 'react-native';

export default class TabBarIcon extends React.Component {
    render() {
        return (
            <Image style={[styles.tabImage, {tintColor: this.props.tintColor}]} source={this.props.selected ? this.props.selectedImage : this.props.normalImage} />
        );
    }
}

const styles = StyleSheet.create({
    tabImage: {
        width: 25,
        height: 25,
    },
});