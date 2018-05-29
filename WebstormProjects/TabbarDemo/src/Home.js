/**
 * Created by yangfangming On 2018/5/28
 *
 * Copyright © 2018-present, yangfangming
 * All rights reserved.
 */

import React, { PureComponent } from 'react'
import {
    Text,
    View,
    TouchableOpacity,
    FlatList,
    StyleSheet
} from 'react-native';
import NewsCell from "./NewsCell";

type State = {
    data: Array<Object>,
}

var dataList = Array()

class Home extends PureComponent<State> {

    // 构造方法
    constructor(props: Object) {
        super(props)

        this.state = {
            data: [],
        }
    }

    // 组件声明周期
    componentDidMount() {
        this.getList()
    }

    // 网络请求
    getList() {
        let url = "http://lf.snssdk.com/api/news/feed/v44/?category=news_sports&count=10&device_id=3755813419"
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
            'Content-Type': "application/json"
        }
        map.cookie =
        fetch(url, map)
            .then(response => response.json()) // 转成json
            .then(data => {
                this.dataList = data.data.map((info) => {
                    console.log(info.content)
                    // 将content字符串转成json对象
                    // 使用原生JSON库碰到问题（6559336542580506894变成6559336542580507000，导致文章id错误，获取详情失败）
                    // 详细问题见（https://stackoverflow.com/questions/18755125/node-js-is-there-any-proper-way-to-parse-json-with-large-numbers-long-bigint）
                    // 这里使用json-bigint（https://www.npmjs.com/package/json-bigint）来解决
                    var JSONbig = require('json-bigint')
                    let json = JSONbig.parse(info.content)
                    return json
                })

                // 删除title为空的
                this.dataList = this.dataList.filter(function(n){ return n.title != undefined && n.title.length != 0 })

                this.setState({
                    data: this.dataList
                })
            })
            .catch(
            (error) => {
                alert(error)
            }
        )
    }

    // 分割线
    _separator = () => {
        return <View style={{height: 0.5, backgroundColor: 'black'}}/>;
    }

    // cell
    newsCell = (info: Object) => {
        console.log(info)
        return(
            <NewsCell
                content={info.item}
                onPress={this.onCellSelected}
            />
        )
    }

    // 点击cell
    onCellSelected = (content: Object) => {
        this.props.navigation.navigate('Detail', {id: content.item_id.toString()})
    }

    // 页面渲染
    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.data}
                    // renderItem={({item}) => <Text style={styles.cell}>{item.title}</Text>}
                    renderItem = {this.newsCell}
                    ItemSeparatorComponent={this._separator}
                />
            </View>
        )
    }
}

// 样式表
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
})

export default Home