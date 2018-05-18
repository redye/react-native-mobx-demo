import React from 'react';

import {
    StyleSheet,
    View,
    FlatList,
} from 'react-native';

import {
    THEME_COLOR,
    SCREEN_WIDTH,
    SCREEN_HEIGHT,
    DisturbArray,
} from 'mb-react-native-common';

import { 
    inject, 
    observer, 
} from 'mobx-react';

import {
    computed,
} from 'mobx';

import CartItem from './CartItem';
import GoodsCheck from './GoodsCheck';

export default class CartPage extends React.Component {
    static navigationOptions = {
        headerTitle: '购物车',
    }

    @computed get dataSource() {
        return this.props.rootStore.cartStore.allDatas.data.slice();
    }

    _renderItem = ({item}) => {
    
        return(
            // 传入CartStore实例
            <CartItem data={item} mobx={this.props.rootStore.cartStore}/>
        )
      }
    
    _keyExtractor = (item,index)=> {
        // 千万别用index，不然在删购物车数据时，如果从第一个item开始删会产生节点渲染错乱的bug
        return item.name
    }

    render() {
        return (
          <View style={styles.container}>
          {
            this.dataSource.length ? 
            <View style={{flex: 1}}>
            <View style={{height: SCREEN_HEIGHT - 38 - 50 - 65}}>
            <FlatList
                data={this.dataSource}
                renderItem={this._renderItem}
                keyExtractor={this._keyExtractor}
            /> 
            </View>
              
            {/* 结账View,传入navigation，mobx实例 */}
            <GoodsCheck mobx={this.props.rootStore} navigation={this.props.navigation}/>
            </View>
            :
          <View style={{flex: 1,justifyContent: 'center',alignItems: 'center'}}>
            <Text>购物车是空的哦~请到首页或者分类页添加哈๑乛◡乛๑</Text>
          </View>
          }
          </View>
        );
    }
}
    
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    lastView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        width: SCREEN_WIDTH,
        height: 50,
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: THEME_COLOR
    },
    headerTitleStyle: {
        alignSelf: 'center', 
        fontSize: 15, 
        color: '#fff'
    },
    headerStyle: {
        height: 38, 
        backgroundColor: THEME_COLOR
    }
});
    
    