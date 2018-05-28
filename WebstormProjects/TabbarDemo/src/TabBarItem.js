/**
 * Created by {USER} On {DATE}
 *
 * Copyright © 2018-present, {USER}
 * All rights reserved.
 */

import React,{Component} from 'react'
import {StackNavigator,TabNavigator,TabBarBottom} from 'react-navigation'
import {Image} from 'react-native'

type Props = {
    tintColor: any,
    normalImage:any,
    selectedImage:any,
    focused:boolean,
}

export default class TabBarItem extends Component {
    render() {
        return(
            <Image source={ this.props.focused ? this.props.selectedImage: this.props.normalImage }
                   style={ {tintColor:this.props.tintColor, width:25, height: 25} }
            />
        )
    }
}