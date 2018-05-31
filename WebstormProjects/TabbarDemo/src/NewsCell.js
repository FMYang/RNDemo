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
    Dimensions,
} from 'react-native'

type Props = {
    content: Object,
    onPress: Function
}

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height
const imageWidth = (screenWidth-50)/3
const imageHeight = imageWidth * 75 / 110

class NewsCell extends Component<Props> {

    render() {

        let {content} = this.props
        if (content.image_list != undefined) {
            // Object转数组
            let imageList = Object.values(content.image_list)
            let images = imageList.length

            if (images > 0 && images < 3) { // 一张图
                let url = imageList[0].url_list[0].url.replace('webp', 'jpg')
                return(
                    <View>
                        <TouchableOpacity activeOpacity={1} onPress = {() => this.props.onPress(content)}>
                            <View style={{flexDirection: 'row', flex: 1}}>
                                <View>
                                    <Text style={styles.title1}> {content.title} </Text>
                                    <View style={styles.bottomView}>
                                        <Text style={styles.source}>{content.source}</Text>
                                        <Text style={styles.comment}>{content.comment_count.toString()+"评论"}</Text>
                                    </View>
                                </View>
                                <Image style={styles.oneImage} source={{uri: url}}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                )
            } else if (images >= 3) { // 三张图
                let url1 = imageList[0].url_list[0].url.replace('webp', 'jpg')
                let url2 = imageList[1].url_list[1].url.replace('webp', 'jpg')
                let url3 = imageList[2].url_list[2].url.replace('webp', 'jpg')
                return(
                    <TouchableOpacity activeOpacity={1} onPress = {() => this.props.onPress(content)}>
                        <Text style={styles.title}> {content.title} </Text>
                        <View style={styles.imageContainer}>
                            <Image style={styles.image} source={{uri: url1}}/>
                            <Image style={styles.image} source={{uri: url2}}/>
                            <Image style={styles.image} source={{uri: url3}}/>
                        </View>
                        <View style={styles.bottomView}>
                            <Text style={styles.source}>{content.source}</Text>
                            <Text style={styles.comment}>{content.comment_count.toString()+"评论"}</Text>
                        </View>
                    </TouchableOpacity>
                )
            } else { // 无图
                return(
                    <TouchableOpacity activeOpacity={1} onPress = {() => this.props.onPress(content)}>
                        <Text style={styles.title}> {content.title} </Text>
                        <View style={styles.bottomView_noPic}>
                            <Text style={styles.source}>{content.source}</Text>
                            <Text style={styles.comment}>{content.comment_count.toString()+"评论"}</Text>
                        </View>
                    </TouchableOpacity>
                )
            }
        } else { // 无图
            return(
                <TouchableOpacity activeOpacity={1} onPress = {() => this.props.onPress(content)}>
                    <Text style={styles.title}> {content.title} </Text>
                    <View style={styles.bottomView_noPic}>
                        <Text style={styles.source}>{content.source}</Text>
                        <Text style={styles.comment}>{content.comment_count.toString()+"评论"}</Text>
                    </View>
                </TouchableOpacity>
            )
        }
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        marginTop: 15,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 15
    },
    title1: {
        fontSize: 18,
        marginTop: 15,
        marginLeft: 10,
        width: screenWidth-imageWidth-30
    },
    imageContainer: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10
    },
    image: {
        marginLeft: 5,
        marginRight: 5,
        width: imageWidth,
        height: imageHeight
    },
    bottomView: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 10,
        marginLeft: 10,
        marginBottom: 10
    },
    bottomView_noPic: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: 10,
        marginBottom: 10
    },
    source: {
        fontSize: 12,
        color: '#999999'
    },
    comment: {
        marginLeft: 10,
        fontSize: 12,
        color: '#999999'
    },
    oneImage: {
        marginLeft: 15,
        marginRight: 10,
        marginTop: 10,
        width: imageWidth,
        height: imageHeight
    }
})

export default NewsCell