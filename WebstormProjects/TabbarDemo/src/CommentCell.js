/**
 * Created by yangfangming On 2018/6/1
 *
 * Copyright © 2018-present, yangfangming
 * All rights reserved.
 */

import React, { Component } from 'react'
import {
    Text,
    View,
    Image,
    StyleSheet
} from 'react-native'

type Props = {
    comment: Object
}

class CommentCell extends Component<Props> {
    render() {
        let {comment} = this.props.comment
        return(
            <View style={styles.view}>
                <Image style={styles.avatar} source={{uri: comment.user_profile_image_url}}/>
                <View style={styles.subView}>
                    <View style={styles.name}>
                        <Text style={{fontSize: 14, color: 'blue'}}>{comment.user_name}</Text>
                    </View>
                    <View style={styles.comment}>
                        <Text style={{fontSize: 18}}>{comment.text}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

export default CommentCell

const styles = StyleSheet.create({
    view: {
        flex: 1,
        flexDirection: 'row',
        // backgroundColor: 'red',
    },
    subView: {
        flex: 1,
        marginRight: 15,
        // backgroundColor: 'blue',
    },
    name: {
        marginTop: 14,
    },
    comment: {
        marginTop: 15,
    },
    avatar: {
        margin: 15,
        width: 50,
        height: 50,
        resizeMode:'cover',
        borderRadius: 25
    }
})