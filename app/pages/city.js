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

import { getCityListByLetter, getHotCities } from '../actions/http';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class CityPage extends Component {

    state = {

    };

    scrollViewRef = null;
    letterScrollTop = 0;

    componentWillMount() {
        getHotCities({
            params: {
                para: {
                    length: 15,
                    callback: '_jsonp6p6ua4ts5m5poth30m6rms4i'
                }
            },
            callback: ({ TrainStation: { StationList } }) => {
                this.setState({
                    hotcities: StationList
                });
            }
        });
        // InteractionManager.runAfterInteractions(() => {
        //     // Storage.clearMapForKey('trainhistorycities');
        //     // 获取历史选择
        //     this.props.getHistoryCities();
        //     // 获取热门城市
        //     this.props.getHotCities();
        // });
    }

    addToHistoryCities(data, index) {
        Storage.save({
            key: 'trainhistorycities',
            id: `${index}`,
            data,
            expires: 1000 * 60 * 60 * 2
        });
    }

    selectCity = (isAddToHistoryCities, data) => {

        /**
         * routeName {String} 上一个页面的routeName
         * key {String} fromCity或者toCity
         */
        const { historycities, navigation } = this.props;
        const { state, goBack } = navigation;
        const { routeName, key } = state.params;

        // this.props.selectCity({
        //     [`${routeName}${key}`]: data
        // });
        goBack();

        if (isAddToHistoryCities) {
            const isHas = historycities.some((item) => {
                return item.Name === data.Name;
            });

            !isHas && this.addToHistoryCities(data, historycities.length);
        }
    }

    getLetterScrollTop = (e) => {
        this.letterScrollTop = e.layout.y;
    }

    sleep() {
        return new Promise((resolve) => setTimeout(resolve, 50));
    }

    cityListUpdate = async () => {
        // 首次获取更多城市后,scrollView高度并不会马上更新
        await this.sleep();
        this.scrollViewRef && this.scrollViewRef.scrollTo({
            x: 0,
            y: this.letterScrollTop,
            animated: true
        });
    }

    getCityListByLetter = (cityName) => {
        getCityListByLetter({
            params: {
                para: {
                    'headtime': Number(new Date()),
                    'memberId': '',
                    'platId': 432,
                    'requestType': 3,
                    'headct': 0,
                    'headus': 3,
                    'headver': '2.14.0.2',
                    cityName
                }
            },
            callback: ({ data: { TrainStation: { StationList = [] } } }) => {
                this.setState({
                    StationList
                });
            }
        });
    }

    render() {
        const { historycities = [], hotcities = [], StationList = [] } = this.state;

        return (
            <ScrollView
                ref={(ref) => {
                    this.scrollViewRef = ref;
                }}
                style={styles.wrap}
            >
                <SearchComponent />

                <CityListTitle title="当前城市" />
                <CityLocationComponent
                    handlePress={this.selectCity.bind(this, true)}
                />

                {historycities.length === 0 ? null
                    : <CityListTitle title="历史选择" />}
                {historycities.length === 0 ? null
                    : <CityListBlock handlePress={this.selectCity.bind(this, false)} data={historycities} />}

                {hotcities.length === 0 ? null
                    : <CityListTitle title="热门" />}
                {hotcities.length === 0 ? null
                    : <CityListBlock handlePress={this.selectCity.bind(this, true)} data={hotcities} />}

                <CityListTitle title="更多城市" />
                <CityLetterComponent
                    layout={this.getLetterScrollTop}
                    handlePress={this.getCityListByLetter}
                />

                <CitySingleList
                    handlePress={this.selectCity.bind(this, true)}
                    cityListUpdate={this.cityListUpdate}
                    data = {StationList}
                />
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

const mapStateToProps = () => ({
});

const mapDispatchToProps = (dispatch) => ({
    // getHistoryCities: bindActionCreators(CityAction.getHistoryCities, dispatch),
    // getHotCities: bindActionCreators(CityAction.getHotCities, dispatch),
    // selectCity: bindActionCreators(CityAction.selectCity, dispatch),
    // getCityList: bindActionCreators(CityAction.getCityList, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CityPage);
