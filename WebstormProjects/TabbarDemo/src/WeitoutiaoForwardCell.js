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
import WeitoutiaoPicCell from "./WeitoutiaoPicCell";
import WeitoutiaoItem from "./WeitoutiaoItem";

type Props = {
    info: Object,
    numColumns: number,
    picHeight: number,
    picWidth: number,
}

class WeitoutiaoForwardCell extends Component<Props> {

    static defaultProps = {
        picHeight: 0,
        picWidth: 0,
        numColumns: 1
    }

    renderBottomView = () => {
        let info = this.props.info

        return (
            <View style={styles.bottomView}>
                <View>
                    <View style={styles.bottomSubView}>
                        <Image source={require('./img/resouces/feed_share.png')} style={styles.bottomImage}></Image>
                        <Text> {info.raw_data.comment_base.action.forward_count} </Text>
                    </View>
                </View>
                <View>
                    <View style={styles.bottomSubView}>
                        <Image source={require('./img/resouces/comment_feed.png')} style={styles.bottomImage}></Image>
                        <Text> {info.raw_data.comment_base.action.comment_count} </Text>
                    </View>
                </View>
                <View>
                    <View style={styles.bottomSubView}>
                        <Image source={require('./img/resouces/feed_like.png')} style={styles.bottomImage}></Image>
                        <Text> {info.raw_data.comment_base.action.digg_count} </Text>
                    </View>
                </View>
            </View>
        )
    }

    renderUser = () => {
        let info = this.props.info
        return (
            <View style={styles.userView}>
                <Image style={styles.avatar} source={{uri: info.raw_data.comment_base.user.info.avatar_url}}/>
                <View>
                    <View style={styles.name}>
                        <Text style={{fontSize: 14, color: 'black'}}>{info.raw_data.comment_base.user.info.name}</Text>
                    </View>
                    <View style={styles.desc}>
                        <Text style={{fontSize: 12, color: '#666666'}} numberOfLines={1}>{info.raw_data.comment_base.user.info.desc}</Text>
                    </View>
                </View>
            </View>
        )
    }

    renderContent = () => {
        let info = this.props.info
        if (info != undefined && info.raw_data.comment_base.content != undefined) {
            return (
                <View style={styles.content}>
                    <Text numberOfLines={info.raw_data.stream_ui.default_text_line}> {info.raw_data.comment_base.content} </Text>
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

    renderForwardView = () => {
        let info = this.props.info
        var identify = ""
        var content = ""
        var images = []
        var lines = 0
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

        if (info.raw_data.comment_type == 211) {
            content = info.raw_data.origin_common_content.title
            images = info.raw_data.origin_common_content.cover_image.url_list
            lines = info.raw_data.stream_ui.default_text_line
        } else if (info.raw_data.comment_type == 212) {
            content = info.info.raw_data.origin_thread.content
            images = info.raw_data.origin_thread.ugc_cut_image_list
            lines = info.info.raw_data.origin_thread.default_text_line
        }

        console.log("renderPics" + this.props.numColumns)
        if (images.length > 0) {
            return (
                <View style={{marginLeft: 10, marginRight: 10, width: screenWidth-20, borderWidth: 0.5, borderColor: '#f4f5f6'}}>
                    <Text numberOfLines={lines} style={{margin: 10}}>{content}</Text>
                    <FlatList style={{width: screenWidth}}
                              numColumns={this.props.numColumns}
                              data={images}
                              renderItem={this.renderItem}
                              key={identify}
                    />
                </View>
            )
        } else {
            return (
                <View>
                    <Text numberOfLines={lines}>{content}</Text>
                </View>
            )
        }
    }

    render() {
        let info = this.props.info
        if (info.raw_data != undefined) {
            return(
                <View style={{backgroundColor: 'white'}}>
                    {this.renderUser()}
                    {this.renderContent()}
                    {this.renderForwardView()}
                    {this.renderBottomView()}
                    <View style={{width: screenWidth, height:10, backgroundColor: '#f4f5f6'}}></View>
                </View>
            )
        } else {
            return (
                <Text></Text>
            )
        }
    }
}

export default WeitoutiaoForwardCell

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
    },
    bottomView: {
        width: screenWidth,
        height: 45,
        backgroundColor: 'white',
        flexDirection: 'row'
    },
    bottomSubView: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        width: screenWidth/3,
        flex: 1
    },
    bottomImage: {
        width: 24,
        height: 24
    }
})