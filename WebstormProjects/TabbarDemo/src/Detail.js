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

type Props = {
    id: string
}

type State = {
    data: Object,
    content: string,
    height: number,
    comments: Array<Object>
}

class Detail extends Component<Props, State> {

    constructor(Props) {
        super(Props)

        this.state = {
            content: "",
            data: Object(),
            height: 0,
            comments: []
        }

        let id = this.props.navigation.state.params.id

        this.getDetail(id)

        this.getComments(id)
    }

    getDetail(id) {
        let url = "http://a.pstatp.com/article/content/19/2/" + id + "/" + id + "/1/0"
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
                    content: data.data.content,
                    data: data.data
                })
            })
            .catch(
                (error) => {
                    alert(error)
                }
            )
    }

    getComments(id) {
        // http://lf.snssdk.com/article/v2/tab_comments/?group_id=6535582244147298830
        // &item_id=6535582244147298830&count=20
        let url = "http://lf.snssdk.com/article/v2/tab_comments/?group_id=" +
            id + "&item_id=" + id + "&count=20"
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
                console.log(data.data)
                this.setState({
                    comments: data.data
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
        var title = ""
        var data = this.state.data

        // if (data.h5_extra != undefined) {
        //     title = "<h3 text-align:left;font-size:18;font-weight:bold;color:#333333;margin-bottom:5px>" + data.h5_extra.title + "</h3>"
        // }

        if (Platform.OS == 'android') {
            html = "<html>" + "<body style=letter-spacing:2px;word-spacing:5px;text-align:justify;overflow:hidden;margin:10px 10px;word-break:break-all>" + title + this.state.content +  "</body>" + "</html>"
        } else {
            html = "<html>" + "<body style=font-size:18px;letter-spacing:2px;word-spacing:5px;text-align:justify;overflow:hidden;margin:10px 10px;word-break:break-all>" + title + this.state.content +  "</body>" + "</html>"
        }

        html = html.replace(new RegExp("<header>", "g"), '<h3>')
        html = html.replace(new RegExp("</header>", "g"), '</h3>')

        html = html.replace(new RegExp("><a class=\"image\"", "g"), " style=text-align:center><img style=width:100%;height:auto;")
        html = html.replace(new RegExp("></a>", "g"), '>')
        html = html.replace(new RegExp("bytedance://large_image", "g"), '')
        html = html.replace(/\?url=/g, '')
        html = html.replace(new RegExp("%3A", "g"), ':')
        html = html.replace(new RegExp("%2F", "g"), '/')
        html = html.replace(new RegExp("&index=[0-9]", "g"), '')
        html = html.replace(new RegExp("href", "g"), 'src')

        return(
            <ScrollView>
                <AutoHeightWebView
                    source={{html, baseUrl: '' }}
                    onHeightUpdated={height => this.setState({ height })}
                >
                </AutoHeightWebView>
                <Text>评论列表</Text>
                <FlatList
                    data={this.state.comments}
                    renderItem={({item}) => <Text style={{padding: 10}}>{item.comment.text}</Text>}
                />
            </ScrollView>
        )
    }
}

export default Detail