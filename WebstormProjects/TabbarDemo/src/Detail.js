/**
 * Created by yangfangming On 2018/5/28
 *
 * Copyright © 2018-present, yangfangming
 * All rights reserved.
 */

import React, { Component } from 'react'
import {
    Text,
    View,
    WebView,
    Platform,
    ScrollView,
    FlatList,
    Dimensions
} from 'react-native';
import AutoHeightWebView from 'react-native-autoheight-webview'
import CommentCell from "./CommentCell";

export const RefreshState = {
    Idle: 0,
    HeaderRefreshing: 1,
    FooterRefreshing: 2,
    NoMoreData: 3,
    Failure: 4,
    EmptyData: 5,
}

type Props = {
    id: string,
}

var count = 10
var offset = 0
var preHeight = 0

type State = {
    data: Object,
    height: number,
    comments: Array<Object>,
    refreshState: RefreshState,
    webViewLoadEnd: boolean
}

const BaseScript =
    `
    (function () {
        var height = null;
        function changeHeight() {
        console.log(document.body)
          if (document.body.scrollHeight != height) {
            height = document.body.scrollHeight;
            if (window.postMessage) {
              window.postMessage(JSON.stringify({
                type: 'setHeight',
                height: height,
              }))
            }
          }
        }
        setInterval(changeHeight, 100);
    } ())
    `

class Detail extends Component<Props, State> {

    constructor(Props) {
        super(Props)

        this.state = {
            data: Object(),
            webHeight: 0,
            comments: [],
            refreshState: RefreshState.Idle,
            webViewLoadEnd: false
        }
    }

    componentDidMount() {
        console.log('componentDidMount')
        this.getDetail()
        offset = 0
    }

    // 上拉刷新
    onFooterRefresh = () => {
        if (this.state.refreshState != RefreshState.NoMoreData) {
            console.log('加载更多')
            this.setState({refreshState: RefreshState.FooterRefreshing})
            setTimeout(function () {
                this.getComments()
            }.bind(this), 500)
        }
    }

    getDetail() {
        let id = this.props.navigation.state.params.id
        let url = `http://a.pstatp.com/article/content/19/2/${id}/${id}/1/0`
        console.log(url)
        let map = {
            method: 'GET'
        }
        let requestHeaders = {
            'Content-Type': "application/x-www-form-urlencoded"
        }
        map.headers = requestHeaders
        map.timeout = 30
        map.size = 0
        map.responseHeaders = {'Content-Type': "application/json"}
        fetch(url, map)
            .then(response => response.json()) // 转成json
            .then(data => {
                this.setState({
                    data: data.data
                })
            })
            .catch(
                (error) => {
                    alert(error)
                }
            )
    }

    getComments() {
        console.log("getComments")
        // http://lf.snssdk.com/article/v2/tab_comments/?group_id=6535582244147298830
        // &item_id=6535582244147298830&count=20
        var dataList = []
        let id = this.props.navigation.state.params.id
        let url = `http://lf.snssdk.com/article/v2/tab_comments/?group_id=${id}&item_id=${id}&count=${count}&offset=${offset}`
        console.log(url)
        let map = {
            method: 'GET'
        }
        let requestHeaders = {
            'Content-Type': "application/x-www-form-urlencoded"
        }
        map.headers = requestHeaders
        map.timeout = 30
        map.size = 0
        map.responseHeaders = {'Content-Type': "application/json"}
        fetch(url, map)
            .then(response => response.json()) // 转成json
            .then(data => {

                dataList = this.state.comments.concat(data.data)
                offset += data.data.length

                this.setState({
                    comments: dataList,
                    refreshState: data.data.length > 0 ? RefreshState.Idle: RefreshState.NoMoreData,
                })
            })
            .catch(
                (error) => {
                    alert(error)
                }
            )
    }

    onLoad = () => {
        console.log(`onLoadEnd  height: ${this.state.height}`)
        // if (this.state.height != undefined) {
        //     this.getComments()
        // }
        setTimeout(function () {
            this.getComments()
        }.bind(this), 2000)
    }

    _onScroll = (event) => {
        console.log('onScroll')
        let y = event.nativeEvent.contentOffset.y;
        let height = event.nativeEvent.layoutMeasurement.height;
        let contentHeight = event.nativeEvent.contentSize.height;
        console.log('offsetY-->' + y);
        console.log('height-->' + height);
        console.log('contentHeight-->' + contentHeight);
        if (y+height > contentHeight-40) {
            this.onFooterRefresh()
        }
    }

    /**
     * web端发送过来的交互消息
     */
    onMessage (event) {
        try {
            const action = JSON.parse(event.nativeEvent.data)
            console.log('onMessage ' + action.height)
            if (action.type === 'setHeight' && action.height > 0 && action.height < 10000) {
                this.setState({ height: action.height })
                preHeight = action.height
            }
        } catch (error) {
            // pass
            alert(error)
        }
    }

    renderWeb = () => {
        var html = ""
        let data = this.state.data

        if (data.content != undefined) {
            if (Platform.OS == 'android') {
                html = "<html>" + "<body style=letter-spacing:2px;word-spacing:5px;text-align:justify;overflow:hidden;margin:10px 10px;word-break:break-all>"  + data.content +  "</body>" + "</html>"
            } else {
                html = "<html>" + "<body style=font-size:18px;letter-spacing:2px;word-spacing:5px;text-align:justify;overflow:hidden;margin:10px 10px;word-break:break-all>"  + data.content +  "</body>" + "</html>"
            }

            html = html.replace("<header>", '<h3>')
            html = html.replace("</header>", '</h3>')

            html = html.replace(new RegExp("><a class=\"image\"", "g"), " style=text-align:center><img style=width:100%;height:auto;")
            html = html.replace(new RegExp("></a>", "g"), '>')
            html = html.replace(new RegExp("bytedance://large_image", "g"), '')
            html = html.replace(/\?url=/g, '')
            html = html.replace(new RegExp("%3A", "g"), ':')
            html = html.replace(new RegExp("%2F", "g"), '/')
            html = html.replace(new RegExp("&index=[0-9]", "g"), '')
            html = html.replace(new RegExp("href", "g"), 'src')
        }

       return <AutoHeightWebView
                     source={{html, baseUrl: ''}}
                     onHeightUpdated={height => this.setState({height})}
                     onLoad={this.onLoad}
                     scrollEnabled={false}
                     enableBaseUrl={true}
                     sytle={{
                         width: Dimensions.get('window').width,
                         // height: this.state.height
                     }}
            >
            </AutoHeightWebView>
    }

    renderComments() {
        return <FlatList
            data={this.state.comments}
            renderItem={({item}) => <CommentCell comment={item}/> }
        />
    }

    render() {
        return(
            <ScrollView
                onContentSizeChange = {()=>console.log("onContentSizeChange")}
                onMomentumScrollEnd = {()=>console.log("onMomentumScrollEnd")}
                onScroll={this._onScroll}
                onEndReachedThreshold={0.1}
            >

                {this.renderWeb()}
                {this.renderComments()}
            </ScrollView>

        )
    }
}

export default Detail