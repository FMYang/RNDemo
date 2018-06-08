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
import WeitoutiaoItem from "./WeitoutiaoItem";

type Props = {
    info: Object,
    numColumns: number,
    picHeight: number,
    picWidth: number,
    key: string
}

class WeitoutiaoPicCell extends Component<Props> {

    static defaultProps = {
        picHeight: 0,
        picWidth: 0,
    }

    renderItem = (info) => {
        let url = info.item.url
        return <WeitoutiaoItem width={this.props.picWidth} height={this.props.picHeight} url={url}/>
    }

    renderTitle = () => {
        let info = this.props.info
        if (info.content != undefined) {
            return (
                <Text style={styles.title}> {info.content} </Text>
            )
        }
    }

    renderPics = () => {
        let info = this.props.info
        if (info.thumb_image_list != undefined) {
            let images = info.thumb_image_list
            return (
                <FlatList style={{width: screenWidth}}
                          numColumns={this.props.numColumns}
                          data={images}
                          renderItem={this.renderItem}
                          keyExtractor = {(item) => item.id}
                          key = {this.props.key}
                />
            )
        }
    }

    render() {
        let info = this.props.info
        return(
            <View>
                {this.renderTitle()}
                {this.renderPics()}
            </View>
        )
    }
}

export default WeitoutiaoPicCell

const styles = StyleSheet.create({
    title: {
        margin: 15
    }
})