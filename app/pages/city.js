/* eslint-disable no-debugger */
import React, { Component } from 'react';
import { 
    View,
    StyleSheet,
} from 'react-native';

import SearchComponent from '../components/city/search';
import CityListTitle from '../components/city/city_list_title';
import CityListBlock from '../components/city/city_list_block';

export default class CityPage extends Component {

    render() {
        const history = [
            { 'ID': null, 
                'Name': '北京',
                'QPY': 'beijing', 
                'JPY': 'bj', 
                'CityName': null }
        ];

        
        return (
            <View style={styles.wrap}>
                <SearchComponent />
                <CityListTitle title="历史选择" />
                <CityListBlock data={history} />
            </View>
        );
    }
}

const styles = StyleSheet.create({ 
    wrap: { 
        flex: 1, 
        // backgroundColor: '#f3f4f8',
        backgroundColor: 'black'
    },
});
