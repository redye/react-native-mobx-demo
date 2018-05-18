/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {
	Component
} from 'react';
import {
	Platform,
	StyleSheet,
	Text,
	View
} from 'react-native';

import {
	HomePage,
	CategoryPage,
	CartPage,
	MinePage,
	GoodsDetailPage,
} from 'mb-react-native-page';

import {
	TabBarIcon,
} from 'mb-react-native-component';

import {
	THEME_COLOR,
} from 'mb-react-native-common';

import {
	createStackNavigator,
	createBottomTabNavigator,
	addNavigationHelpers,
} from 'react-navigation';

import {
	Provider,
	observer,
} from 'mobx-react';
import {
    observable,
    computed,
    action,
	observe,
} from 'mobx';

import {
	Store,
} from 'mb-react-native-mobx';

const Tab = createBottomTabNavigator({
	Home: {
		screen: HomePage,
		navigationOptions: ({navigation}) => ({  
			tabBarLabel: '首页', 
			tabBarIcon:({selected,tintColor}) => (  
				<TabBarIcon  
					tintColor={tintColor}  
					selected={selected}  
					normalImage={require('./app/image/home.png')}  
					selectedImage={require('./app/image/homeSelect.png')}  
				/>  
			)  
		  }),
	},
	Category: {
		screen: CategoryPage,
		navigationOptions: ({navigation}) => ({  
			tabBarLabel: '分类',  
			tabBarIcon:({selected,tintColor}) => (  
				<TabBarIcon  
					tintColor={tintColor}  
					selected={selected}  
					normalImage={require('./app/image/category.png')}  
					selectedImage={require('./app/image/categorySelect.png')}  
				/>  
			)  
		  }),
	},
	Cart: {
		screen: CategoryPage,
		navigationOptions: ({navigation}) => ({  
			tabBarLabel: '购物车', 
			tabBarIcon:({selected,tintColor}) => (  
				<TabBarIcon  
					tintColor={tintColor}  
					selected={selected}  
					normalImage={require('./app/image/cart.png')}  
					selectedImage={require('./app/image/cartSelect.png')}  
				/>  
			)  
		  }),
	},
	Mine: {
		screen: CategoryPage,
		navigationOptions: ({navigation}) => ({  
			tabBarLabel: '我的', 
			tabBarIcon:({selected,tintColor}) => (  
				<TabBarIcon  
					tintColor={tintColor}  
					selected={selected}  
					normalImage={require('./app/image/mine.png')}  
					selectedImage={require('./app/image/mineSelect.png')}  
				/>  
			)  
		}),
	}
}, {
	tabBarPosition: 'bottom',
	swipeEnabled: false,
	animationEnabled: false,
	lazy: true,
	tabBarOptions: {
		activeTintColor: THEME_COLOR,
		inactiveTintColor: '#999',
		style: {
			backgroundColor: '#e0e0e0',
		},
		labelStyle: {
			fontSize: 12,
		}
	}
});

const RootStack = createStackNavigator({
	Tab: {
		screen: Tab,
	},
	GoodsDetail: {
		screen: GoodsDetailPage,
		navigationOptions: {
			title: '商品详情',
		}
	}
}, {
	initialRouteName: 'Tab',
	navigationOptions: {
		headerBackTitle: null,
		headerTintColor: '#333',
		showIcon: true,
		swipeEnabled: true,
		animationEnabled: true,
		title: '迷你水果商城',
		headerTitleStyle: {
			alignSelf: 'center',
            fontSize: 15,
            color: '#fff',
		},
		headerStyle: {
			backgroundColor: THEME_COLOR,
		}
	},
	mode: 'card',
});

export default class App extends React.Component {

	render() {
		return (
			<Provider rootStore={Store} >
				<RootStack />
			</Provider>			
		);
	}
}