/**
 * Created by yangfangming On 2018/5/23
 *
 * Copyright © 2018-present, yangfangming
 * All rights reserved.
 */

import React, { Component } from 'react'
import { Platform, StyleSheet, AppRegistry, View, Text, Button, TouchableOpacity } from 'react-native'

export default class HomeScreen extends Component {
    static navigationOptions = {
        title: 'home',
    };
    render() {
        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <Button
                    onPress={() => this.props.navigation.navigate('ChatScreen')}
                    title={'Tap me to jump!'}
                />
            </View>
        );
    }
}