/**
 * Created by yangfangming On 2018/5/23
 *
 * Copyright © 2018-present, yangfangming
 * All rights reserved.
 */

import React,{Component} from 'react'
import {StackNavigator,TabNavigator,TabBarBottom} from 'react-navigation'
import {Image} from 'react-native'

export default class TabBarItem extends Component {
    render() {
        return(
            <Image source={ this.props.focused ? this.props.selectedImage: this.props.normalImage }
                    style={ {tintColor:this.props.tintColor, width:25, height: 25} }
            />
        )
    }
}