/**
 * Created by yangfangming On 2018/5/21
 *
 * Copyright © 2018-present, yangfangming
 * All rights reserved.
 */


import React, { Component } from 'react'
import {
    AppRegistry, StyleSheet, View, Text, FlatList, Image, ScrollView, SectionList, TouchableOpacity
} from 'react-native'
import {StackNavigator, TabNavigator, TabBarBottom} from 'react-navigation';

import HomeScreen from "./src/snece/HomeScreen"
import ChatScreen from "./src/snece/ChatScreen";

// RN cell 布局、本地图片加载
// export default class FlexboxTest extends Component {
//     render() {
//         return (
//             <View style={styles.container}>
//                 <Image style={styles.icon}
//                        source={require('./src/img/home/icon_homepage_entertainment_category.png')} />
//                 <View style={styles.subView}>
//
//                     <View  style={styles.text}>
//                         <Text> hello world </Text>
//                     </View>
//
//                     <View style={styles.view}>
//                         <Text> nihao </Text>
//                     </View>
//                 </View>
//             </View>
//         )
//     }
// }
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: 'gray',
//         flexDirection: 'row'
//     },
//     icon: {
//         width: 50,
//         height: 50,
//         marginLeft: 20,
//         marginTop: 20
//     },
//     subView: {
//         flex: 1,
//         margin: 20,
//         // right: 20,
//         // width: 300,
//         height: 80,
//         backgroundColor: 'blue',
//     },
//     text: {
//         // flex: 1,
//         marginTop: 8,
//         marginLeft: 8,
//         marginRight: 8,
//         backgroundColor: 'red',
//         height: 20
//
//     },
//     view: {
//         // marginBottom: 8,
//         flex: 1,
//         height: 20,
//         backgroundColor: 'red',
//         justifyContent: 'flex-end'
//     }
// })


// RN加载网络图片
//
// var imagePath = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000' +
//     '&sec=1526988631291&di=9da54391aebed69610a98b4491db4dea' +
//     '&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F15%2F23%2F09%2F74T58PICZjg_1024.jpg'
//
// export default class FlexboxTest extends Component {
//     render() {
//         return (
//             <View style={styles.container}>
//                 <Image style={styles.icon}
//                        source={{uri: imagePath}} />
//             </View>
//         )
//     }
// }
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'flex-start',
//         alignItems: 'center',
//         backgroundColor: 'white'
//     },
//     icon: {
//         top: 100,
//         width: 100,
//         height: 100,
//         alignSelf: 'center' // 使用此属性设置自己的对齐方式，忽略父组件的布局
//     }
// })


// RN 基本列表
// var arr = []
// for (i=0; i<100; i++) {
//     arr[i] = {'key': 'row ' + i.toString()}
// }
//
// export default class FlexboxTest extends Component {
//     render() {
//         return (
//           <View style={styles.container}>
//               <FlatList
//                   data={arr}
//                   renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
//               />
//           </View>
//         )
//     }
// }
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         top: 20,
//         backgroundColor: 'white'
//     },
//     item: {
//         padding: 10,
//         fontSize: 18,
//         height: 44,
//     }
// })

// RN 分组列表
// export default class FlexboxTest extends Component {
//     render() {
//         return (
//             <View style={styles.container}>
//                 <SectionList
//                 sections={[
//                         {title: 'D', data: ['Devin']},
//                         {title: 'J', data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie']},
//                     ]}
//                     renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
//                     renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
//                 />
//             </View>
//         );
//     }
// }
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         paddingTop: 22
//     },
//     sectionHeader: {
//         paddingTop: 2,
//         paddingLeft: 10,
//         paddingRight: 10,
//         paddingBottom: 2,
//         fontSize: 14,
//         fontWeight: 'bold',
//         backgroundColor: 'rgba(247,247,247,1.0)',
//     },
//     item: {
//         padding: 10,
//         fontSize: 18,
//         height: 44,
//     },
// })

// RN ScrollView
// export default class FlexboxTest extends Component {
//     render() {
//         return(
//             <ScrollView>
//                 <Text style={{fontSize:96}}>Scroll me plz</Text>
//                 <Image source={require('./src/img/home/icon_homepage_entertainment_category.png')} />
//                 <Image source={require('./src/img/home/icon_homepage_entertainment_category.png')} />
//                 <Image source={require('./src/img/home/icon_homepage_entertainment_category.png')} />
//                 <Image source={require('./src/img/home/icon_homepage_entertainment_category.png')} />
//                 <Image source={require('./src/img/home/icon_homepage_entertainment_category.png')} />
//                 <Text style={{fontSize:96}}>If you like</Text>
//                 <Image source={require('./src/img/home/icon_homepage_entertainment_category.png')} />
//                 <Image source={require('./src/img/home/icon_homepage_entertainment_category.png')} />
//                 <Image source={require('./src/img/home/icon_homepage_entertainment_category.png')} />
//                 <Image source={require('./src/img/home/icon_homepage_entertainment_category.png')} />
//                 <Image source={require('./src/img/home/icon_homepage_entertainment_category.png')} />
//                 <Text style={{fontSize:96}}>Scrolling down</Text>
//                 <Image source={require('./src/img/home/icon_homepage_entertainment_category.png')} />
//                 <Image source={require('./src/img/home/icon_homepage_entertainment_category.png')} />
//                 <Image source={require('./src/img/home/icon_homepage_entertainment_category.png')} />
//                 <Image source={require('./src/img/home/icon_homepage_entertainment_category.png')} />
//                 <Image source={require('./src/img/home/icon_homepage_entertainment_category.png')} />
//                 <Text style={{fontSize:96}}>What's the best</Text>
//                 <Image source={require('./src/img/home/icon_homepage_entertainment_category.png')} />
//                 <Image source={require('./src/img/home/icon_homepage_entertainment_category.png')} />
//                 <Image source={require('./src/img/home/icon_homepage_entertainment_category.png')} />
//                 <Image source={require('./src/img/home/icon_homepage_entertainment_category.png')} />
//                 <Image source={require('./src/img/home/icon_homepage_entertainment_category.png')} />
//                 <Text style={{fontSize:96}}>Framework around?</Text>
//                 <Image source={require('./src/img/home/icon_homepage_entertainment_category.png')} />
//                 <Image source={require('./src/img/home/icon_homepage_entertainment_category.png')} />
//                 <Image source={require('./src/img/home/icon_homepage_entertainment_category.png')} />
//                 <Image source={require('./src/img/home/icon_homepage_entertainment_category.png')} />
//                 <Image source={require('./src/img/home/icon_homepage_entertainment_category.png')} />
//                 <Text style={{fontSize:80}}>React Native</Text>
//             </ScrollView>
//         );
//     }
// }

// RN 可触摸组件、按钮
// export default class FlexboxTest extends Component {
//
//     _onPressButton() {
//         alert('Button Click!')
//     }
//
//     render() {
//         return (
//             <TouchableOpacity onPress={this._onPressButton} style={styles.position}>
//                 {/*<Text>Button</Text>*/}
//                 <Image style={styles.icon} source={require('./src/img/home/icon_homepage_entertainment_category.png')} />
//             </TouchableOpacity>
//         )
//     }
// }
//
// const styles = StyleSheet.create({
//     position: {
//         marginTop: 50,
//         marginLeft: 100
//     }
// })

// RN 导航栏的使用
// const Navigator = StackNavigator(
//     // 设置导航要展示的页面
//     {
//         HomeScreen: {screen: HomeScreen},
//         ChatScreen: {screen: ChatScreen}
//     },
//     //设置navigationOptions属性对象
//     {
//         navigationOptions: {
//             title: '首页',
//             headerBackTitle: null,
//             headerTintColor: '#333333',
//             showIcon: true,
//             swipeEnabled: false,
//             animationEnabled: false,
//         },
//         mode: 'card',
//     }
// );
//
// export default class FlexboxTest extends Component {
//     render() {
//         return (
//             <Navigator/>
//         )
//     }
// }

// TN Tabbar使用
export default class FlexboxTest extends Component {
    render() {

    }
}


AppRegistry.registerComponent('FlexboxTest', () => FlexboxTest)