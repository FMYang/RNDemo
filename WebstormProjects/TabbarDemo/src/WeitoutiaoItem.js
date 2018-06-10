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

type Props = {
    width: number,
    height: number,
    url: string
}

export default class WeitoutiaoItem extends Component<Props> {

    static defaultProps = {
        width: 0,
        height: 0,
        url: ""
    }

    render() {
        return(
            <View>
                <Image source={{uri: this.props.url}} style={{width: this.props.width, height: this.props.height, margin: 1}}/>
            </View>
        )
    }
}