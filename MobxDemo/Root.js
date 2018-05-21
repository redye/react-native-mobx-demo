import React from 'react';

import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    FlatList,
} from 'react-native';

import { 
    observer, 
    Provider,
} from 'mobx-react';

import TodoStore from './mobx/TodoStore';
import TodoPage from './mobx/TodoPage';
import Counter from './mobx/Counter';

export default class Root extends React.Component {
    


    render() {
        return (
            <Provider store={TodoStore}>
                <TodoPage />
            </Provider>
        );

        // return (
        //     <Counter />
        // );
    }
}
