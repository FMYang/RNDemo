/**
 * Created by yangfangming On 2018/6/5
 *
 * Copyright © 2018-present, yangfangming
 * All rights reserved.
 */

import React, { Component } from 'react'
import {
    View,
    Text,
    Image,
    ImageBackground,
    StyleSheet,
    Dimensions
} from 'react-native'
import {screenWidth} from "./Tools";

type Props = {
    info: Object
}

class XiguaCell extends Component<Props> {
    render() {
        let info = this.props.info.item
        console.log(info)
        return(
            <View style={styles.container}>
                <ImageBackground style={styles.backgroundImage} source={{uri: info.}}>
                    <Text>{info.title}</Text>
                </ImageBackground>
                <View>
                    <Text>bottom view</Text>
                </View>
            </View>
        )
    }
}

export default XiguaCell

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    backgroundImage: {
        width: screenWidth,
        height: 150,
        color: 'red'
    },
    bottomView: {
        width: screenWidth,
        height: 40,
        color: 'blue'
    }
})