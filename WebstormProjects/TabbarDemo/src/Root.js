/**
 * Created by {USER} On {DATE}
 *
 * Copyright © 2018-present, {USER}
 * All rights reserved.
 */

import React, { Component } from 'react'
import { TabNavigator, StackNavigator, TabBarBottom } from 'react-navigation'
import Feed from "./Feed";
import Detail from "./Detail";
import Setting from "./Setting";
import Me from "./Me";
import MeDetail from "./MeDetail"

export const FeedStack = StackNavigator({
    Feed: {
        screen: Feed,
        navigationOptions: {
            title: '首页',
        },
    },
    Detail: {
        screen: Detail,
        navigationOptions: {
            title: ''
        }
    }
})

export const MeStack = StackNavigator({
    Me: {
        screen: Me,
        navigationOptions: {
            title: '我的',
        }
    },
    MeDetail: {
        screen: MeDetail,
        navigationOptions: {
            title: 'MeDetail'
        }
    }
})

export const Tabs = TabNavigator(
    {
        Feed: {
            screen: FeedStack, //Feed,
            navigationOptions: {
                tabBarLabel: '首页',
            }
        },
        Me: {
            screen: MeStack, //Me,
            navigationOptions: {
                tabBarLabel: '我的',
            }
        },
    },
    {
    tabBarPosition: 'bottom',
    // swipeEnabled: true,
    // animationEnabled:true,
    }
)

export const SettingsStack = StackNavigator({
    Settings: {
        screen: Setting,
        navigationOptions: {
            title: 'Setting',
        }
    }
})

export const Root = StackNavigator({
    Tabs: {
        screen: Tabs
    },
    Settings: {
        screen: SettingsStack
    },
    mode: 'modal'
})