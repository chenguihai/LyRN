import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    ScrollView,
    InteractionManager,
    StyleSheet
} from 'react-native';

import BannerComponent from '../components/home/banner';
import NoticeComponent from '../components/home/notice';
import QueryCityComponent from '../components/home/query_city';
import QueryDateComponent from '../components/home/query_date';
import ButtonComponent from '../components/home/button';
import OperationComponent from '../components/home/operation';
import PubOperationComponent from '../components/home/pub_operation';

import { getBanner, getNotice, getTab } from '../actions/http';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { BusAction } from '../actions';

class BusPage extends Component {

    static propTypes = {
        Train: PropTypes.object,
        Bus: PropTypes.object,
        navigation: PropTypes.object,
        BusfromCity: PropTypes.object,
        BustoCity: PropTypes.object,
        BustripTime: PropTypes.number,
        BustripTimeDes: PropTypes.string
    }

    state = {
        tabIcon: {}
    }

    componentWillMount() {
        // 获取通知
        getNotice({
            params: { projectId: 30 },
            that: this
        });
        // 获取banner
        getBanner({
            params: { projectId: 30 },
            that: this
        });
        getTab({
            params: {},
            that: this
        });
    }


    handleCheckbox = (field, val) => {
        this.setState({
            [field]: !val
        });
    }

    selectCity(key) {
        const { navigation } = this.props;

        navigation.navigate('City', {
            key,
            routeName: navigation.state.routeName
        });
    }

    selectDate = () => {
        const { navigation } = this.props;

        InteractionManager.runAfterInteractions(() => {
            navigation.navigate('Calendar', {
                routeName: navigation.state.routeName
            });
        });
    }

    render() {
        const { BusfromCity, BustoCity, BustripTime, BustripTimeDes } = this.props;
        const { notice = {}, Adverts = { List: [] }, Icons = { List: [] }, tabIcon: { OperationIcon = [] } } = this.state;

        return (
            <ScrollView style={styles.wrap}>
                <View style={styles.container}>
                    {/* Notice start  */}
                    {notice.IsShow && <NoticeComponent data={notice} />}
                    {/* Notice end  */}
                    {/* Banner start  */}
                    {Adverts.List.length > 0 && <BannerComponent data={Adverts.List} />}
                    {/* Banner end  */}
                    {/* 查询城市开始  */}
                    <QueryCityComponent
                        selectFromCity={() => this.selectCity('fromCity')}
                        selectToCity={() => this.selectCity('toCity')}
                        fromCity={BusfromCity}
                        toCity={BustoCity}
                        fromKey="BusfromCity"
                        toKey="BustoCity"
                    />
                    {/* 查询城市结束  */}
                    {/* 查询日期开始  */}
                    <QueryDateComponent 
                        handlePress={this.selectDate}
                        tripTime={BustripTime}
                        tripTimeDes={BustripTimeDes}
                    />
                    {/* 查询日期结束  */}
                    {/* 查询按钮开始  */}
                    <ButtonComponent title="汽车票查询" />
                    {/* 查询按钮结束  */}
                    {Icons.List.length > 0 && <OperationComponent data={Icons.List} />}
                </View>
                {OperationIcon.length > 0 && <PubOperationComponent data={OperationIcon} />}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
        backgroundColor: '#f3f4f8',
    },
    container: {
        backgroundColor: '#FFF',
    },
});

const mapStateToProps = (state) => ({
    Bus: state.Bus,
    Train: state.Train,
    BusfromCity: state.City.BusfromCity,
    BustoCity: state.City.BustoCity,
    BustripTime: state.Date.BustripTime,
    BustripTimeDes: state.Date.BustripTimeDes
});

const mapDispatchToProps = (dispatch) => ({
    // getBanner: bindActionCreators(BusAction.getBanner, dispatch),
    // getNotice: bindActionCreators(BusAction.getNotice, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(BusPage);
