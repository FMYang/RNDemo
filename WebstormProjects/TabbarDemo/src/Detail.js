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
    WebView
} from 'react-native';

type Props = {
    id: string
}

type State = {
    content: string
}

class Detail extends Component<Props, State> {

    constructor(Props) {
        super(Props)

        this.state = {
            content: "",
        }

        let id = this.props.navigation.state.params.id

        this.getDetail(id)
    }

    getDetail(id) {
        //http://a.pstatp.com/article/content/19/2/6560883282416763399/6560883282416763399/1/0/
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
                console.log(data.data.content)
                this.setState({
                    content: data.data.content
                })
            })
            .catch(
                (error) => {
                    alert(error)
                }
            )
    }

    render() {
        let html = "<html style='font-size: 45px'>" + this.state.content + "</html>"
        return(
            <WebView style={{flex: 1}} source={{html}} />
        )
    }
}

export default Detail