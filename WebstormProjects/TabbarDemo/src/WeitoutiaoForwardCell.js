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
import WeitoutiaoPicCell from "./WeitoutiaoPicCell";

class WeitoutiaoForwardCell extends Component {
    render() {
        return(
            <View>
                <Text> 转发类型 </Text>
                {/*<WeitoutiaoPicCell/>*/}
            </View>
        )
    }
}

export default WeitoutiaoForwardCell
