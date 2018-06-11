/**
 * Created by yangfangming On 2018/6/11
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

type Props = {
    info: Object
}

class WeitoutiaoHotItem extends Component<Props> {
    render() {
        let info = this.props.info

        return (
            <View style={styles.container}>
                <Image source={{uri: info.avatar_url}} style={styles.image}/>
                <View>
                    <View style={styles.title}>
                        <Text numberOfLines={1} style={{fontSize: 12}}>{info.forum_name}</Text>
                    </View>
                    <View style={styles.desc}>
                        <Text numberOfLines={1} style={{fontSize: 10, color: '#666666', backgroundColor: '#f4f5f6',
                            borderRadius: 4}}>{info.sub_title}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

export default WeitoutiaoHotItem

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flex: 1,
    },
    title: {
        marginRight: 10,
    },
    desc: {
        flex: 2,
        marginTop: 5,
        marginRight: 10,
    },
    image: {
        width: 30,
        height: 30,
        borderRadius: 4,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10
    }
})