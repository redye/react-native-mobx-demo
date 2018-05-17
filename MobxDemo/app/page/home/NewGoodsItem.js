import React from 'react'
import { 
    View, 
    Text, 
    Image, 
    TouchableOpacity, 
    StyleSheet 
} from 'react-native';
import {
    THEME_COLOR,
    SCREEN_WIDTH,
} from 'mb-react-native-common';

const NewGoodsItem = ({name, price, image, onPress}) => {
    return (
        <TouchableOpacity onPress={() => onPress && onPress()}>
        <View style={styles.item}>
            <Image source={image} style={styles.image}/>
            <Text style={{marginTop: 5}}>{name}</Text>
            <Text style={{marginTop: 5}}>￥ {price}/500g</Text>
        </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    item: {
        width: (SCREEN_WIDTH - 40)/2,
        flexDirection: 'column',
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
        marginBottom: 5,
        alignItems: 'center',
        backgroundColor: '#f5f6f5',
        borderRadius: 20,
        paddingVertical: 10,
    },
    image: {
        width: 100,
        height: 100
    }
})

export default NewGoodsItem;