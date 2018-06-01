/**
 * Created by {USER} On {DATE}
 *
 * Copyright © 2018-present, {USER}
 * All rights reserved.
 */

import React, { Component } from 'react'
import {
    Text,
    View,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import {RefreshState} from "react-native-refresh-list-view";
import Grid from 'react-native-grid-component';
import VideoCell from "./VideoCell";

class Video extends Component {

    state = {
        data: []
    }

    componentDidMount() {
        this.getVideos()
    }

    getVideos() {
        let url = `http://lg.snssdk.com/api/news/feed/v80/?fp=wSTqLWK7JlFWFlPMFrU1Flx7LWw7&version_code=6.6.5`
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
                console.log(data)
                let result = data.data.map((info) => {
                    let JSONbig = require('json-bigint')
                    let json = JSONbig.parse(info.content)
                    return json
                })

                this.setState({
                    data: result
                })
            })
            .catch(
                (error) => {
                    alert(error)
                }
            )
    }

    render() {
        return (
            <Grid
                data={[1,2,3,4,5,6]}
                style={{flex: 1}}
                itemsPerRow={2}
                renderItem={item => (
                    <VideoCell/>
                )}
            />
        )
    }
}

export default Video