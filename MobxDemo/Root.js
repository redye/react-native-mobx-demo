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
import TodoListPage from './mobx/TodoListPage';
import Counter from './mobx/Counter';
import TodoEditPage from './mobx/TodoEditPage';

import {
	createStackNavigator,
	createBottomTabNavigator,
	addNavigationHelpers,
} from 'react-navigation';

const RootStack = createStackNavigator({
	List: {
		screen: TodoListPage,
	},
	Edit: {
		screen: TodoEditPage,
		navigationOptions: {
			title: 'Edit',
		}
	}
}, {
	initialRouteName: 'List',
	navigationOptions: {
		headerBackTitle: null,
		headerTintColor: '#333',
		showIcon: true,
		swipeEnabled: true,
		animationEnabled: true,
		title: 'List',
		headerTitleStyle: {
			alignSelf: 'center',
            fontSize: 18,
            color: '#333',
		},
	},
    mode: 'card',
    style: {
        backgroundColor: '#fff'
    },
});

export default class Root extends React.Component {
    


    render() {
        return (
            <Provider store={TodoStore}>
                <RootStack />
            </Provider>
        );

        // return (
        //     <Counter />
        // );
    }
}
