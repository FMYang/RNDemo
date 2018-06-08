/**
 * Created by {USER} On {DATE}
 *
 * Copyright © 2018-present, {USER}
 * All rights reserved.
 */

// https://lh.snssdk.com/api/news/feed/v80/?category=weitoutiao

import React, { Component } from 'react'
import {
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import RefreshListView, {RefreshState} from 'react-native-refresh-list-view'
import WeitoutiaoForwardCell from "./WeitoutiaoForwardCell";
import WeitoutiaoHotCell from "./WeitoutiaoHotCell";
import WeitoutiaoPicCell from "./WeitoutiaoPicCell";
import {screenWidth} from "./Tools";

class WeiToutiao extends Component {

    constructor() {
        super()

        this.state = {
            data: [],
            refreshState: RefreshState.Idle
        }
    }

    // 组件声明周期，组件已经加载
    componentDidMount() {
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
        let url = "https://lh.snssdk.com/api/news/feed/v80/?category=weitoutiao"
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
        }
        map.cookie =
            fetch(url, map)
                .then(response => response.json()) // 转成json
                .then(data => {
                    console.log("微头条====", data)
                    var resultArray = data.data.map((info) => {
                        // 将content字符串转成json对象
                        // 使用原生JSON库碰到问题（6559336542580506894变成6559336542580507000，导致文章id错误，获取详情失败）
                        // 详细问题见（https://stackoverflow.com/questions/18755125/node-js-is-there-any-proper-way-to-parse-json-with-large-numbers-long-bigint）
                        // 这里使用json-bigint（https://www.npmjs.com/package/json-bigint）来解决
                        let JSONbig = require('json-bigint')
                        if (info.content != undefined) {
                            let json = JSONbig.parse(info.content)
                            return json
                        }
                    })

                    if (this.state.refreshState == RefreshState.HeaderRefreshing) {
                        dataList = resultArray.length > 0 ? resultArray : []
                    } else {
                        dataList = this.state.data.concat(resultArray)//resultArray//[this.state.data, resultArray]
                    }

                    // 改变状态
                    this.setState({
                        data: dataList,
                        refreshState: resultArray.length > 0 ? RefreshState.Idle : RefreshState.NoMoreData
                    })
                })
                .catch(
                    (error) => {
                        console.log(error.data)
                        alert(error)
                    }
                )
    }

    getHeight() {

    }

    renderCell = (info) => {
        var numColumns = 0
        var imageHeight = 0
        var imageWidth = 0
        var key = "key"


        let object = info.item
        if (object != undefined) {
            if (object.cell_type == 73) {
                return (
                    <WeitoutiaoHotCell/>
                )
            } else if (object.cell_type == 56) {
                return (
                    <WeitoutiaoForwardCell/>
                )
            }
            else {
                if (object.thumb_image_list != undefined) {
                    let images = Object.values(object.thumb_image_list)
                    let count = images.length

                    switch (count) {
                        case 1:
                            numColumns = 1
                            imageWidth = screenWidth
                            imageHeight = 200
                            key="pic1"
                            break
                        case 2:
                        case 4:
                            numColumns = 2
                            imageWidth = (screenWidth-10)/2
                            imageHeight = imageWidth
                            key="pic2"
                            break
                        case 3:
                        case 5:
                        case 7:
                        case 8:
                        case 9:
                            numColumns = 3
                            imageWidth = (screenWidth-10) / 3
                            imageHeight = imageWidth
                            key="pic3"
                            break
                        default:
                            numColumns = 0
                            key="pic4"
                            break
                    }

                    return(
                        <WeitoutiaoPicCell info={object} numColumns={numColumns} picHeight={imageHeight} picWidth={imageWidth} key={key}/>
                    )
                } else {
                    return (
                        <Text>no pic</Text>
                    )
                }
            }
        }

    }

    render() {
        return (
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

export default WeiToutiao