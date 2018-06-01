/**
 * Created by yangfangming On 2018/6/1
 *
 * Copyright © 2018-present, yangfangming
 * All rights reserved.
 */

import React, { Component } from 'react'
import {
    Image,
    Text,
    View,
    ImageBackground,
    StyleSheet
} from 'react-native'
import {screenWidth} from "./Tools";

type Props = {
    info: Object
}

class VideoCell extends Component {
    render() {
        let {info} = this.props
        return(
            <View style={{flex: 1, height: 160, margin: 1,}}>
                <ImageBackground style={{flex:1, resizeMode: 'stretch'}} source={{uri: "http://p3.pstatp.com/video1609/pgc-image/1527563166366b91aeb8959"}}>
                    <View style={{justifyContent: 'flex-end',flex: 1}}>
                        <View style={{marginBottom: 5}}>
                            <Text style={sytles.title}> Test </Text>
                            <Text> Test </Text>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        )
    }
}

export default VideoCell

const sytles = StyleSheet.create({
    title: {
        color: 'white',
        fontSize: 18,
        marginLeft: 10
    }
})