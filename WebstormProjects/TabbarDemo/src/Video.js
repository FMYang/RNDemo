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
    RefreshControl,
    FlatList
} from 'react-native';
// import Grid from 'react-native-grid-component';
import VideoCell from "./VideoCell";
import RefreshListView, {RefreshState} from 'react-native-refresh-list-view'

class Video extends Component {

    state = {
        data: [],
        refreshState: RefreshState.Idle
    }

    componentDidMount() {
        // this.getVideos()
        this.onHeaderRefresh()
    }

    onHeaderRefresh = () => {
        this.setState({refreshState: RefreshState.HeaderRefreshing})
        this.getVideos()
    }

    onFooterRefresh = () => {
        this.setState({refreshState: RefreshState.FooterRefreshing})
        this.getVideos()
    }

    getVideos() {
        // let url = `http://lg.snssdk.com/api/news/feed/v80/?fp=wSTqLWK7JlFWFlPMFrU1Flx7LWw7&version_code=6.6.5&list_count=20&device_platform=iphone&device_id=3755813419`
        var dataList = []
        let url = `http://lf.snssdk.com/api/news/feed/v80/?fp=wSTqLWK7JlFWFlPMFrU1Flx7LWw7&version_code=6.6.5&app_name=news_article&vid=240584DC-FE4E-454C-BF0D-35C71F02DD76&device_id=3755813419&channel=App%20Store&resolution=750*1334&aid=13&ab_version=304489,366569,345191,271178,357703,353151,326524,326532,297571,292723,366034,323233,358513,346557,319957,362317,362183,331545,362907,366057,365959,214069,31210,333969,366908,360985,358487,247847,280447,281291,364328,364991,325614,357403,288418,354544,290195,353484,252783,367242,358170,338589,358950,295827,353305,367093,239096,344346,170988,170989,361293,366065,364966,365857,365055,363578,349786,330631,297058,358953,276206,286212,350193,365036,366024,277769,365047,359685,367179,364280,353314&ab_feature=z1&ab_group=z1&openudid=3649f03726a5c6209ca2ca73786bbc4fdcea8067&idfv=240584DC-FE4E-454C-BF0D-35C71F02DD76&ac=WIFI&os_version=10.3.3&ssmix=a&device_platform=iphone&iid=31687858406&ab_client=a1,f2,f7,e1&device_type=iPhone%206&idfa=5343AD7C-0093-480C-818F-24C1A03BB02D&language=zh-Hans&support_rn=4&image=1&list_count=100&count=20&tt_from=pull&category=hotsoon_video&city=&last_refresh_sub_entrance_interval=1527863386&refer=1&refresh_reason=0&list_entrance=main_tab&st_time=5957&session_refresh_idx=3&strict=1&LBS_status=deny&detail=1&min_behot_time=1527859552&loc_mode=0&cp=5cB216195f85Bq1&as=a2b56561ab755b08f14843&ts=1527863387`
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
                var result = data.data.map((info) => {
                    let JSONbig = require('json-bigint')
                    let json = JSONbig.parse(info.content)
                    return json
                })

                if (this.state.refreshState == RefreshState.HeaderRefreshing) {
                    dataList = result
                } else {
                    dataList = this.state.data.concat(result)
                }

                this.setState({
                    data: dataList,
                    refreshState: result.length > 0 ? RefreshState.Idle : RefreshState.NoMoreData
                })
            })
            .catch(
                (error) => {
                    alert(error)
                    this.setState({
                        refreshState: RefreshState.Idle
                    })
                }
            )
    }

    render() {
        return (
            <View style={{flex: 1, marginTop: 20}}>
            <RefreshListView
                data={this.state.data}
                numColumns={2}
                renderItem={item => (
                    <VideoCell info={item}/>
                )}
                onHeaderRefresh={this.onHeaderRefresh}
                onFooterRefresh={this.onFooterRefresh}
                refreshState={this.state.refreshState}
            />
            </View>
        )
    }
}

export default Video