/**
 * Created by yangfangming On 2018/5/28
 *
 * Copyright © 2018-present, yangfangming
 * All rights reserved.
 */

import React, { Component } from 'react'
import {
    Text,
    View,
    TouchableOpacity,
} from 'react-native';


class Xigua extends Component {
    render() {
        return(
            <TouchableOpacity onPress={() => this.props.navigation.navigate('MeDetail')}>
                <Text> Xigua </Text>
            </TouchableOpacity>
        )
    }
}

export default Xigua