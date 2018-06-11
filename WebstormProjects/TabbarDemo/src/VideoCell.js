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

const imageHeight = (screenWidth/2) * 291 / 185

type Props = {
    info: Object
}

class VideoCell extends Component<Props> {
    render() {
        let info = this.props.info.item.raw_data
        var url = info.first_frame_image_list[0].url
        return(
            <View style={{flex: 1, height: imageHeight, margin: 1,}}>
                <ImageBackground style={{flex:1}} source={{uri: url}}>
                    <View style={{justifyContent: 'flex-end',flex: 1}}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title} numberOfLines={2}> {info.title} </Text>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        )
    }
}

export default VideoCell

const styles = StyleSheet.create({
    titleContainer: {
        margin: 10,
    },
    title: {
        color: 'white',
        fontSize: 14,
        textAlign: 'left',
        fontWeight: 'bold',
    }
})