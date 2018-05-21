import React from 'react';

import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    FlatList,
} from 'react-native';

import Dimensions from 'Dimensions';
const { width, height } = Dimensions.get('window');

import { 
    observer, 
    inject,
} from 'mobx-react';

import {
    observable,
    action,
    autorun,
    computed,
} from 'mobx';

class CounterStore {
    @observable counter = 0;

    @action
    add = () => {
        this.counter ++;
    }
    
    @action
    minus = () => {
        if (this.counter > 0) {
            this.counter --;
        }
    }
}

const counterStore = new CounterStore();

@observer
export default class Counter extends React.Component {
    _add = () => {
        counterStore.add();
    }

    _minus = () => {
        counterStore.minus();
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.contentContainer}>
                    <TouchableOpacity onPress={this._add}>
                        <View style={styles.buttonContainer}>
                            <Text style={styles.buttonText}>+</Text>
                        </View>
                    </TouchableOpacity>

                    <Text style={styles.counter}>{counterStore.counter}</Text>

                    <TouchableOpacity onPress={this._minus}>
                        <View style={styles.buttonContainer}>
                            <Text style={styles.buttonText}>-</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        width: 50,
        height: 50,
        backgroundColor: 'orange',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
    },
    contentContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: width,
        alignItems: 'center',
    },
    counter: {
        color: '#f00',
        fontSize: 25,
    }
});