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
    toJS,
} from 'mobx';
import { 
    observer, 
    inject,
} from 'mobx-react';
import { 
    Observer 
} from 'mobx-react/native';

import TodoStore from './TodoStore';


const todos = ['某科学的超电磁炮', '甲铁城的卡巴内瑞', '花牌情缘', '火影忍者之疾风传', '网球王子', '未闻花名'];


@inject('store')
@observer
export default class TodoListPage extends React.Component {
    _count = 0;

    get dataSource() {
        return this.props.store.allTodos.slice();
    }

    _addTask = () => {
        this.props.store.add(todos[this._count % todos.length]);
        this._count ++;
    }

    _deleteTask = () => {
        this.props.store.delete();
    }

    _doneTask = (item, index) => {
        this.props.store.edit(item, index);
    }

    _editTask = (item, index) => {
        this.props.navigation.navigate('Edit', {item, index});
    }

    _renderItem = ({item, index}) => {
        return (
            <Observer>
                {() => {
                    return (
                        <View style={styles.itemContainer}>
                            <Text style={{flex: 1}}>{item.task}</Text>
                            <Text style={{color: item.completed ? 'orange' : '#000'}}>{item.completed === true ? '已完成' : '未完成'}</Text>
                            {
                                item.completed === true ? null 
                                :
                                <TouchableOpacity onPress={() => this._doneTask(item, index)}>
                                    <View style={{paddingHorizontal: 10, paddingVertical: 5, backgroundColor: 'orange', marginLeft: 8}}>
                                        <Text style={{color: '#fff'}}>Done</Text>
                                    </View>
                                </TouchableOpacity>
                            }
                            <TouchableOpacity onPress={() => this._editTask(item, index)}>
                                <View style={{paddingHorizontal: 10, paddingVertical: 5, backgroundColor: 'orange', marginLeft: 8}}>
                                    <Text style={{color: '#fff'}}>Edit</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    );
                }}
            </Observer>
        );
    }

    _renderHeader = () => {
        return (
            <Observer>{() => {
                return (
                    <View style={styles.headerContainer}>
                        <Text>当前进度    {this.props.store.currentProgress}</Text>
                    </View>
                );
            }}
            </Observer>
        );
    }

    _keyExtractor = (item, index) => {
        return `${index}`;
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.actionContainer}>
                    <TouchableOpacity onPress={this._addTask}>
                        <View style={styles.buttonContainer}>
                            <Text style={styles.buttonText}>Add</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this._deleteTask}>
                        <View style={styles.buttonContainer}>
                            <Text style={styles.buttonText}>Delete</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.listContainer}>
                    <FlatList 
                        style={{flex: 1, width: width}}
                        data={this.dataSource}
                        renderItem={this._renderItem}
                        keyExtractor={this._keyExtractor}
                        ListHeaderComponent={this._renderHeader}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    buttonContainer: {
        width: 100,
        height: 30,
        backgroundColor: 'orange',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 15,
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
    },
    actionContainer: {
        flexDirection: 'row',
        marginHorizontal: 15,
        marginTop: 15,
    },
    listContainer: {
        flex: 1,
        marginTop: 10,
    },
    itemContainer: {
        flexDirection: 'row',
        height: 44,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#ddd',
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    headerContainer: {
        height: 30,
        borderBottomColor: '#ddd',
        borderBottomWidth: StyleSheet.hairlineWidth, 
        borderLeftColor: 'orange',
        borderLeftWidth: 4,
        justifyContent: 'center',
        paddingLeft: 8,
    }
});