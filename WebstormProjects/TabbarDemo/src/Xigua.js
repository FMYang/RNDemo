/**
 * Created by yangfangming On 2018/5/28
 *
 * Copyright © 2018-present, yangfangming
 * All rights reserved.
 */

// https://lf.snssdk.com/api/news/feed/v64/

import React, { Component } from 'react'
import {
    Text,
    View,
    TouchableOpacity,
    FlatList
} from 'react-native';
import RefreshListView, {RefreshState} from 'react-native-refresh-list-view'
import XiguaCell from "./XiguaCell";

class Xigua extends Component {

    // 构造方法
    constructor(props: Object) {
        super(props)

        // 初始化状态
        this.state = {
            data: [],
            refreshState: RefreshState.Idle
        }
    }

    // 组件声明周期，组件已经加载
    componentDidMount() {
        this.getList()
        this.onHeaderRefresh()
    }

    // 下拉刷新
    onHeaderRefresh = ()=> {
        this.setState({refreshState: RefreshState.HeaderRefreshing})

        this.getList()
    }

    // 上拉刷新
    onFooterRefresh = () => {
        this.setState({refreshState: RefreshState.FooterRefreshing})

        this.getList()
    }

    // 网络请求
    getList() {
        var dataList = []
        let url = "https://lf.snssdk.com/api/news/feed/v64/"
        let map = {
            method: 'GET'
        }
        let requestHeaders = {
            'Content-Type': "application/x-www-form-urlencoded"
        }
        map.headers = requestHeaders
        map.timeout = 30
        map.size = 0
        map.responseHeaders = {
            'Content-Type': "application/json",
            'cookie': "odin_tt=d9e677cbf53f8595e72590da191bdc0a42bcdebc124c48eca0bfc1a7582d6d6c0f6233cfa49a439c60c0632c9c213132"
        }
        map.cookie =
            fetch(url, map)
                .then(response => response.json()) // 转成json
                .then(data => {
                    var resultArray = data.data.map((info) => {
                        // 将content字符串转成json对象
                        // 使用原生JSON库碰到问题（6559336542580506894变成6559336542580507000，导致文章id错误，获取详情失败）
                        // 详细问题见（https://stackoverflow.com/questions/18755125/node-js-is-there-any-proper-way-to-parse-json-with-large-numbers-long-bigint）
                        // 这里使用json-bigint（https://www.npmjs.com/package/json-bigint）来解决
                        let JSONbig = require('json-bigint')
                        let json = JSONbig.parse(info.content)
                        return json
                    })

                    if (this.state.refreshState == RefreshState.HeaderRefreshing) {
                        dataList = resultArray
                    } else {
                        dataList = this.state.data.concat(resultArray)//resultArray//[this.state.data, resultArray]
                    }

                    // 改变状态
                    this.setState({
                        data: dataList,
                        refreshState: dataList.length > 0 ? RefreshState.Idle : RefreshState.NoMoreData
                    })
                })
                .catch(
                    (error) => {
                        alert(error)
                    }
                )
    }

    renderCell = (item) => {
        return <XiguaCell info={item}/>
    }

    render() {
        return(
            <RefreshListView
                data={this.state.data}
                renderItem={this.renderCell}
                refreshState={this.state.refreshState}
                onHeaderRefresh={this.onHeaderRefresh}
                onFooterRefresh={this.onFooterRefresh}
            />
        )
    }
}

export default Xigua