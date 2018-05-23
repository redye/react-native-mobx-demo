import React from 'react';

import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    CheckBox,
    Button,
    TextInput,
    Switch,
} from 'react-native';

import {
    inject,
    observer,
} from 'mobx-react';

@inject('store')
@observer
export default class TodoEditPage extends React.Component {
    constructor(props) {
        super(props);
        const { item, index } = this.props.navigation.state.params;
        this.state = {
            switchOn: item.completed,
        }
    }

    _onValueChange = (value) => {
        this._completed = value;
        this.setState({
            switchOn: value,
        });
    }

    _onPress = () => {
        const { item, index } = this.props.navigation.state.params;
        item.task = this._task && this._task.length ? this._task : item.task;
        item.completed = this._completed !== undefined ? this._completed : item.completed;
        this.props.store.update(item, index);
        this.props.navigation.goBack();
    }

    _onChangeText = (text) => {
        this._task = text;
    }

    render() {
        const { item, index } = this.props.navigation.state.params;
        return (
            <View style={styles.container}>
                <View style={styles.itemContainer}>
                    <Text style={{fontSize: 17, color: '#999'}}>标题</Text>
                    <TextInput 
                        style={styles.textInput}
                        value={item.task}
                        onChangeText={this._onChangeText}
                    />
                </View>
                <View style={styles.itemContainer}>
                    <Text style={{fontSize: 17, color: '#999'}}>完成</Text>
                    <Switch 
                        style={styles.switch}
                        value={this.state.switchOn}
                        onValueChange={this._onValueChange}
                    />
                </View>

                <Button title='确定' onPress={this._onPress} color='orange' />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    itemContainer: {
        flexDirection: 'row',
        marginLeft: 15,
        marginRight: 15,
        marginVertical: 20,
        alignItems: 'center',
    },
    textInput: {
        marginLeft: 8,
        borderColor: '#ddd',
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 4,
        color: '#333',
        fontSize: 17,
        flex: 1,
        height: 30,
        paddingHorizontal: 4
    },
    switch: {
        marginLeft: 8,
        flex: 1,
    }
});