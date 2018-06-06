// /**
//  * Created by {USER} On {DATE}
//  *
//  * Copyright © 2018-present, {USER}
//  * All rights reserved.
//  */
//
// import React, { Component } from 'react'
// import {
//     Text,
//     View,
//     WebView,
//     Platform,
//     ScrollView,
//     FlatList,
//     Dimensions
// } from 'react-native';
// import CommentCell from "./CommentCell";
// import AutoResizeHeightWebView from 'react-native-autoreheight-webview'
//
// type Props = {
//     id: string,
// }
//
// var count = 10
// var offset = 0
//
// type State = {
//     data: Object,
//     height: number,
//     comments: Array<Object>,
// }
//
// const BaseScript =
//     `
//     (function () {
//         var height = null;
//         function changeHeight() {
//           if (document.body.scrollHeight != height) {
//             height = document.body.scrollHeight;
//             if (window.postMessage) {
//               window.postMessage(JSON.stringify({
//                 type: 'setHeight',
//                 height: height,
//               }))
//             }
//           }
//         }
//         setInterval(changeHeight, 100);
//     } ())
//     `
//
// class NewsDetail extends Component<Props, State> {
//
//     constructor(Props) {
//         super(Props)
//
//         this.state = {
//             data: Object(),
//             height: 0,
//             comments: [],
//         }
//
//     }
//
//     componentDidMount() {
//         this.getDetail()
//         offset = 0
//     }
//
//     getDetail() {
//         let id = this.props.navigation.state.params.id
//         let url = `http://a.pstatp.com/article/content/19/2/${id}/${id}/1/0`
//         let map = {
//             method: 'GET'
//         }
//         let requestHeaders = {
//             'Content-Type': "application/x-www-form-urlencoded"
//         }
//         map.headers = requestHeaders
//         map.timeout = 30
//         map.size = 0
//         map.responseHeaders = {'Content-Type': "application/json"}
//         fetch(url, map)
//             .then(response => response.json()) // 转成json
//             .then(data => {
//                 this.setState({
//                     data: data.data
//                 })
//             })
//             .catch(
//                 (error) => {
//                     alert(error)
//                 }
//             )
//     }
//
//     /**
//      * web端发送过来的交互消息
//      */
//     onMessage (event) {
//         try {
//             const action = JSON.parse(event.nativeEvent.data)
//             if (action.type === 'setHeight' && action.height > 0) {
//                 this.setState({ height: action.height })
//             }
//         } catch (error) {
//             // pass
//         }
//     }
//
//     onLoadEnd = () => {
//         // alert('onLoadEnd')
//     }
//
//     header() {
//         // return(
//         //     <Text>web</Text>
//         // )
//         var html = ""
//         let data = this.state.data
//
//         if (data.content != undefined) {
//             if (Platform.OS == 'android') {
//                 html = "<html>" + "<body style=letter-spacing:2px;word-spacing:5px;text-align:justify;overflow:hidden;margin:10px 10px;word-break:break-all>"  + data.content +  "</body>" + "</html>"
//             } else {
//                 html = "<html>" + "<body style=font-size:40px;letter-spacing:2px;word-spacing:5px;text-align:justify;overflow:hidden;margin:10px 10px;word-break:break-all>"  + data.content +  "</body>" + "</html>"
//             }
//
//             html = html.replace("<header>", '<h3>')
//             html = html.replace("</header>", '</h3>')
//
//             html = html.replace(new RegExp("><a class=\"image\"", "g"), " style=text-align:center><img style=width:100%;height:auto;")
//             html = html.replace(new RegExp("></a>", "g"), '>')
//             html = html.replace(new RegExp("bytedance://large_image", "g"), '')
//             html = html.replace(/\?url=/g, '')
//             html = html.replace(new RegExp("%3A", "g"), ':')
//             html = html.replace(new RegExp("%2F", "g"), '/')
//             html = html.replace(new RegExp("&index=[0-9]", "g"), '')
//             html = html.replace(new RegExp("href", "g"), 'src')
//         }
//
//         return (
//             <AutoResizeHeightWebView
//             source={{html, baseUrl: ''}}
//             onLoadEnd={this.onLoadEnd}
//             defaultHeight={Dimensions.get('window').height}
//             sytle={{
//                 width: Dimensions.get('window').width,
//             }} />
//         )
//     }
//
//     render() {
//
//         var html = ""
//         let data = this.state.data
//
//         if (data.content != undefined) {
//             if (Platform.OS == 'android') {
//                 html = "<html>" + "<body style=letter-spacing:2px;word-spacing:5px;text-align:justify;overflow:hidden;margin:10px 10px;word-break:break-all>"  + data.content +  "</body>" + "</html>"
//             } else {
//                 html = "<html>" + "<body style=font-size:40px;letter-spacing:2px;word-spacing:5px;text-align:justify;overflow:hidden;margin:10px 10px;word-break:break-all>"  + data.content +  "</body>" + "</html>"
//             }
//
//             html = html.replace("<header>", '<h3>')
//             html = html.replace("</header>", '</h3>')
//
//             html = html.replace(new RegExp("><a class=\"image\"", "g"), " style=text-align:center><img style=width:100%;height:auto;")
//             html = html.replace(new RegExp("></a>", "g"), '>')
//             html = html.replace(new RegExp("bytedance://large_image", "g"), '')
//             html = html.replace(/\?url=/g, '')
//             html = html.replace(new RegExp("%3A", "g"), ':')
//             html = html.replace(new RegExp("%2F", "g"), '/')
//             html = html.replace(new RegExp("&index=[0-9]", "g"), '')
//             html = html.replace(new RegExp("href", "g"), 'src')
//         }
//
//         return(
//             <ScrollView>
//                 {this.header()}
//             </ScrollView>
//         // <ScrollView style={{flex: 1}}>
//
//             /*
//             <FlatList
//                 data={[{'key': 1},{'key': 1},{'key': 1},{'key': 1},{'key': 1},{'key': 1}]}
//                 renderItem={({item}) => <Text>{item.key}</Text>}
//                 ListHeaderComponent={this.header.bind(this)}
//             />
//             */
//
//
//
//             /*
//                 <WebView
//                     source={{html, baseUrl: ''}}
//                     scrollEnabled={true}
//                     automaticallyAdjustContentInsets={true}
//                     onError={() => console.log('on error')}
//                     onLoad={() => console.log('on load')}
//                     onLoadStart={() => console.log('on load start')}
//                     onLoadEnd={() => console.log('on load end')}
//                     sytle={{
//                         width: Dimensions.get('window').width,
//                         height: this.state.height
//                     }}
//                 />
//                 */
//
//
// //            </ScrollView>
//         )
//     }
// }
//
// export default NewsDetail