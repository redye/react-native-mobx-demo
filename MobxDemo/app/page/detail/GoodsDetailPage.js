import React from 'react';

import {
    StyleSheet,
    View,
    Image,
    ScrollView,
    Text,
    RefreshControl,
    Animated,
    TouchableOpacity,
} from 'react-native';
import {
    THEME_COLOR,
    SCREEN_WIDTH,
    DisturbArray,
} from 'mb-react-native-common';
import {
    ViewPager,
} from 'mb-react-native-component';
import { 
    inject, 
    observer, 
} from 'mobx-react';
import {
    computed,
} from 'mobx';
import Toast, { DURATION } from 'react-native-easy-toast';

@inject('rootStore')
@observer
export default class GoodsDetailPage extends React.Component {
    static navigationOptions = (navigation) => {
        console.log('==>', navigation);
        const { params } = navigation.navigation.state;
        return {
            headerTitle: params.name,
        };
    }

    constructor(props) {
        super(props);

        this.state = {
            num: 0,
            bounceValue: new Animated.Value(1),
          //  allNum: count
        }
    }

    // 用Mobx的computed方法更加方便 
    @computed get cartCount() {
        return this.props.rootStore.cartStore.allDatas.data.length;
    }

    _addNum = () => {
        this.setState({
            num : this.state.num += 1
        })
    }

    _reduceNum = () => {
        if(this.state.num <= 0)
        return 
        this.setState({
            num : this.state.num -= 1
        })
    }

    _addCart = (item) => {
        if(this.state.num == 0) {
            this.refs.toast.show('添加数量不能为0哦~')
            return;
        }
        // 加入购物车页面的列表上
        // 点一次，购物车数据同步刷新
        this.state.bounceValue.setValue(1.5);
        Animated.spring(                          // 可选的基本动画类型: spring, decay, timing
            this.state.bounceValue,                 // 将`bounceValue`值动画化
            {
              toValue: 1,                         // 将其值以动画的形式改到一个较小值
              friction: 1,                          // Bouncier spring
            }
          ).start();                                // 开始执行动画
        
        this._updateCartScreen(item)
        this.refs.toast.show('添加成功^_^请前往购物车页面查看')
    }

    // 同步更新购物车页面的数据
    _updateCartScreen (item) {
        let name = item.name;
        // 判断购物车页面是否存在同样名字的物品
       // console.log(this.props.rootStore)
        let index;
        if(this.props.rootStore.cartStore)
         index = this.props.rootStore.cartStore.allDatas.data.findIndex(e => (
            e.name === name
         )
        )
        // 不存在
        if(index == -1) {
            this.props.rootStore.cartStore.allDatas.data.push(item);
            // 并让购物车icon更新
            let length = this.cartCount;
            this.props.rootStore.cartStore.allDatas.data[length - 1].count += this.state.num
        }else {
            // 增加对应name的count
            this.props.rootStore.cartStore.allDatas.data[index].count += this.state.num
            // console.log(this.props.rootStore.CartStore.allDatas.data[index])
        }
    }

    _goCartPage = () => {
        // 跳转时，传一个params来动态设置购物车的header
        this.props.navigation.navigate('Cart',{
            headerStyle:{
                alignSelf: 'auto',
                fontSize: 15,
                color: '#f00'
            }}
        )
    }

    render() {
        const { name, price, image } = this.props.navigation.state.params;
        let count = this.cartCount;
        return (
            <View style={styles.container}>
                <ScrollView
                    style={styles.container}
                    refreshControl={
                        <RefreshControl
                          refreshing={false}
                          tintColor="#000000"
                          title="loading"
                          colors={['#000000']}
                          progressBackgroundColor="#ffffff"
                          enabled={true}/>}
                >
                    <View style={styles.topWrapper}>
                        <View style={styles.imgWrapper}>
                            <Image source={image} style={styles.image}/>
                        </View>
                        <View style={styles.chooseLine}>
                            <Text style={styles.number}>数量   {this.state.num}</Text>
                            <TouchableOpacity style={styles.button} onPress={this._addNum}>
                                <Text style={styles.buttonText}>+</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={this._reduceNum}>
                                <Text style={styles.buttonText}>-</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button,{paddingLeft: 24,paddingRight: 10}]} onPress={()=>this._addCart(this.props.navigation.state.params)}>
                                <Text style={styles.buttonText}>加入购物车 ☝</Text>
                            </TouchableOpacity>
                        </View>

                        {/* <Image source={require('../../image/cart2.png')} style={styles.cart2}/> */}
                            
                        <Animated.View style={[styles.cart2,{transform:[{scale: this.state.bounceValue}]}]}>
                            <TouchableOpacity onPress={this._goCartPage}>
                                <Image source={require('../../image/cart2.png')} 
                                style={{height: 45,width: 45,}}/>
                            </TouchableOpacity> 
                        </Animated.View>
                        
                        
                        {/* 购物车商品数量为0不出现 */}
                        {
                            count === 0 ? null : 
                            <View style={styles.circle}>
                                <Text style={{fontSize: 16, alignSelf: 'center' ,color: '#fff'}}>{count}</Text>    
                            </View>
                        }
                        <View style={styles.message}>
                            <Text>有货</Text>
                            <Text style={{fontSize: 18,paddingTop:5}}>{name}</Text>
                            <Text style={{fontSize: 16,paddingTop: 5,paddingBottom: 10}}>￥ {price}/500g</Text>
                        </View>
                    </View>
                    
                    <Toast ref="toast"  
                        positionValue={200}
                        fadeInDuration={650}
                        fadeOutDuration={600}
                        opacity={0.8}
                    />   
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    topWrapper: {
        flexDirection: 'column',
        backgroundColor: '#fff'
    },
    bottomWrapper: {
        flex: 1,
        marginTop: 20,
        backgroundColor: "#fff",
    
    },
    imgWrapper: {
        marginTop: 30,
        alignSelf: 'center',
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 75
    },
    chooseLine: {
        marginTop: 60,
        height: 65,
        backgroundColor: THEME_COLOR,
        borderRadius: 30,
        marginLeft: 10,
        marginRight: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    number: {
        fontSize: 16,
        color: '#fff',
        marginLeft: 35,
        marginRight: 10
    },
    button: {
        paddingLeft: 20,
        paddingRight: 20
    },
    buttonText: {
        fontSize: 16,
        color: '#fff',
    },
    cart2: {
        height: 45,
        width: 45,
        position: 'absolute',
        top: 20,
        right: 30
    },
    circle: {
        width: 25,
        height: 25,
        borderRadius: 12.5,
        backgroundColor: THEME_COLOR,
        position: 'absolute',
        top: 18,
        right: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cart1: {
        height: 30,
        width: 30
    },
    message: {
        paddingTop: 20,
        alignItems: 'center'
    }
});