/* eslint-disable no-debugger */
import React, { Component } from 'react';
import {
    ScrollView,
    StyleSheet,
} from 'react-native';

import SearchComponent from '../components/city/search';
import CityLocationComponent from '../components/city/city_location'; // 当前城市
import CityListTitle from '../components/city/city_list_title';
import CityListBlock from '../components/city/city_list_block';
import CityLetterComponent from '../components/city/city_letter';
import CitySingleList from '../components/city/city_single_list.js';

export default class CityPage extends Component {

    render() {
        const city = {
            'ID': null,
            'Name': '北京',
            'QPY': 'beijing',
            'JPY': 'bj',
            'CityName': null
        };
        const history = [];
        const hot = [];

        for (let i = 0; i < 1; i++) {
            history.push(city);
        }

        for (let i = 0; i < 10; i++) {
            hot.push(city);
        }

        return (
            <ScrollView style={styles.wrap}>
                <SearchComponent />

                <CityListTitle title="当前城市" />
                <CityLocationComponent data={[{ Name: '北京' }]} />

                <CityListTitle title="历史选择" />
                <CityListBlock data={history} />

                <CityListTitle title="热门" />
                <CityListBlock data={hot} />

                <CityListTitle title="更多城市" />
                <CityLetterComponent />

                <CitySingleList />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
        backgroundColor: '#f3f4f8',
    },
});
