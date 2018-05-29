/**
 * Created by yangfangming On 2018/5/29
 *
 * Copyright © 2018-present, yangfangming
 * All rights reserved.
 */

import React, { Component } from 'react'
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native'

type Props = {
    content: Object,
    onPress: Function
}

class NewsCell extends Component<Props> {
    render() {
        let {content} = this.props
        return(
            <TouchableOpacity onPress = {() => this.props.onPress(content)}>
                <Text style={styles.cell}> {content.title} </Text>
                {/*<Text style={styles.cell}> Text </Text>*/}
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    cell: {
        fontSize: 18,
        padding: 15
    }
})

export default NewsCell