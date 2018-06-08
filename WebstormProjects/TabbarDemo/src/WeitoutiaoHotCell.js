/**
 * Created by yangfangming On 2018/6/8
 *
 * Copyright © 2018-present, yangfangming
 * All rights reserved.
 */

import React, { Component } from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    FlatList
} from 'react-native'
import {screenWidth} from "./Tools";

class WeitoutiaoHotCell extends Component {
    render() {
        return(
            <View>
                <Text> 热榜 </Text>
                <FlatList
                    data={[{"key": 1}, {"key": 11}, {"key": 111}, {"key": 1111}]}
                    renderItem={({item}) => <Text>{item.key}</Text>}
                />
            </View>
        )
    }
}

export default WeitoutiaoHotCell