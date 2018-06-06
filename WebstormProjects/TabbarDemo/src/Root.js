/**
 * Created by {USER} On {DATE}
 *
 * Copyright © 2018-present, {USER}
 * All rights reserved.
 */

import React, { Component } from 'react'
import {StackNavigator, TabNavigator, TabBarBottom} from 'react-navigation';
import { YellowBox } from 'react-native'
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
YellowBox.ignoreWarnings(['VirtualizedList: ', 'Module RCTImageLoader']);

import Home from "./Home";
import Detail from "./Detail";
import TabBarItem from "./TabBarItem";
import WeiToutiao from "./WeiToutiao";
import Video from "./Video";
import Xigua from "./Xigua";

export const HomeStack = StackNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            title: '首页',
            headerTintColor: 'white',
            headerStyle: { backgroundColor: '#d43d3d' },
            tabBarIcon:({focused, tintColor}) => (
                <TabBarItem
                    tintColor={tintColor}
                    focused={focused}
                    normalImage={require('./img/tabbar/home_tabbar.png')}
                    selectedImage={require('./img/tabbar/home_tabbar_press.png')}
                />
            ),
        },
    },
    Detail: {
        screen: Detail,
        navigationOptions: {
            title: '',
            tabBarVisible: false, // push的时候隐藏tabbar
        }
    }
})

export const XiguaStack = StackNavigator({
    Xigua: {
        screen: Xigua,
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
            screen: Video,
            navigationOptions: {
                tabBarLabel: '小视频',
                tabBarIcon:({focused, tintColor}) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('./img/tabbar/huoshan_tabbar.png')}
                        selectedImage={require('./img/tabbar/huoshan_tabbar_press.png')}
                    />
                )
            }
        }
    },
    {
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        animationEnabled: false,
        lazyLoad: true,
        swipeEnabled: false,
        tabBarOptions: {
            activeTintColor: 'red',
            inactiveTintColor: '#000000',
            // style: {backgroundColor: '#ffffff'},
        },
    }
)