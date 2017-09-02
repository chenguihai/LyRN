/* eslint-disable no-debugger */
import React, { Component } from 'react';
import {
    ScrollView,
    StyleSheet,
    InteractionManager
} from 'react-native';
import PropTypes from 'prop-types';

import SearchComponent from '../components/city/search';
import CityLocationComponent from '../components/city/city_location'; // 当前城市
import CityListTitle from '../components/city/city_list_title';
import CityListBlock from '../components/city/city_list_block';
import CityLetterComponent from '../components/city/city_letter';
import CitySingleList from '../components/city/city_single_list.js';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { CityAction, TrainAction } from '../actions';

class CityPage extends Component {

    static propTypes = {
        navigation: PropTypes.object,
        hotcities: PropTypes.array,
        getHotCities: PropTypes.func,
        selectCity: PropTypes.func
    }

    static defaultProps = {
        hotcities: []
    }

    componentWillMount() {
        // 获取热门城市
        this.props.getHotCities();
    }

    selectCity = (data) => {
        const { state, goBack } = this.props.navigation;
        const { routeName, key } = state.params;

        this.props.selectCity(`${routeName}${key}`, data);

        goBack();
    }

    render() {

        const city = {
            'ID': null,
            'Name': '北京',
            'QPY': 'beijing',
            'JPY': 'bj',
            'CityName': null
        };
        const history = [];

        for (let i = 0; i < 1; i++) {
            history.push(city);
        }
        const { hotcities } = this.props;

        return (
            <ScrollView style={styles.wrap}>
                <SearchComponent />

                <CityListTitle title="当前城市" />
                <CityLocationComponent data={[{ Name: '北京' }]} />

                <CityListTitle title="历史选择" />
                <CityListBlock data={history} />

                {hotcities.length === 0 ? null : <CityListTitle title="热门" />}
                {hotcities.length === 0 ? null : <CityListBlock handlePress={this.selectCity} data={hotcities} />}

                <CityListTitle title="更多城市" />
                <CityLetterComponent />

                <CitySingleList handlePress={this.selectCity} />
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

const mapStateToProps = (state) => ({
    hotcities: state.City.hotcities
});

const mapDispatchToProps = (dispatch) => ({
    getHotCities: bindActionCreators(CityAction.getHotCities, dispatch),
    selectCity: bindActionCreators(CityAction.selectCity, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CityPage);
