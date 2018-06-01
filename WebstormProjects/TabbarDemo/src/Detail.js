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
import RefreshListView, {RefreshState} from 'react-native-refresh-list-view'

type Props = {
    id: string,
}

type State = {
    data: Object,
    height: number,
    comments: Array<Object>,
    refreshState: number
}

class Detail extends Component<Props, State> {

    constructor(Props) {
        super(Props)

        this.state = {
            data: Object(),
            height: 0,
            comments: [],
            refreshState: RefreshState.Idle
        }
    }

    componentDidMount() {
        this.getDetail()
    }

    // 上拉刷新
    onFooterRefresh = () => {

        this.setState({refreshState: RefreshState.FooterRefreshing})

        this.getComments(10)
    }

    getDetail() {
        let id = this.props.navigation.state.params.id
        let url = `http://a.pstatp.com/article/content/19/2/${id}/${id}/1/0`
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

                this.getComments(10)
            })
            .catch(
                (error) => {
                    alert(error)
                }
            )
    }

    getComments(count) {
        // http://lf.snssdk.com/article/v2/tab_comments/?group_id=6535582244147298830
        // &item_id=6535582244147298830&count=20
        var dataList = []
        let id = this.props.navigation.state.params.id
        let url = `http://lf.snssdk.com/article/v2/tab_comments/?group_id=${id}&item_id=${id}&count=${count}`
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

                this.setState({
                    comments: dataList,
                    refreshState: data.data.length == 10 ? RefreshState.Idle: RefreshState.NoMoreData
                })
            })
            .catch(
                (error) => {
                    alert(error)
                }
            )
    }

    render() {
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

        return(
            <ScrollView>
                <AutoHeightWebView
                    source={{html, baseUrl: ''}}
                    onHeightUpdated={height => this.setState({height})}
                    // onLoadEnd={this.getComments()}
                >
                </AutoHeightWebView>
                <RefreshListView
                    data={this.state.comments}
                    // renderItem={({item}) => <Text style={{padding: 10}}>{item.comment.text}</Text>}
                    renderItem={({item}) => <CommentCell comment={item}/> }
                    refreshState={this.state.refreshState}
                    // onHeaderRefresh={this.onHeaderRefresh}
                    onFooterRefresh={this.onFooterRefresh}
                />
            </ScrollView>
        )
    }
}

export default Detail