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
import LinearGradient from 'react-native-linear-gradient' //渐变view
import BVLinearGraient from 'react-native'

type Props = {
    info: Object
}

let imageHeight = screenWidth * 210 / 375

class XiguaCell extends Component<Props> {
    render() {
        let info = this.props.info.item
        console.log(info)
        return(
            <View style={styles.container}>
                <ImageBackground style={styles.backgroundImage} source={{uri: info.video_detail_info.detail_video_large_image.url}}>
                    <LinearGradient colors={['black', 'transparent']}>
                        <Text style={styles.title}>{info.title}</Text>
                    </LinearGradient>
                </ImageBackground>
                <View>
                    <Text style={styles.bottomView}>bottom view</Text>
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
        height: imageHeight,
        color: 'red'
    },
    title: {
        marginLeft: 15,
        marginRight: 15,
        marginTop: 10,
        color: 'white',
        fontSize: 16
    },
    bottomView: {
        width: screenWidth,
        height: 40,
        color: 'blue'
    }
})