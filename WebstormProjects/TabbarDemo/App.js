/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {StackNavigator, TabNavigator, TabBarBottom} from 'react-navigation';

import { Root, FeedStack, Tabs } from './src/Root'
import Feed from "./src/Feed";
import Me from "./src/Me";
import Detail from "./src/Detail";
import TabBarItem from "./src/TabBarItem";

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <Tabs />
    );
  }
}