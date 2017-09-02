/* eslint-disable no-debugger */
import React, { Component } from 'react';
import {
    ScrollView,
    StyleSheet
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
import { CityAction } from '../actions';

class CityPage extends Component {

    static propTypes = {
        navigation: PropTypes.object,
        historycities: PropTypes.array,
        hotcities: PropTypes.array,
        getHistoryCities: PropTypes.func,
        getHotCities: PropTypes.func,
        selectCity: PropTypes.func,
        getCityList: PropTypes.func
    }

    static defaultProps = {
        hotcities: []
    }

    componentWillMount() {
        // Storage.clearMapForKey('trainhistorycities');
        // 获取历史选择
        this.props.getHistoryCities();
        // 获取热门城市
        this.props.getHotCities();
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
        
        this.props.selectCity(`${routeName}${key}`, data);

        goBack();

        if (isAddToHistoryCities) {
            const isHas = historycities.some((item) => {
                return item.Name === data.Name;
            });
    
            !isHas && this.addToHistoryCities(data, historycities.length);
        }
    }

    render() {
        const { historycities, hotcities, getCityList } = this.props;

        return (
            <ScrollView style={styles.wrap}>
                <SearchComponent />

                <CityListTitle title="当前城市" />
                <CityLocationComponent data={[{ Name: '北京' }]} />

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
                    handlePress={getCityList}
                />

                <CitySingleList handlePress={this.selectCity.bind(this, true)} />
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
    historycities: state.City.historycities,
    hotcities: state.City.hotcities
});

const mapDispatchToProps = (dispatch) => ({
    getHistoryCities: bindActionCreators(CityAction.getHistoryCities, dispatch),
    getHotCities: bindActionCreators(CityAction.getHotCities, dispatch),
    selectCity: bindActionCreators(CityAction.selectCity, dispatch),
    getCityList: bindActionCreators(CityAction.getCityList, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CityPage);
