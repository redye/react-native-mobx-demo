import React from 'react';

import {
    StyleSheet,
    View,
    Image,
    ScrollView,
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

import NewGoodsItems from './NewGoodsItem';
import NewGoodsView from './NewGoodsView';
import ThemeLine from './ThemeLine';

// 轮播图片
const ImageSources = [
    require('../../image/i1.png'),
    require('../../image/i2.png'),
    require('../../image/i3.png'),
]

@inject('rootStore')
@observer
export default class HomePage extends React.Component {
    static navigationOptions = (navigation) => ({
        headerTitle: '迷你水果商城',
    })

    constructor(props) {
        super(props);
        
        let dataSource = new ViewPager.DataSource({
            pageHasChanged: (p1, p2) => p1 !== p2
        });
        this.state = {
            dataSource: dataSource.cloneWithPages(ImageSources)
        }
    }

    _renderPage(data) {
        return (
            <Image source={data} style={styles.image}/>
        )
    }

    render() {
        // console.log(this.props.rootStore.NewGoodsStore)
        // 打乱数组
        let data = DisturbArray(this.props.rootStore.newGoodsStore.allDatas.data);
        return (
                <ScrollView style={styles.container}>
                    <View style={styles.swiper}> 
                    <ViewPager
                        style = {{height: 200}}
                        dataSource={this.state.dataSource}
                        renderPage={this._renderPage}
                        isLoop={false}
                        autoPlay={true}
                        />
                    </View>
                    <ThemeLine name={'最近新品'}/>
                    <NewGoodsView itemDatas={data} navigation={this.props.navigation}/>
                </ScrollView>
            );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
      },
    swiper: {
        width: SCREEN_WIDTH,
        height: 200
    },
    image: {
        width: SCREEN_WIDTH,
        height: 200,
        resizeMode: 'cover' 
    },
    line: {
        flex: 1,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

