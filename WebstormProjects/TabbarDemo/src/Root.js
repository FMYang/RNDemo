/**
 * Created by {USER} On {DATE}
 *
 * Copyright © 2018-present, {USER}
 * All rights reserved.
 */

import React, { Component } from 'react'
import {StackNavigator, TabNavigator, TabBarBottom} from 'react-navigation';

import Feed from "./Feed";
import Detail from "./Detail";
import Setting from "./Setting";
import Me from "./Me";
import MeDetail from "./MeDetail"
import TabBarItem from "./TabBarItem";
import WeiToutiao from "./WeiToutiao";
import Video from "./Video";

export const HomeStack = StackNavigator({
    Home: {
        screen: Feed,
        navigationOptions: {
            title: '首页',
            tabBarIcon:({focused, tintColor}) => (
                <TabBarItem
                    tintColor={tintColor}
                    focused={focused}
                    normalImage={require('./img/tabbar/home_tabbar.png')}
                    selectedImage={require('./img/tabbar/home_tabbar_press.png')}
                />
            )
        },
    },
    Detail: {
        screen: Detail,
        navigationOptions: {
            title: ''
        }
    }
})

export const XiguaStack = StackNavigator({
    Xigua: {
        screen: Me,
        navigationOptions: {
            title: '西瓜视频',
            tabBarIcon:({focused, tintColor}) => (
                <TabBarItem
                    tintColor={tintColor}
                    focused={focused}
                    normalImage={require('./img/tabbar/video_tabbar.png')}
                    selectedImage={require('./img/tabbar/video_tabbar_press.png')}
                />
            )
        }
    },
})

export const WeToutiaoStack = StackNavigator({
    WeiToutiao: {
        screen: WeiToutiao,
        navigationOptions: {
            title: '微头条',
            tabBarIcon:({focused, tintColor}) => (
                <TabBarItem
                    tintColor={tintColor}
                    focused={focused}
                    normalImage={require('./img/tabbar/weitoutiao_tabbar.png')}
                    selectedImage={require('./img/tabbar/weitoutiao_tabbar_press.png')}
                />
            )
        }
    },
})

export const VideoStack = StackNavigator({
    Video: {
        screen: Video,
        navigationOptions: {
            title: '小视频',
            tabBarIcon:({focused, tintColor}) => (
                <TabBarItem
                    tintColor={tintColor}
                    focused={focused}
                    normalImage={require('./img/tabbar/huoshan_tabbar.png')}
                    selectedImage={require('./img/tabbar/huoshan_tabbar_press.png')}
                />
            )
        }
    },
})

export const Tabs = TabNavigator(
    {
        Home: {
            screen: HomeStack,
            navigationOptions: {
                tabBarLabel: '首页',

            }
        },
        Xigua: {
            screen: XiguaStack,
            navigationOptions: {
                tabBarLabel: '西瓜视频',
            }
        },
        Weitoutiao: {
            screen: WeToutiaoStack,
            navigationOptions: {
                tabBarLabel: '微头条',
            }
        },
        Video: {
            screen: VideoStack,
            navigationOptions: {
                tabBarLabel: '小视频',
            }
        }
    },
    {
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        lazy: true,
        animationEnabled: false,
        swipeEnabled: false,
        tabBarOptions: {
            activeTintColor: 'red',
            inactiveTintColor: '#000000',
            style: {backgroundColor: '#ffffff'},
        },
    }
)