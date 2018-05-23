/**
 * Created by yangfangming On 2018/5/23
 *
 * Copyright © 2018-present, yangfangming
 * All rights reserved.
 */

import React, { Component } from 'react'
import { View, Text } from 'react-native'
import {StackNavigator} from 'react-navigation';

export default class ChatScreen extends Component {
    static navigationOptions = {
        title: 'chat',
    };
    render() {
        return (
            <View>
                <Text onPress={()=>this.props.navigation.goBack()}>Chat with Lucy</Text>
            </View>
        );
    }
}