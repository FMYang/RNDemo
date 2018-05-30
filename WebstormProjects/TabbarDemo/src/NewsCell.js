/**
 * Created by yangfangming On 2018/5/29
 *
 * Copyright © 2018-present, yangfangming
 * All rights reserved.
 */

import React, { Component } from 'react'
import { Text,
    TouchableOpacity,
    View,
    StyleSheet,
    Image,
} from 'react-native'

type Props = {
    content: Object,
    onPress: Function
}

class NewsCell extends Component<Props> {

    render() {

        let {content} = this.props
        if (content.image_list != undefined)
        {
            let imageList = Object.values(content.image_list)
            let images = imageList.length

            if (images > 0 && images < 3) { // 一张图
                let url = imageList[0].url_list[0].url.replace('webp', 'jpg')
                return(
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity onPress = {() => this.props.onPress(content)}>
                            <Text style={styles.cell}> {content.title} </Text>
                            <Image style={styles.image} source={{uri: url}}/>
                        </TouchableOpacity>
                    </View>
                )
            } else if (images >= 3) { // 三张图
                let url1 = imageList[0].url_list[0].url.replace('webp', 'jpg')
                let url2 = imageList[1].url_list[1].url.replace('webp', 'jpg')
                let url3 = imageList[2].url_list[2].url.replace('webp', 'jpg')
                return(
                    <TouchableOpacity onPress = {() => this.props.onPress(content)}>
                        <Text style={styles.cell}> {content.title} </Text>
                        <View style={{flexDirection: 'row'}}>
                            <Image style={styles.image} source={{uri: url1}}/>
                            <Image style={styles.image} source={{uri: url2}}/>
                            <Image style={styles.image} source={{uri: url3}}/>
                        </View>
                    </TouchableOpacity>
                )
            } else { // 无图
                return(
                    <TouchableOpacity onPress = {() => this.props.onPress(content)}>
                        <Text style={styles.cell}> {content.title} </Text>
                    </TouchableOpacity>
                )
            }
        } else { // 无图
            return(
                <TouchableOpacity onPress = {() => this.props.onPress(content)}>
                    <Text style={styles.cell}> {content.title} </Text>
                </TouchableOpacity>
            )
        }
    }
}

const styles = StyleSheet.create({
    cell: {
        fontSize: 18,
        padding: 15
    },
    image: {
        marginTop: 15,
        marginLeft: 20,
        marginRight: 15,
        width: 70,
        height: 50
    }
})

export default NewsCell