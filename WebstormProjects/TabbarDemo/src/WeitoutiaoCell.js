/**
 * Created by yangfangming On 2018/6/7
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
} from 'react-native'
import {screenWidth} from "./Tools";

type Props = {
    info: Object
}

class WeitoutiaoCell extends Component<Props> {
    constructor() {
        super()
    }

    renderImage() {
        let info = this.props.info.item
        if (info.thumb_image_list != undefined) {
            let images = Object.values(info.thumb_image_list)
            if (images != undefined && images.length > 0) {
                let url = images[0].url
                if (url != undefined) {
                    return (
                        <Image source={{uri: url}} style={{width: screenWidth, height: 100}}/>
                    )
                } else {
                    return <Text>test</Text>
                }
            } else {
                return <Text>test</Text>
            }
        } else {
            return <Text>test</Text>
        }

    }

    render() {
        let info = this.props.info.item
        return (
            <View>
                <Text style={styles.title}> {info.content} </Text>
                {this.renderImage()}
            </View>
        )
    }
}

export default WeitoutiaoCell

const styles = StyleSheet.create({
    title: {
        margin: 15
    }
})