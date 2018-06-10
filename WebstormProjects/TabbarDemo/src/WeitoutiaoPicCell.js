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
import Video from "./Video";

type Props = {
    info: Object,
    numColumns: number,
    picHeight: number,
    picWidth: number,
}

class WeitoutiaoPicCell extends Component<Props, State> {

    static defaultProps = {
        picHeight: 0,
        picWidth: 0,
        numColumns: 1
    }

    constructor() {
        super()
    }

    renderUser = () => {
        let info = this.props.info
        return (
            <View style={styles.userView}>
                <Image style={styles.avatar} source={{uri: info.user.avatar_url}}/>
                <View>
                    <View style={styles.name}>
                        <Text style={{fontSize: 14, color: 'black'}}>{info.user.name}</Text>
                    </View>
                    <View style={styles.desc}>
                        <Text style={{fontSize: 12, color: '#666666'}} numberOfLines={1}>{info.user.desc}</Text>
                    </View>
                </View>
            </View>
        )
    }

    renderTitle = () => {
        let info = this.props.info
        if (info != undefined && info.content != undefined) {
            return (
                <View style={styles.content}>
                    <Text numberOfLines={info.default_text_line}> {info.content} </Text>
                </View>
            )
        }
        else {
            return <Text></Text>
        }
    }

    renderItem = (info) => {
        let url = info.item.url
        if (url != undefined) {
            return <WeitoutiaoItem width={this.props.picWidth} height={this.props.picHeight} url={url}/>
        }
        else {
            return <Text></Text>
        }
    }

    renderPics = () => {
        let info = this.props.info
        var identify = ""
        switch (this.props.numColumns) {
            case 0:
                identify = "style1"
                break
            case 1:
                identify = "style2"
                break
            case 2:
                identify = "style3"
                break
            case 3:
                identify = "style4"
                break

        }
        console.log("renderPics" + this.props.numColumns)
        if (info != undefined && info.ugc_cut_image_list != undefined && info.ugc_cut_image_list.length > 0) {
            let images = info.ugc_cut_image_list
            return (
                <FlatList style={{width: screenWidth}}
                          numColumns={this.props.numColumns}
                          data={images}
                          renderItem={this.renderItem}
                          key={identify}
                />
            )
        } else {
            return <Text>undefined</Text>
        }
    }

    render() {
        let info = this.props.info
        return(
            <View style={{backgroundColor: 'white'}}>
                {this.renderUser()}
                {this.renderTitle()}
                {this.renderPics()}
                <View style={{width: screenWidth, height:10, backgroundColor: '#e6e6e6'}}></View>
            </View>
        )
    }
}

export default WeitoutiaoPicCell

const styles = StyleSheet.create({
    content: {
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 15
    },
    avatar: {
        margin: 15,
        width: 40,
        height: 40,
        resizeMode:'cover',
        borderRadius: 20
    },
    userView: {
        flex: 1,
        flexDirection: 'row'
    },
    name: {
        marginTop: 15,
        marginRight: 15,
    },
    desc: {
        marginTop: 10,
        marginRight: 100,
    }
})