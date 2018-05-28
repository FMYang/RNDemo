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
import Tools from './Tools'

type State = {
    data: Array<Object>,
}

var dataList = Array()

class Feed extends PureComponent<State> {

    constructor(props: Object) {
        super(props)

        this.state = {
            data: [],
        }
    }

    componentDidMount() {
        this.getList()
    }

    onPress() {
        this.props.navigation.navigate('Detail')
    }

    // 网络请求
    getList() {
        let url = "http://lf.snssdk.com/api/news/feed/v44/"
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
                this.dataList = data.data.map((info) => {
                    // 将content字符串转成json对象
                    let json = JSON.parse(info.content)
                    console.log(json.abstract.length)
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

    render() {
        console.log(this.dataList)
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.data}
                    renderItem={({item}) => <Text style={styles.cell}>{item.title}</Text>}
                    ItemSeparatorComponent={this._separator}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    cell: {
        fontSize: 18,
        padding: 15
    }
})

export default Feed