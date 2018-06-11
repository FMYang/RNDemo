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
import WeitoutiaoHotItem from "./WeitoutiaoHotItem";
import {screenWidth} from "./Tools";

type Props = {
    data: Array<Object>
}

class WeitoutiaoHotCell extends Component<Props> {

    renderItem = (info) => {
        return <WeitoutiaoHotItem info={info.item}/>
    }

    renderSpaceView = () => {
        return (
            <View style={styles.spaceView}></View>
        )
    }

    render() {
        let data = this.props.data.forum_list
        return(
            <View style={{backgroundColor: 'white'}}>
                <View style={{flexDirection: 'row', alignItems: 'center', height: 40}}>
                    <Image source={require('./img/resouces/热榜.png')} style={styles.headerView}/>
                    <Text style={styles.text}> 热榜 </Text>
                </View>
                <FlatList
                    data={data}
                    renderItem={this.renderItem}
                    numColumns={2}
                />
                {this.renderSpaceView()}
            </View>
        )
    }
}

export default WeitoutiaoHotCell

const styles = StyleSheet.create({
    headerView: {
        margin: 10,
        marginLeft: 10,
        marginBottom: 10,
        // marginRight: 10,
        marginTop: 10,
        width: 15,
        height: 15
    },
    text: {
        marginLeft: -10
    },
    spaceView: {
        width: screenWidth,
        height:10,
        backgroundColor: '#f4f5f6'
    }
})